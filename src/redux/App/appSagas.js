/* eslint-disable func-style */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeLatest, put } from 'redux-saga/effects';
import { LOGIN_USER } from '~src/constants/storageKeys';
import { fetchUserDataRequestSuccess } from '~src/redux/Auth/authActions';
import { appStart } from './appActions';
import APP from './appConstants';
import * as AppApi from './appServices';

function* restore() {
    AppApi.initOneSignalSDK();
    AppApi.initCometChatSDK();
    let user = yield AsyncStorage.getItem(LOGIN_USER);
    if (user) {
        user = JSON.parse(user);
        yield AppApi.loginCometChatUser(user);
        yield put(fetchUserDataRequestSuccess(user));
        yield put(appStart('inside'));
    } else {
        yield put(appStart('outside'));
    }
}

export default function* appSagas() {
    yield takeLatest(APP.INIT, restore);
};
