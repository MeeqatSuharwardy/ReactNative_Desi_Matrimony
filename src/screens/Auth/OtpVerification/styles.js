import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { screenWidth } from '~src/constants/screenSizes';

export default StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        backgroundColor,
    }),
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: SCALED_SIZE.s80,
        paddingHorizontal: SCALED_SIZE.s20
    },
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
    enterOTP: {
        height: SCALED_SIZE.s220,
        alignSelf: 'center',
        paddingVertical: SCALED_SIZE.s20,
    },
    proceedArrow: {
        height: SCALED_SIZE.s60,
        alignSelf: 'center',
    },
    verifyButton: {
        marginTop:SCALED_SIZE.s100,
        width: '100%',
        borderColor: '#ffffff',
        borderWidth: SCALED_SIZE.s1,
    },
    otpContainer: {
        height: SCALED_SIZE.s60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: SCALED_SIZE.s100,
        paddingBottom: SCALED_SIZE.s120
    },
    otpTextContainer: color => ({
        borderWidth: SCALED_SIZE.s1,
        borderColor: color,
        height: SCALED_SIZE.s60,
        justifyContent: 'center',
        width: SCALED_SIZE.s55,
        alignItems: 'center',
        borderRadius: SCALED_SIZE.s10,
        textAlign: 'center',
        fontFamily: FONT.MEDIUM,
        fontSize: SCALED_SIZE.s20,
        color
    }),
});
