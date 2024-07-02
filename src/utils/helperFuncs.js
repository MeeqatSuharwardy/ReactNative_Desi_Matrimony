/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_USER, ACCESS_TOKEN } from '~src/constants/storageKeys';

export const logout = async () => {
    await AsyncStorage.removeItem(LOGIN_USER);
    await AsyncStorage.removeItem(ACCESS_TOKEN);
};

export const getToken = async () => {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    return accessToken;
};

export const getUserId = async () => {
    let currentUser = await AsyncStorage.getItem(LOGIN_USER);
    if (currentUser) {
        currentUser = JSON.parse(currentUser);
        return currentUser?.id.toString() || null;
    }
    return null;
};

export const Capitalize = str => {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
};

export const objectToParams = object => {
    const params = [];
    Object.keys(object).forEach(key => {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`);
    });
    return params.join('&');
};

export const paramsToObject = url => {
    const queryString = url.split('?')[1].split('#')[0];
    const query = {};
    queryString.split('&').forEach(param => {
        const dict = param.split('=');
        query[dict[0]] = { ...dict[1] };
    });
    return query;
};

export const isRunningOniOS = () => Platform.OS === 'ios';

export const getFilePathForPlatform = response => {
    if (isRunningOniOS()) {
        return `file://${response.path}`;
    } 
    return response.path;
};

export const generateBoxShadowStyle = (
    xOffset = 0,
    yOffset = 4,
    shadowColorIos = '#171717',
    shadowOpacity = 0.15,
    shadowRadius = 3,
    elevation = 4,
    shadowColorAndroid = '#171717',
) => {
    if (isRunningOniOS()) {
        return {
            shadowColor: shadowColorIos,
            shadowOffset: {
                width: xOffset,
                height: yOffset
            },
            shadowOpacity,
            shadowRadius,
        };
    }
    return {
        elevation,
        shadowColor: shadowColorAndroid,
    };
};
