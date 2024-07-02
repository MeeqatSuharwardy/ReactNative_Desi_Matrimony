/* eslint-disable import/no-mutable-exports */
import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar, NativeModules } from 'react-native';
import PropTypes from 'prop-types';
import { isRunningOniOS } from '~src/utils/helperFuncs';

const { StatusBarManager } = NativeModules;

export const STATUSBAR_HEIGHT = isRunningOniOS()
    ? StatusBarManager.HEIGHT
    : 0;

const styles = StyleSheet.create({
    statusbarConatiner: backgroundColor => ({
        width: '100%',
        height: STATUSBAR_HEIGHT,
        backgroundColor,
    })
});

export const Statusbar = ({
    translucent,
    barStyle,
    backgroundColor,
    customStatusBarStyle,
}) => {

    useEffect(() => {
        StatusBar
            .setBarStyle(
                'dark-content',
                false
            );
    }, []);

    return (
        <View
            style={[
                styles.statusbarConatiner(backgroundColor),
                customStatusBarStyle
            ]}
        >
            <StatusBar
                translucent={translucent}
                barStyle={barStyle}
                backgroundColor={backgroundColor}
            />
        </View>
    );
};

Statusbar.propTypes = {
    translucent: PropTypes.bool,
    barStyle: PropTypes.string,
    backgroundColor: PropTypes.string,
    customStatusBarStyle: PropTypes.object
};

Statusbar.defaultProps = {
    translucent: false,
    barStyle: 'light-content',
    backgroundColor: '#ff3c78',
    customStatusBarStyle: {}
};

