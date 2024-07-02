import axios from 'axios';
import { APP_URLS } from '~src/constants/config';
import { AUTHORIZATION } from '~src/constants/displayTexts';
import { getToken } from '~src/utils/helperFuncs';
import { LOGIN } from './apiEndPoints';
import responseCodes from './responseCodes';

const { BASE_URL } = APP_URLS;
const API_VERSION = 'api/';

const requestConfig = {
    baseURL: `${BASE_URL}${API_VERSION}`,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

const baseService = axios.create(requestConfig);

baseService.addAuthTokenToHeader = async () => {
    const token = await getToken();
    if (token)
        baseService.defaults.headers[AUTHORIZATION] = `Bearer ${token}`;
};

baseService.removeAuthToken = () => {
    baseService.defaults.headers[AUTHORIZATION] = '';
};

baseService.interceptors.response.use(
    response => response,
    error => {
        if (error?.response) {
            // TODO crashlytics().recordError(error);
        }
        if (error?.response.status === responseCodes.UNAUTHORIZED) {
            baseService.removeAuthToken();
            // TODO handle logout mechanism here
        }
        return Promise.reject(error);
    }
);

baseService.interceptors.request.use(
    /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["config"] }] */
    async config => {
        if (config.url === `${LOGIN}`) { // TODO just a mock of API
            baseService.removeAuthToken(); // just in case a token is there
        } else {
            const token = await getToken();
            if (token) {
                config.headers[AUTHORIZATION] = `Bearer ${token}`;
            }
            baseService.addAuthTokenToHeader();
        }
        return config;
    },
    error => Promise.reject(error),
);

export default baseService;
