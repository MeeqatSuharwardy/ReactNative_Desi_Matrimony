/* eslint-disable react/prop-types */
import React, { memo, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { NoData } from '~src/assets/animations';
import { SCALED_SIZE } from '~src/assets/fonts';
import { IconTopWave } from '~src/assets/svg';
import { screenWidth } from '~src/constants/screenSizes';

const styles = StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        backgroundColor,
    }),
    topSvg: reverse => ({
        position: 'absolute',
        height: SCALED_SIZE.s93,
        width: screenWidth,
        top: -SCALED_SIZE.s1,
        transform: reverse
            ? [
                { rotate: '180deg' },
                { rotateX: '180deg' }
            ]
            : []
    }),
});

export const NoDataView = memo(({
    reverseHeader = false
}) => {
    const { colors } = useTheme();
    const animation = useRef();

    useEffect(() => {
        setTimeout(() => {
            animation?.current?.play();
        }, 1000);
    }, [animation]);

    return (
        <View style={styles.container(colors.background)}>
            <LottieView
                ref={animation}
                source={NoData}
                resizeMode="cover"
                autoPlay
                loop
            />
            <View
                style={styles.topSvg(reverseHeader)}>
                <IconTopWave />
            </View>
        </View>
    );
});
