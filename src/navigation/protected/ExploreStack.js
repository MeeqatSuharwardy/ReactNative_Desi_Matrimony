import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigatorPath from '~src/navigatorPaths';
import { FindMatch } from '~src/screens';

const Stack = createNativeStackNavigator();

const ExploreStack = () =>
    <Stack.Navigator
        initialRouteName={NavigatorPath.FindMatch}
        screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: 'transparent',
            },
        }}
    >
        <Stack.Screen
            name={NavigatorPath.FindMatch}
            component={FindMatch}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>;

export default ExploreStack;
