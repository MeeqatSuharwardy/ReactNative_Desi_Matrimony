import AUTH from './authConstants';

export const loginRequest = ({ payload, successCb }) => ({
    type: AUTH.LOGIN,
    payload,
    successCb,
});

export const loginStarted = () => ({
    type: AUTH.LOGIN_STARTED,
});

export const loginSuccess = () => ({
    type: AUTH.LOGIN_SUCCESS,
});

export const loginFailed = ({ payload, emaiForVerification }) => ({
    type: AUTH.LOGIN_FAILURE,
    payload,
    emaiForVerification,
});

export const generateTokenRequest = ({ payload, successCb }) => ({
    type: AUTH.GENERATE_TOKEN,
    payload,
    successCb,
});

export const generateTokenStarted = () => ({
    type: AUTH.GENERATE_TOKEN_STARTED,
});

export const generateTokenSuccess = () => ({
    type: AUTH.GENERATE_TOKEN_SUCCESS,
});

export const generateTokenFailed = ({ payload, emaiForVerification }) => ({
    type: AUTH.GENERATE_TOKEN_FAILURE,
    payload,
    emaiForVerification,
});

export const fetchUserDataRequest = () => ({
    type: AUTH.FETCH_USER_DATA,
});

export const fetchUserDataRequestStarted = () => ({
    type: AUTH.FETCH_USER_DATA_STARTED,
});

export const fetchUserDataRequestSuccess = payload => ({
    type: AUTH.FETCH_USER_DATA_SUCCESS,
    payload
});

export const fetchUserDataRequestFailed = payload => ({
    type: AUTH.FETCH_USER_DATA_FAILURE,
    payload
});

export const signUpRequest = ({ payload, successCb }) => ({
    type: AUTH.SIGNUP,
    payload,
    successCb,
});

export const signUpStarted = () => ({
    type: AUTH.SIGNUP_STARTED,
});

export const signUpSuccess = payload => ({
    type: AUTH.SIGNUP_SUCCESS,
    payload,
});

export const signUpFailed = ({ payload, emaiForVerification }) => ({
    type: AUTH.SIGNUP_FAILURE,
    payload,
    emaiForVerification,
});

export const logoutRequest = () => ({
    type: AUTH.LOGOUT,
});

export const logoutStarted = () => ({
    type: AUTH.LOGOUT_STARTED,
});

export const logoutSuccess = () => ({
    type: AUTH.LOGOUT_SUCCESS,
});

export const logoutFailed = payload => ({
    type: AUTH.LOGOUT_FAILURE,
    payload
});

export const resetPassword = payload => ({
    type: AUTH.RESET_PASSWORD,
    payload
});

export const onResetPasswordStarted = () => ({
    type: AUTH.RESET_PASSWORD_STARTED,
});

export const onResetPasswordSuccess = () => ({
    type: AUTH.RESET_PASSWORD_SUCCESS,
});

export const onResetPasswordFailure = () => ({
    type: AUTH.RESET_PASSWORD_FAILURE,
});

export const resetAuthReducer = () => ({
    type: AUTH.RESET_AUTH_REDUCER,
});
