/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Header } from '~src/components';

const styles = StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
    }),
});

export const Loader = memo(({
    title = ''
}) => {
    const { colors } = useTheme();
    return (
        <>
            <Header
                title={title}
            />
            <View style={styles.container(colors.background)}>
                <ActivityIndicator
                    size="large"
                    color={colors.buttonLinerGradient[0]}
                />
            </View>
        </>
    );
});
