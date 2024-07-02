/* eslint-disable react/require-default-props */
import React, { Fragment, memo, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';

const styles = StyleSheet.create({
    textInputConditionalContainer: {
        paddingRight: SCALED_SIZE.s5,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SCALED_SIZE.s5,
        borderRadius: SCALED_SIZE.s25,
        paddingVertical: SCALED_SIZE.s2,
        overflow: 'hidden',
        marginVertical: SCALED_SIZE.s10,
        backgroundColor: '#F7F7F7',
    },
    textInputStyle: {
        flex: 1,
        height: SCALED_SIZE.s50,
        fontFamily: FONT.REGULAR,
        fontSize: SCALED_SIZE.s14,
        paddingHorizontal: SCALED_SIZE.s15
    },
    circle: {
        width: SCALED_SIZE.s30,
        height: SCALED_SIZE.s30,
        borderRadius: SCALED_SIZE.s30 / SCALED_SIZE.s2,
        marginVertical: SCALED_SIZE.s5,
        marginLeft: SCALED_SIZE.s5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const CustomTextInput = memo(({
    showFullBackgroundColor,
    showFullBackgroundColorIcon,
    showInputIcon,
    showInputIconBackgroundColor,
    onFocus,
    onBlur,
    pointerEvents,
    placeholder,
    keyboardType,
    multiline,
    secureTextEntry,
    onChangeText,
    value,
    scrollEnabled,
    editable,
    keyboardAppearance,
    customInputContainerStyle,
    icon,
    iconSvgProps,
    iconPress,
}) => {
    // eslint-disable-next-line no-unused-vars
    const [focused, setFocused] = useState(false);
    const { colors } = useTheme();

    const ConditionalView = showFullBackgroundColor ? Fragment : View;

    const CustomIcon = icon || Fragment;

    const props = {
        style: {
            ...styles.textInputConditionalContainer,
            ...customInputContainerStyle
        }
    };

    const conditionalViewProps = showFullBackgroundColor
        ? {}
        : props;

    return (
        <ConditionalView
            {...conditionalViewProps}
        >
            <View
                style={{
                    ...styles.textInputContainer,
                    width: showFullBackgroundColor
                        ? '100%'
                        : '85%',
                    ...customInputContainerStyle
                }}>
                <TextInput
                    keyboardAppearance={keyboardAppearance}
                    pointerEvents={pointerEvents}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    editable={editable}
                    onFocus={() => {
                        setFocused(true);
                        onFocus();
                    }}
                    onBlur={() => {
                        setFocused(false);
                        onBlur();
                    }}
                    multiline={multiline}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    value={value}
                    scrollEnabled={scrollEnabled}
                    placeholderTextColor="#6D6E71"
                    style={{
                        ...styles.textInputStyle,
                        color: colors.boldHeadingText
                    }}
                />
                {
                    showInputIcon ?
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={iconPress}>
                            <View style={{
                                ...styles.circle,
                                backgroundColor: showInputIconBackgroundColor
                                    ? '#ff3c78'
                                    : '#0000',
                            }}>
                                <CustomIcon
                                    {...iconSvgProps}
                                />
                            </View>
                        </TouchableOpacity>
                        :
                        null
                }
            </View>
            {
                showFullBackgroundColorIcon ?
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={iconPress}>
                        <View style={{
                            ...styles.circle,
                            backgroundColor: '#ff3c78',
                        }}>
                            <CustomIcon
                                {...iconSvgProps}
                            />
                        </View>
                    </TouchableOpacity>
                    :
                    null
            }
        </ConditionalView>
    );
});

CustomTextInput.propTypes = {
    showFullBackgroundColor: PropTypes.bool,
    showFullBackgroundColorIcon: PropTypes.bool,
    showInputIcon: PropTypes.bool,
    showInputIconBackgroundColor: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    pointerEvents: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    multiline: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    scrollEnabled: PropTypes.bool,
    editable: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
    customInputContainerStyle: PropTypes.object,
    iconSvgProps: PropTypes.object,
    iconPress: PropTypes.func,
    icon: PropTypes.func
};

CustomTextInput.defaultProps = {
    showFullBackgroundColor: true,
    showFullBackgroundColorIcon: false,
    showInputIcon: true,
    showInputIconBackgroundColor: true,
    onFocus: () => { },
    onBlur: () => { },
    editable: true,
    customInputContainerStyle: {},
    iconSvgProps: {},
    iconPress: () => { },
    keyboardType: 'default',
};
