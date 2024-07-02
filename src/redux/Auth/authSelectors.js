import { createSelector } from 'reselect';

const authReducer = state => state.auth;

export const selectApp = createSelector(authReducer, auth => ({
    currentUser: auth.user,
    appInitialized: auth.appInitialized,
    isVerifyingEmail: auth.isVerifyingEmail,
    isEmailVerified: auth.isEmailVerified,
    signUpData: auth.signUpData,
    loggingIn: auth.loggingIn,
    signingUp: auth.signingUp,
}));

export const selectIsPasswordResetting = createSelector(authReducer, 
    auth => auth.isResettingPassword
);
