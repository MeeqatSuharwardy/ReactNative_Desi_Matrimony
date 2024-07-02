import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigatorPath from '~src/navigatorPaths';
import { ChatListing } from '~src/screens';

const Stack = createNativeStackNavigator();

const ChatStack = () =>
    <Stack.Navigator
        initialRouteName={NavigatorPath.ChatListing}
        screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: 'transparent',
            },
        }}
    >
        <Stack.Screen
            name={NavigatorPath.ChatListing}
            component={ChatListing}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>;

export default ChatStack;
