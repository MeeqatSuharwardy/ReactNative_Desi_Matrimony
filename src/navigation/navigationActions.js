/*
************************
******************
Navigation Container Reference is stored here.
Navigation can also be done with the help of this reference stored in the function setTopLevelNavigator
******************
************************
*/

import { StackActions, createNavigationContainerRef } from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

const navigate = (name, params) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
};

const reset = name => {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            routes: [{ name }],
        });
    }
};

const push = (...args) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(...args));
    }
};

const pop = (...args) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.pop(...args));
    }
};

const openRouteOnNotificationClick = args => {
    if (navigationRef.isReady()) {
        navigationRef.reset(args);
    }
};

const canGoBack = () => {
    if (navigationRef.isReady()) {
        navigationRef.canGoBack();
    }
};

const goBack = () => {
    if (navigationRef.isReady()) {
        if (navigationRef.canGoBack()) {
            navigationRef.goBack();
        }
    }
};

const replace = (...args) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(...args));
    }
};

export const navigationActions = {
    navigationRef,
    navigate,
    reset,
    push,
    pop,
    openRouteOnNotificationClick,
    canGoBack,
    goBack,
    replace
};
