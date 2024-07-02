import { StyleSheet } from 'react-native';
import { SCALED_SIZE } from '~src/assets/fonts';
import { screenWidth } from '~src/constants/screenSizes';

export default StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        backgroundColor,
    }),
    topSvg: {
        position: 'absolute',
        height: SCALED_SIZE.s93,
        width: screenWidth,
        top: -SCALED_SIZE.s1,
        transform: [
            { rotate: '180deg' },
            { rotateX: '180deg' }
        ]
    },
    scrollContainer: {
        flexGrow: 1,
        padding: SCALED_SIZE.s20,
        alignItems: 'center'
    },
});
