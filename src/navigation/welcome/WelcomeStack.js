import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigatorPath from '~src/navigatorPaths';
import { Intro } from '~src/screens';

const Stack = createNativeStackNavigator();

// eslint-disable-next-line no-unused-vars
const authStackHeader = ({ navigation }) => ({
    headerTitle: '',
});

const WelcomeStack = () =>
    <Stack.Navigator
        initialRouteName={NavigatorPath.Intro}
        screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: 'transparent',
            },
        }}
    >
        <Stack.Screen
            name={NavigatorPath.Intro}
            component={Intro}
            options={authStackHeader}
        />
    </Stack.Navigator>;

export default WelcomeStack;
