/* eslint-disable prefer-promise-reject-errors */
import isEmpty from 'lodash/isEmpty';
import { LOGIN } from './apiEndPoints';
import baseService from './baseService';
import responseCodes from './responseCodes';

const onSuccess = (response, successCode = responseCodes.OK) => {
    if (
        response.status >= successCode &&
        response.status < 300
    ) {
        return Promise.resolve(response?.data || null);
    }
    return Promise.reject(response);
};

const onNotFoundError = data => {
    const { response } = data;
    if (response && response.status === responseCodes.NOT_FOUND) {
        // TODO: put not found code here
    }
    Promise.reject(response);
};

const handleError = error => {
    const { response } = error;
    if (response) {
        if (
            response.status === responseCodes.UNAUTHORIZED &&
            response.config.url !== `${LOGIN}`
        ) {
            return Promise.reject(error.message);
        }
        if (
            response.status >= responseCodes.BAD_REQUEST &&
            response.status < responseCodes.INTERNAL_SERVER_ERROR
        ) {
            return !isEmpty(response?.data || null)
                ? Promise.reject(response.data)
                : Promise.reject(error);
        }
        if (response.status >= responseCodes.INTERNAL_SERVER_ERROR) {
            return Promise.reject('Something went wrong.');
        }
    }
    return Promise.reject('Something went wrong.');
};

const methods = baseApiService => {

    const doGet = (url, data = null) =>
        baseApiService
            .get(url, data)
            .then(response => onSuccess(response))
            .catch(error => handleError(error));

    const doPost = (url, data, successCode) =>
        baseApiService
            .post(url, data)
            .then(response => onSuccess(response, successCode))
            .catch(error => handleError(error));

    const doPut = (url, data) =>
        baseApiService.put(url, data)
            .then(response => onSuccess(response))
            .catch(error => handleError(error));

    const doPatch = (url, data) =>
        baseApiService
            .patch(url, data)
            .then(response => onSuccess(response))
            .catch(error => handleError(error));

    const doDelete = url =>
        baseApiService
            .delete(url)
            .then(response => onSuccess(response, responseCodes.NO_CONTENT))
            .catch(error => onNotFoundError(error));

    return {
        doGet,
        doPost,
        doPut,
        doDelete,
        doPatch,
    };
};
const baseMethods = methods(baseService);

export default baseMethods;
