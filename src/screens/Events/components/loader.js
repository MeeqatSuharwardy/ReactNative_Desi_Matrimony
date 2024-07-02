/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SCALED_SIZE } from '~src/assets/fonts';
import { IconTopWave } from '~src/assets/svg';
import { screenWidth } from '~src/constants/screenSizes';

const styles = StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export const Loader = memo(({
    reverseHeader = false
}) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container(colors.background)}>
            <ActivityIndicator
                size="large"
                color={colors.buttonLinerGradient[0]}
            />
            <View
                style={styles.topSvg(reverseHeader)}>
                <IconTopWave />
            </View>
        </View>
    );
});
