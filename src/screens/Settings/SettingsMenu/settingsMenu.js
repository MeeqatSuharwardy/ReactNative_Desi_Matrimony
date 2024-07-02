/* eslint-disable react/prop-types */
import React, { memo, useEffect, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { ProceedArrow } from '~src/assets/animations';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { Header } from '~src/components';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import { logoutRequest } from '~src/redux/Auth/authActions';
import styles from './styles';

const ListItem = memo(({
    title = '',
    onPress = () => { },
}) => {
    const { colors } = useTheme();
    const animation = useRef();

    useEffect(() => {
        setTimeout(() => {
            animation?.current?.play();
        }, 1000);
    }, [animation]);

    return (
        <Pressable
            onPress={onPress}
            style={{
                padding: SCALED_SIZE.s10,
                borderBottomColor: '#00000020',
                borderBottomWidth: SCALED_SIZE.s1,
                flexDirection: 'row',
                marginVertical: SCALED_SIZE.s5
            }}
        >
            <View
                style={{
                    flex: 8,
                }}
            >
                <Text
                    style={{
                        fontSize: SCALED_SIZE.s18,
                        fontFamily: FONT.BOLD,
                        color: colors.boldHeadingText
                    }}
                >
                    {title}
                </Text>

            </View>
            <View
                style={{
                    flex: 2,
                    alignItems: 'flex-end'
                }}
            >
                <LottieView
                    ref={animation}
                    source={ProceedArrow}
                    style={styles.completeAnimation}
                    autoPlay
                    loop
                />
            </View>
        </Pressable>
    );
});

export const SettingsMenu = memo(() => {

    const dispatch = useDispatch();
    const { colors } = useTheme();

    useEffect(() => {
    }, [dispatch]);

    const onLogoutPressed = () => {
        dispatch(logoutRequest());
    };

    const onPaymentPlansPressed = () => {
        navigationActions
            .navigate(
                NavigatorPath
                    .PaymentPlans
            );
    };

    return (
        <>
            <Header
                title="Settings Menu"
            />
            <View style={styles.container(colors.background)}>
                <ListItem
                    title="Payment Plans"
                    onPress={onPaymentPlansPressed}
                />
                <ListItem
                    title="Logout"
                    onPress={onLogoutPressed}
                />
            </View>
        </>
    );
});
