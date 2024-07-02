/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, Pressable, Keyboard } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { EnterOtp, ProceedArrow } from '~src/assets/animations';
import { SCALED_SIZE } from '~src/assets/fonts';
import { IconBottomWave, IconTopWave } from '~src/assets/svg';
import { Toast } from '~src/components';
import { showToast } from '~src/components/Toast/action';
import { CLAUSE } from '~src/constants/displayTexts';
import { generateTokenRequest, resetAuthReducer } from '~src/redux/Auth/authActions';
import { isRunningOniOS } from '~src/utils/helperFuncs';
import styles from './styles';

export const OtpVerification = ({ route }) => {

    const dispatch = useDispatch();
    const { colors } = useTheme();

    const [otp, setOtp] = useState('');
    const [username] = useState(route?.params || '');

    const animationOtpMobile = useRef();
    const animationProceedArrow = useRef();
    const otpRef = useRef();

    const onSubmitPressed = useCallback(() => {
        if (otp.length >= 6 && username) {
            Keyboard.dismiss();
            dispatch(
                generateTokenRequest({
                    payload: {
                        username,
                        token: otp
                    },
                    successCb: () => { },
                })
            );
        }
        else {
            dispatch(
                showToast(CLAUSE.PLEASE_ENTER_VERIFICATION_CODE)
            );
        }
    }, [dispatch, otp, username]);

    useEffect(() => {
        setTimeout(() => {
            otpRef
                ?.current
                .focus();
            animationOtpMobile
                ?.current
                ?.play();
        }, 1000);
    }, [
        animationOtpMobile,
        otpRef
    ]);

    useEffect(() => {
        if (otp.length >= 6) {
            animationProceedArrow
                ?.current
                ?.play();
            onSubmitPressed();
        }
        else {
            animationProceedArrow
                ?.current
                ?.pause();
        }
    }, [
        otp,
        onSubmitPressed
    ]);

    useEffect(() => () => dispatch(
        resetAuthReducer()
    ), [dispatch]);

    return (
        <KeyboardAvoidingView
            style={styles.container(colors.background)}
            keyboardVerticalOffset={isRunningOniOS()
                ? SCALED_SIZE.s60
                : 0
            }
            behavior={
                isRunningOniOS()
                    ? 'padding'
                    : 'height'
            }
        >
            <View
                style={styles.topSvg}>
                <IconTopWave />
            </View>
            <View
                style={styles.bottomSvg}>
                <IconBottomWave />
            </View>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                contentContainerStyle={styles.scrollContainer}>
                <Text
                    style={styles.headingText(colors.boldHeadingText)}>
                    {CLAUSE.VERIFY_YOUR_OTP}
                </Text>
                <Text
                    style={styles.miniHeadingText(colors.boldHeadingText)}>
                    {CLAUSE.PLEASE_ENTER_VERIFICATION_CODE}
                </Text>
                <LottieView
                    ref={animationOtpMobile}
                    source={EnterOtp}
                    style={styles.enterOTP}
                    autoPlay
                    loop
                />
                <OtpInputs
                    ref={otpRef}
                    autoCapitalize="characters"
                    keyboardType="visible-password"
                    handleChange={code => setOtp(code)}
                    numberOfInputs={6}
                    style={styles.otpContainer}
                    inputStyles={styles.otpTextContainer(colors.buttonLinerGradient[0])}
                />
                <Pressable
                    style={styles.proceedArrow}
                    onPress={onSubmitPressed}
                >
                    <LottieView
                        ref={animationProceedArrow}
                        source={ProceedArrow}
                        style={styles.proceedArrow}
                        autoPlay={false}
                        loop
                    />
                </Pressable>
            </ScrollView>
            <Toast />
        </KeyboardAvoidingView>
    );
};
