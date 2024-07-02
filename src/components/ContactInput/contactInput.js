import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CountryPicker,
{
    DEFAULT_THEME,
    DARK_THEME
} from 'react-native-country-picker-modal';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { IconContact } from '~src/assets/svg';
import { LABEL } from '~src/constants/displayTexts';
import { CustomTextInput } from '../CustomTextInput';

const styles = StyleSheet.create({
    inputStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    upperView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: SCALED_SIZE.s20,
        borderRadius: SCALED_SIZE.s25,
        overflow: 'hidden',
        marginVertical: SCALED_SIZE.s10,
        backgroundColor: '#F7F7F7',
        height: SCALED_SIZE.s50
    },
    icon: {
        height: SCALED_SIZE.s20,
        width: SCALED_SIZE.s20,
    },
    customInputContainerStyle: {
        marginVertical: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingLeft: 0,
    },
    callingCodeText: color => ({
        fontSize: SCALED_SIZE.s14,
        alignSelf: 'center',
        fontFamily: FONT.REGULAR,
        color
    }),
    modalButtonStyle: {
        fontSize: SCALED_SIZE.s14
    },
    button: {
        flexDirection: 'row',
    }
});

export const ContactInput = ({
    newStyle,
    cca2,
    darkTheme,
    select,
    callingCode,
    onChangeText,
    value
}) => {
    const [visible, setVisible] = useState(false);
    const switchVisible = () => setVisible(!visible);
    const colors = useTheme();
    return (
        <View style={[
            styles.upperView,
            newStyle
        ]}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => switchVisible()}>
                <CountryPicker
                    visible={visible}
                    countryCode={cca2}
                    translation="common"
                    withCallingCode
                    withAlphaFilter
                    withFilter
                    theme={
                        darkTheme
                            ? DARK_THEME
                            : DEFAULT_THEME
                    }
                    onSelect={select}
                    containerButtonStyle={styles.modalButtonStyle}
                    modalProps={visible}
                    onClose={() => setVisible(false)}
                    onOpen={() => setVisible(true)}
                />
                <Text
                    style={styles.callingCodeText(colors.colors.boldHeadingText)}>
                    +{callingCode}
                </Text>
            </TouchableOpacity>
            <View
                style={styles.inputStyle}>
                <CustomTextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={LABEL.CONTACT_NUMBER}
                    customInputContainerStyle={styles.customInputContainerStyle}
                    icon={IconContact}
                    iconSvgProps={styles.icon}
                />
            </View>
        </View>
    );
};

ContactInput.propTypes = {
    newStyle: PropTypes.object,
    cca2: PropTypes.string,
    darkTheme: PropTypes.bool,
    select: PropTypes.func,
    callingCode: PropTypes.array,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
};

ContactInput.defaultProps = {
    newStyle: null,
    cca2: 'DK',
    darkTheme: false,
    select: () => { },
    callingCode: ['45'],
    onChangeText: () => { },
    value: '',
};
