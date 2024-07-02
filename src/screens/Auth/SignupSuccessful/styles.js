import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { screenWidth } from '~src/constants/screenSizes';

export default StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        paddingVertical: SCALED_SIZE.s80,
        paddingHorizontal: SCALED_SIZE.s20,
        backgroundColor,
    }),
    topSvg: {
        position: 'absolute',
        height: SCALED_SIZE.s93,
        width: screenWidth,
        top: 0
    },
    bottomSvg: {
        position: 'absolute',
        height: SCALED_SIZE.s93,
        width: screenWidth,
        bottom: 0
    },
    headingText: color => ({
        fontFamily: FONT.BLACK,
        fontSize: SCALED_SIZE.s24,
        color,
        alignSelf: 'flex-start'
    }),
    miniHeadingText: color => ({
        fontFamily: FONT.BOLD,
        fontSize: SCALED_SIZE.s16,
        color,
        paddingTop: SCALED_SIZE.s20,
        paddingBottom: SCALED_SIZE.s40,
        alignSelf: 'flex-start'
    }),
    continueButton: {
        position:'absolute',
        bottom:SCALED_SIZE.s150,
        width: '100%',
        alignSelf:'center'
    }
});
