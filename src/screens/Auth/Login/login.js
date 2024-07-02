import React, { useState } from 'react';
import { View, Text, Platform, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { IconEmail, IconPassword } from '~src/assets/svg';
import { Button, CustomTextInput, Toast } from '~src/components';
import { CLAUSE, LABEL } from '~src/constants/displayTexts';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import { loginRequest } from '~src/redux/Auth/authActions';
import { selectApp } from '~src/redux/Auth/authSelectors';
import { isRunningOniOS } from '~src/utils/helperFuncs';
import styles from './styles';

export const Login = () => {

    const { colors } = useTheme();
    const dispatch = useDispatch();

    const { loggingIn } = useSelector(selectApp);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginPressed = () => {
        Keyboard.dismiss();
        dispatch(
            loginRequest({
                payload: {
                    username,
                    password,
                    loginFrom: Platform.OS
                },
                successCb: () => { 
                    navigationActions
                        .replace(
                            NavigatorPath
                                .OtpVerification,
                            username
                        );
                },
            })
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container(colors.background)}
            behavior={
                isRunningOniOS()
                    ? 'padding'
                    : 'height'
            }
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                style={styles.scrollContainer}
            >
                <Text
                    style={styles.welcomeText(colors.boldHeadingText)}>
                    {CLAUSE.WELCOME_BACK}
                </Text>
                <Text
                    style={styles.logback(colors.boldHeadingText)}>
                    {CLAUSE.LOG_BACK}
                </Text>
                <View
                    style={styles.loginContainer}>
                    <View
                        style={styles.loginBox(colors.buttonLinerGradient[0])}>
                        <Text
                            style={styles.loginText(colors.headingWhite)}>
                            {CLAUSE.LOGIN}
                        </Text>
                        <CustomTextInput
                            placeholder={LABEL.USERNAME}
                            value={username}
                            onChangeText={_username => {
                                setUsername(_username);
                            }}
                            icon={IconEmail}
                            iconSvgProps={styles.icon}
                        />
                        <CustomTextInput
                            placeholder={LABEL.PASSWORD}
                            value={password}
                            onChangeText={_password => {
                                setPassword(_password);
                            }}
                            icon={IconPassword}
                            iconSvgProps={styles.icon}
                        />
                        <Button
                            title={CLAUSE.LOGIN}
                            onPress={loginPressed}
                            loading={loggingIn}
                            buttonContainerStyle={styles.loginButton}
                        />
                    </View>
                </View>
                <Text
                    onPress={() => {
                        navigationActions.replace(NavigatorPath.Signup);
                    }}
                    style={styles.accountYet(colors.boldHeadingText)}>
                    {CLAUSE.DONT_HAVE_AN_ACCOUNT}
                    <Text
                        style={styles.joinNow(colors.buttonLinerGradient[0])}>
                        {CLAUSE.JOIN_NOW}
                    </Text>
                </Text>
                <Text
                    style={styles.forgotPassword(colors.buttonLinerGradient[0])}>
                    {CLAUSE.FORGOT_PASSWORD}
                </Text>
                <Toast />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
