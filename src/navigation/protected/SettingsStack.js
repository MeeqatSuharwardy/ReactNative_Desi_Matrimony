import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigatorPath from '~src/navigatorPaths';
import { SettingsDetails } from '~src/screens';

const Stack = createNativeStackNavigator();

const SettingsStack = () =>
    <Stack.Navigator
        initialRouteName={NavigatorPath.SettingsDetails}
        screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: 'transparent',
            },
        }}
    >
        <Stack.Screen
            name={NavigatorPath.SettingsDetails}
            component={SettingsDetails}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>;

export default SettingsStack;
