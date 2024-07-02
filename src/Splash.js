import React, { memo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { screenWidth } from '~src/constants/screenSizes';
import { APP_ICON_WHITE_TRANSPARENT } from './assets/images';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EF437A'
    },
    iconStyle: {
        width: screenWidth * 0.36,
        alignSelf: 'center'
    }
});

export const Splash = memo(() => (
    <View style={styles.container}>
        <Image
            source={APP_ICON_WHITE_TRANSPARENT}
            resizeMode="contain"
            style={styles.iconStyle}
        />
    </View>
));


