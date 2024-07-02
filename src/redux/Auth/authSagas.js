/* eslint-disable func-style */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty } from 'lodash';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { showToast } from '~src/components/Toast/action';
import { ACCESS_TOKEN, LOGIN_USER } from '~src/constants/storageKeys';
import { appStart } from '~src/redux/App/appActions';
import { apiSaga } from '~src/redux/rootSaga/apiSaga';
import { parseError } from '~src/utils/validations';
import {
    loginStarted,
    loginSuccess,
    loginFailed,
    signUpStarted,
    signUpSuccess,
    signUpFailed,
    fetchUserDataRequest,
    fetchUserDataRequestSuccess,
    fetchUserDataRequestFailed,
    fetchUserDataRequestStarted,
    logoutStarted,
    logoutSuccess,
    logoutFailed,
    onResetPasswordStarted,
    onResetPasswordSuccess,
    onResetPasswordFailure,
    generateTokenStarted,
    generateTokenSuccess,
    generateTokenFailed,
} from './authActions';
import AUTH from './authConstants';
import { selectApp } from './authSelectors';
import * as AuthApi from './authServices';

/** FETCH USER DATA */
function* fetchUserDataAsync() {
    yield apiSaga(
        AuthApi.fetchUser,
        [],
        fetchUserDataRequestStarted(),
        userData => fetchUserDataRequestSuccess(userData),
        error => fetchUserDataRequestFailed(error),
    );
}

function* userLoginSuccessAsync() {
    // LOGIC AFTER LOGIN AND BEFORE 
    // OPT SUBMISSION CAN BE PERFORMED HERE
}

function* generateTokenSuccessAsync() {
    yield put(fetchUserDataRequest());
}

function* generateTokenForUser(action) {
    yield apiSaga(
        AuthApi.generateToken,
        [action.payload],
        generateTokenStarted(),
        () => generateTokenSuccess(),
        error =>
            generateTokenFailed({
                payload: error,
                emaiForVerification: action.payload.username,
            }),
        action.successCb
    );
}

/** User Login */
function* userLoginAsync(action) {
    yield apiSaga(
        AuthApi.login,
        [action.payload],
        loginStarted(),
        () => loginSuccess(),
        error =>
            loginFailed({
                payload: error,
                emaiForVerification: action.payload.username,
            }),
        action.successCb
    );
}

function* userSignUpSuccessAsync() {
    // LOGIC AFTER SIGNUP CAN BE PERFORMED HERE
}

/** User Sign Up */
function* userSignUpAsync(action) {
    const { signUpData } = yield select(selectApp);
    yield put(signUpStarted());
    const { status, result } = yield call(AuthApi.signUp, signUpData);
    if (status === 200) {
        yield put(signUpSuccess(result));
        action.successCb(result);
    }
    else {
        const errors = parseError(result);
        let errText = typeof result === 'object' && !isEmpty(result)
            ? `${Object.keys(errors)[0]} ${errors[Object.keys(errors)[0]]}`
            : errors[0];
        if (errText && typeof errText === 'number') {
            errText = 'Something went wrong';
        }
        if (typeof errText === 'string' && errText !== '') {
            yield put(showToast(errText));
        }
        yield put(
            signUpFailed({
                payload: result,
                emaiForVerification: signUpData.email,
            })
        );
    }
}

/** User Logout */
function* userLogoutAsync() {
    yield apiSaga(
        AuthApi.logoutUser,
        [],
        logoutStarted(),
        () => logoutSuccess(),
        error => logoutFailed(error),
        // eslint-disable-next-line no-unused-vars
        () => { },
    );
}

/** User Logout Success */
function* userLogoutSuccessAsync() {
    yield AsyncStorage.removeItem(ACCESS_TOKEN);
    yield AsyncStorage.removeItem(LOGIN_USER);
    yield put(appStart('outside'));
    yield put(fetchUserDataRequestSuccess(null));
}

/** Reset password */
function* resetUserPassword({ payload }) {
    const { email, successCb } = payload;
    yield apiSaga(
        AuthApi.resetPassword,
        [{ email }],
        onResetPasswordStarted(),
        userResponse => onResetPasswordSuccess(userResponse),
        error =>
            onResetPasswordFailure({
                payload: error,
            }),
        successCb,
    );
}

export default function* authSagas() {
    yield takeLatest(AUTH.LOGIN, userLoginAsync);
    yield takeLatest(AUTH.LOGIN_SUCCESS, userLoginSuccessAsync);
    yield takeLatest(AUTH.GENERATE_TOKEN, generateTokenForUser);
    yield takeLatest(AUTH.GENERATE_TOKEN_SUCCESS, generateTokenSuccessAsync);
    yield takeLatest(AUTH.FETCH_USER_DATA, fetchUserDataAsync);
    yield takeLatest(AUTH.SIGNUP, userSignUpAsync);
    yield takeLatest(AUTH.SIGNUP_SUCCESS, userSignUpSuccessAsync);
    yield takeLatest(AUTH.LOGOUT, userLogoutAsync);
    yield takeLatest(AUTH.LOGOUT_SUCCESS, userLogoutSuccessAsync);
    yield takeLatest(AUTH.RESET_PASSWORD, resetUserPassword);
};
