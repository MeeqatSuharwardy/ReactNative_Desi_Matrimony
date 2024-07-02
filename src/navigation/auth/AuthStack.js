import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigatorPath from '~src/navigatorPaths';
import { AuthWelcome, Login, Signup, OtpVerification, SignupSuccessful } from '~src/screens';

const Stack = createNativeStackNavigator();

// eslint-disable-next-line no-unused-vars
const authStackHeader = ({ navigation }) => ({
    headerTitle: '',
});

const AuthenticationStack = () =>
    <Stack.Navigator
        initialRouteName={NavigatorPath.AuthWelcome}
        screenOptions={{
            presentation: 'modal',
            headerShown: false,
            headerStyle: {
                backgroundColor: 'transparent',
            },
        }}
    >
        <Stack.Screen
            name={NavigatorPath.AuthWelcome}
            component={AuthWelcome}
            options={authStackHeader}
        />
        <Stack.Screen
            name={NavigatorPath.Login}
            component={Login}
            options={authStackHeader}
        />
        <Stack.Screen
            name={NavigatorPath.Signup}
            component={Signup}
            options={authStackHeader}
        />
        <Stack.Screen
            name={NavigatorPath.OtpVerification}
            component={OtpVerification}
            options={authStackHeader}
        />
        <Stack.Screen
            name={NavigatorPath.SignupSuccessful}
            component={SignupSuccessful}
            options={authStackHeader}
        />
    </Stack.Navigator>;

export default AuthenticationStack;
