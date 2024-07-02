import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';

const styles = StyleSheet.create({
    touchContainer: {
        marginVertical: SCALED_SIZE.s6,
        justifyContent: 'center',
        borderRadius: SCALED_SIZE.s8,
        overflow: 'hidden',
    },
    appButtonContainer: {
        padding: SCALED_SIZE.s13,
        justifyContent: 'center',
        minHeight: SCALED_SIZE.s50
    },
    appButtonText: {
        fontSize: SCALED_SIZE.s16,
        color: '#fff',
        fontFamily: FONT.BOLD,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    activityIndicator: {
        padding: SCALED_SIZE.s3
    }
});

export const Button = memo(({
    onPress,
    title,
    start,
    buttonContainerStyle,
    buttonTextStyle,
    loading,
    buttonColor,
    customAppButtonContainerStyle,
    disabled
}) => {
    const colors = useTheme();
    return (
        <TouchableOpacity
            disabled={disabled || loading}
            style={{
                ...styles.touchContainer,
                ...buttonContainerStyle,
                opacity: disabled ? 0.5 : 1
            }}
            onPress={onPress}>
            <LinearGradient
                start={start}
                colors={
                    _.isEmpty(buttonColor)
                        ? colors.colors.buttonLinerGradient
                        : buttonColor
                }
                style={{
                    ...styles.appButtonContainer,
                    ...customAppButtonContainerStyle
                }}
            >
                {
                    !loading ?
                        <Text
                            numberOfLines={1}
                            style={{
                                ...styles.appButtonText,
                                ...buttonTextStyle
                            }}>
                            {title}
                        </Text>
                        :
                        <ActivityIndicator
                            style={styles.activityIndicator}
                            size="small"
                            color="#FFFFFF"
                        />
                }
            </LinearGradient>
        </TouchableOpacity>
    );

});

Button.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    start: PropTypes.object,
    buttonContainerStyle: PropTypes.object,
    buttonTextStyle: PropTypes.object,
    loading: PropTypes.bool,
    buttonColor: PropTypes.array,
    customAppButtonContainerStyle: PropTypes.object,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    onPress: () => { },
    title: '',
    start: { x: 0.4, y: 0.1, z: 1 },
    buttonContainerStyle: {},
    buttonTextStyle: {},
    loading: false,
    buttonColor: [],
    customAppButtonContainerStyle: {},
    disabled: false
};
