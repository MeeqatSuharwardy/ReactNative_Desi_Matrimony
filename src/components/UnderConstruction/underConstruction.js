import React, { memo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import { UnderConstruction as UnderConstructionAnimation } from '~src/assets/animations';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { Header } from '../Header';

const styles = StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
    }),
});

export const UnderConstruction = memo(({
    title
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
                    source={UnderConstructionAnimation}
                    style={{ width: '100%', padding: 0 }}
                    autoPlay
                    loop
                />
                <Text
                    style={{
                        fontFamily: FONT.BOLD,
                        fontSize: SCALED_SIZE.s16
                    }}
                >
                    {title} is Under Construction
                </Text>
            </View>
        </>
    );

});

UnderConstruction.propTypes = {
    title: PropTypes.string,
};

UnderConstruction.defaultProps = {
    title: '',
};
