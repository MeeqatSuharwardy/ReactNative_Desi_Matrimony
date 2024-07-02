import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { Provider, useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { Splash } from '~src/Splash';
import { Toast, ErrorBoundary, Statusbar } from '~src/components';
import Navigator from '~src/navigation/Navigator';
import { navigationActions } from '~src/navigation/navigationActions';
import { appInit } from '~src/redux/App/appActions';
import { selectAppStatus } from '~src/redux/App/appSelectors';
import store from '~src/redux/store/configureStore';
import { systemBasedTheme } from '~src/theme/appTheme';

const App = () => {
    const dispatch = useDispatch();
    const { root } = useSelector(selectAppStatus);

    useEffect(() => {
        dispatch(appInit());
        NetInfo.addEventListener(state => {
            if (!(state.isInternetReachable || state.isConnected)) {
                // eslint-disable-next-line no-console
                console.log('Internet stopped working');
            }
        });
    }, [dispatch]);

    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode
        ? systemBasedTheme.MyDarkTheme
        : systemBasedTheme.MyLightTheme;

    return (
        <NavigationContainer
            ref={navigationActions.navigationRef}
            theme={theme}
            onReady={() => RNBootSplash.hide()}
        >
            {
                root ?
                    <Navigator />
                    :
                    <Splash />
            }
        </NavigationContainer>
    );
};

const AppStoreWrapped = () => (
    <ErrorBoundary>
        <Statusbar />
        <Provider
            store={store}>
            <App />
            <Toast />
        </Provider>
    </ErrorBoundary>
);

export default AppStoreWrapped;
