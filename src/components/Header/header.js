import React, { memo } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { IconBackArrow } from '~src/assets/svg';
import { screenHeight } from '~src/constants/screenSizes';
import { navigationActions } from '~src/navigation/navigationActions';

const styles = StyleSheet.create({
    headerContainer: backgroundColor => ({
        alignItems: 'center',
        flexDirection: 'row',
        height: screenHeight * 0.07,
        backgroundColor,
        paddingHorizontal: SCALED_SIZE.s20
    }),
    headingText: color => ({
        fontFamily: FONT.BOLD,
        fontSize: SCALED_SIZE.s18,
        color,
        alignSelf: 'center',
        paddingHorizontal: SCALED_SIZE.s10,
        flex: 1,
    }),
});

export const Header = memo(({
    title,
    showBackIcon
}) => {
    const { colors } = useTheme();
    return (
        <View
            style={styles.headerContainer(colors.buttonLinerGradient[0])}>
            {
                showBackIcon && 
                <Pressable
                    onPress={() => navigationActions.pop()}
                >
                    <IconBackArrow/>
                </Pressable>
            }
            <Text
                style={styles.headingText(colors.headingWhite)}
            >
                {title}
            </Text>
        </View>
    );

});

Header.propTypes = {
    title: PropTypes.string,
    showBackIcon: PropTypes.bool
};

Header.defaultProps = {
    title: '',
    showBackIcon: false
};
