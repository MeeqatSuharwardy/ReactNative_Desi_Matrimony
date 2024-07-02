import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { PaymentSucceed } from '~src/assets/animations';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { Button, Header } from '~src/components';
import { screenHeight } from '~src/constants/screenSizes';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';

export const CheckoutSucceed = () => {
    const animation = useRef();
    const { colors } = useTheme();

    useEffect(() => {
        setTimeout(() => {
            animation?.current?.play();
        }, 1000);
    }, [animation]);

    const closePressed = () => {
        navigationActions.navigate(NavigatorPath.SettingsStack);
    };

    return (
        <>
            <Header
                title="Subscription Succeed"
            />
            <View
                style={{
                    flex: 1,
                    padding: SCALED_SIZE.s20,
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: colors.boldHeadingText,
                        fontFamily: FONT.BOLD,
                        fontSize: SCALED_SIZE.s20,
                        textAlign: 'center'
                    }}
                >
                    Congratulations! Payment Succeed....
                </Text>
                <LottieView
                    ref={animation}
                    source={PaymentSucceed}
                    style={{
                        width: '100%',
                        height: screenHeight * 0.4,
                        alignSelf: 'center'
                    }}
                    autoPlay
                    loop={false}
                />
                <Button
                    title="Close"
                    onPress={closePressed}
                />
            </View>
        </>
    );
};
