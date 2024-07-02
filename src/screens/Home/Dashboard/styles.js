import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { screenWidth } from '~src/constants/screenSizes';

export default StyleSheet.create({
    topSvg: {
        position: 'absolute',
        height: SCALED_SIZE.s140,
        width: screenWidth,
        top: -SCALED_SIZE.s1,
        transform: [{
            rotate: '180deg'
        }]
    },
    headingText: color => ({
        fontFamily: FONT.BOLD,
        fontSize: SCALED_SIZE.s18,
        color,
        alignSelf: 'flex-start',
    }),
    miniHeadingText: color => ({
        fontFamily: FONT.BOLD,
        fontSize: SCALED_SIZE.s16,
        color,
        alignSelf: 'center'
    }),
    completeProfileAnimation: {
        height: SCALED_SIZE.s20,
        width: SCALED_SIZE.s20,
    }
});
