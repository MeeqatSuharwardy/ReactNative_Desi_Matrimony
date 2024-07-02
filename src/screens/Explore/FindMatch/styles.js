import { StyleSheet } from 'react-native';
import { SCALED_SIZE } from '~src/assets/fonts';
import { screenWidth } from '~src/constants/screenSizes';

export default StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
    }),
    topSvg: {
        position: 'absolute',
        height: SCALED_SIZE.s93,
        width: screenWidth,
        top: -SCALED_SIZE.s1,
    },
});
