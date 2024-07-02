import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    AuthenticationStack,
    WelcomeStack,
    BottomTabNavigation
} from '~src/navigation';
import NavigatorPath from '~src/navigatorPaths';
import { selectApp } from '~src/redux/Auth/authSelectors';
import {
    PaymentCheckout,
    CheckoutFailed, 
    CheckoutSucceed,
    PaymentPlans,
    UserDetails,
    UnderConstruction,
    SettingsMenu
} from '~src/screens';
// eslint-disable-next-line import/named
import { CometChatMessages } from '~src/screens/CometChatWorkspace/src';

const RootStack = createNativeStackNavigator();

const PublicNavigator = () => (
    <RootStack.Navigator
        initialRouteName={NavigatorPath.NAVIGATOR_WELCOME}>
        <RootStack.Screen
            name={NavigatorPath.NAVIGATOR_WELCOME}
            component={WelcomeStack}
            options={{
                headerShown: false,
            }} />
        <RootStack.Screen
            name={NavigatorPath.NAVIGATOR_AUTH}
            component={AuthenticationStack}
            options={{
                headerShown: false,
            }} />
    </RootStack.Navigator>
);

const PrivateNavigator = () => (
    <RootStack.Navigator>
        <RootStack.Screen
            name={NavigatorPath.NAVIGATOR_PROTECTED}
            component={BottomTabNavigation}
            options={{
                headerShown: false,
            }} />
        <RootStack.Group
            screenOptions={{
                headerShown: false,
                presentation: 'modal'
            }}>
            <RootStack.Screen
                name={NavigatorPath.SettingsMenu}
                component={SettingsMenu}
            />
            <RootStack.Screen
                name={NavigatorPath.PaymentPlans}
                component={PaymentPlans}
            />
            <RootStack.Screen
                name={NavigatorPath.PaymentCheckout}
                component={PaymentCheckout}
            />
            <RootStack.Screen
                name={NavigatorPath.CheckoutSucceed}
                component={CheckoutSucceed}
            />
            <RootStack.Screen
                name={NavigatorPath.CheckoutFailed}
                component={CheckoutFailed}
            />
            <RootStack.Screen
                name={NavigatorPath.UnderConstruction}
                component={UnderConstruction}
            />
        </RootStack.Group>
        <RootStack.Screen
            name={NavigatorPath.CometChatMessages}
            component={CometChatMessages}
            options={{
                headerShown: false,
            }}
        />
        <RootStack.Group
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal'
            }}>
            <RootStack.Screen
                name={NavigatorPath.UserDetails}
                component={UserDetails}
            />
        </RootStack.Group>
    </RootStack.Navigator>
);

const Navigator = () => {
    const { currentUser } = useSelector(selectApp);
    if (currentUser) {
        return <PrivateNavigator />;
    }
    return <PublicNavigator />;
};

export default Navigator;
