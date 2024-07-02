/* eslint-disable default-param-last */
/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
import { isVerifyingEmail } from '~src/utils/validations';
import AUTH from './authConstants';

const initialState = {
    user: null,
    signUpData: null,
    signingUp: false,
    loggingIn: false,
    loggingOut: false,
    fetchingUserData: false,
    isVerifyingEmail: false,
    isResettingPassword: false,
    errors: [],
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

    case AUTH.LOGIN_STARTED:
        return {
            ...state,
            loggingIn: true,
        };

    case AUTH.LOGIN_FAILURE:
        const { non_field_errors } = action.payload;
        return {
            ...state,
            errors: action.payload,
            loggingIn: false,
            isVerifyingEmail: isVerifyingEmail(non_field_errors),
            emailForVerification: action.emailForVerification,
        };

    case AUTH.FETCH_USER_DATA_STARTED:
        return {
            ...state,
            fetchingUserData: true,
        };

    case AUTH.FETCH_USER_DATA_SUCCESS:
        return {
            ...state,
            fetchingUserData: false,
            loggingIn: false,
            user: action.payload,
        };

    case AUTH.FETCH_USER_DATA_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingUserData: false,
        };

    case AUTH.SIGNUP:
        return {
            ...state,
            signUpData: action.payload,
        };

    case AUTH.SIGNUP_STARTED:
        return {
            ...state,
            signingUp: true,
        };

    case AUTH.SIGNUP_SUCCESS:
        return {
            ...state,
            signingUp: false,
        };

    case AUTH.SIGNUP_FAILURE:
        return {
            ...state,
            errors: action.payload,
            signingUp: false,
            emailForVerification: action.emailForVerification,
        };

    case AUTH.RESET_PASSWORD_STARTED:
        return {
            ...state,
            isResettingPassword: true,
        };

    case AUTH.RESET_PASSWORD_SUCCESS:
        return {
            ...state,
            isResettingPassword: false,
        };

    case AUTH.RESET_PASSWORD_FAILURE:
        return {
            ...state,
            errors: action.payload,
            isResettingPassword: false,
        };

    case AUTH.RESET_AUTH_REDUCER:
        return {
            ...initialState,
            user: state.user,
        };

    default: {
        return state;
    }
    }
};

export default authReducer;
