import OneSignal from 'react-native-onesignal';
import { CometChat } from '@cometchat-pro/react-native-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { isEmpty } from 'lodash';
import { APP_URLS } from '~src/constants/config';
import { ACCESS_TOKEN, IGNORED_LIST, LOGIN_USER, REFRESH_TOKEN } from '~src/constants/storageKeys';
import { api, apiEndPoints } from '~src/services';
import baseService from '~src/services/baseService';
import { getToken } from '~src/utils/helperFuncs';
import { loginCometChatUser } from '../App/appServices';

export const presistAccessToken = async userResponse => {
    if (userResponse) {
        const accessToken = userResponse?.access || '';
        const refreshToken = userResponse?.refresh || '';
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
    }
};

export const presistUserData = async userInfo => {
    if (userInfo) {
        const userID = userInfo?.id?.toString();
        OneSignal.setExternalUserId(userID);
        await loginCometChatUser(userInfo);
        let ignoreList = await AsyncStorage.getItem(IGNORED_LIST);
        if (ignoreList) {
            ignoreList = JSON.parse(ignoreList);
            ignoreList = [...ignoreList, userID];
            ignoreList = [...new Set(ignoreList)];
        }
        else {
            ignoreList = [userID];
        }
        await AsyncStorage.setItem(LOGIN_USER, JSON.stringify(userInfo));
        await AsyncStorage.setItem(IGNORED_LIST, JSON.stringify(ignoreList));
    }
};

export const logoutUser = async () => {
    OneSignal.removeExternalUserId();
    CometChat.logout();
    // const logoutResponse = await api.doPost(apiEndPoints.LOGOUT, {});
    // return logoutResponse;
};

export const login = async ({ username, password, loginFrom }) => {
    const loginResponse = await api.doPost(apiEndPoints.LOGIN, {
        username,
        password,
        loginFrom,
    });
    return !isEmpty(loginResponse) ? loginResponse : null;
};

export const generateToken = async ({ username, token }) => {
    const tokenResponse = await api.doPost(apiEndPoints.GENERATE_TOKEN, {
        username,
        token,
    });
    await presistAccessToken(tokenResponse);
    baseService.addAuthTokenToHeader();
    return !isEmpty(tokenResponse) ? tokenResponse : null;
};

export const fetchUser = async () => {
    const token = await getToken();
    const decodedToken = jwtDecode(token);
    const requestURL = apiEndPoints.USER_INFO.replace(':id', `${decodedToken?.user_id || ''}`);
    let userInfo = await api.doGet(requestURL);
    userInfo = !isEmpty(userInfo) ? userInfo : null;
    presistUserData(userInfo);
    return userInfo;
};

export const signUp = async signUpData => {
    const data = new FormData();
    const keys = Object.keys(signUpData);
    keys.forEach(k => {
        data.append(k, signUpData[k]);
    });
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
        body: data
    };
    const { BASE_URL } = APP_URLS;
    const API_VERSION = 'api/';
    let user = null;
    await fetch(BASE_URL + API_VERSION + apiEndPoints.SIGNUP, req)
        .then(async response => (
            {
                status: response?.status >= 200 && response?.status < 300
                    ? 200
                    : response.status,
                result: await response.json()
            }
        ))
        .then(res => {
            user = res;
        });
    return !isEmpty(user) ? user : null;
};

export const resetPassword = async ({ email }) => {
    const user = await api.doPost(apiEndPoints.RESET_PASSWORD, {
        user: { email }
    });
    return !isEmpty(user) ? user : null;
};
