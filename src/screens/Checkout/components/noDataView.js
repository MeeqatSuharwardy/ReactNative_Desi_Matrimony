/* eslint-disable react/prop-types */
import React, { memo, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { NoData } from '~src/assets/animations';
import { Header } from '~src/components';

const styles = StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        backgroundColor,
    }),
});

export const NoDataView = memo(({
    title = ''
}) => {
    const { colors } = useTheme();
    const animation = useRef();

    useEffect(() => {
        setTimeout(() => {
            animation?.current?.play();
        }, 1000);
    }, [animation]);

    return (
        <>
            <Header
                title={title}
            />
            <View style={styles.container(colors.background)}>
                <LottieView
                    ref={animation}
                    source={NoData}
                    resizeMode="cover"
                    autoPlay
                    loop
                />
            </View>
        </>
    );
});
