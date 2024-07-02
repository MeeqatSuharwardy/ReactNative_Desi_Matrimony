import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigatorPath from '~src/navigatorPaths';
import { Dashboard, DilConnectUsers } from '~src/screens';

const Stack = createNativeStackNavigator();

const HomeStack = () =>
    <Stack.Navigator
        initialRouteName={NavigatorPath.Dashboard}
        screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: 'transparent',
            },
        }}
    >
        <Stack.Screen
            name={NavigatorPath.Dashboard}
            component={Dashboard}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={NavigatorPath.DilConnectUsers}
            component={DilConnectUsers}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>;

export default HomeStack;
