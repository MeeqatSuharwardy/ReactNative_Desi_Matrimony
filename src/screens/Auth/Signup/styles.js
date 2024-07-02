import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
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
        top: 0
    },
    bottomSvg: {
        position: 'absolute',
        height: SCALED_SIZE.s93,
        width:
            screenWidth,
        bottom: 0
    },
    scrollContainer: {
        flexGrow: 1,
        padding: SCALED_SIZE.s20,
        paddingVertical: SCALED_SIZE.s85,
        alignItems: 'center'
    },
    addImageContainer: borderColor => ({
        borderRadius: SCALED_SIZE.s110,
        overflow: 'hidden',
        marginVertical: SCALED_SIZE.s10,
        borderWidth: SCALED_SIZE.s2,
        borderColor
    }),
    addImage: {
        height: SCALED_SIZE.s220,
        width: SCALED_SIZE.s220,
    },
    icon: {
        height: SCALED_SIZE.s20,
        width: SCALED_SIZE.s20,
    },
    welcomeText: color => ({
        fontFamily: FONT.BLACK,
        fontSize: SCALED_SIZE.s24,
        color,
        alignSelf: 'flex-start'
    }),
    logback: color => ({
        fontFamily: FONT.BOLD,
        fontSize: SCALED_SIZE.s16,
        color,
        paddingTop: SCALED_SIZE.s20,
        paddingBottom: SCALED_SIZE.s40,
        alignSelf: 'flex-start'
    }),
    signingupTheAccount: color => ({
        fontFamily: FONT.MEDIUM,
        fontSize: SCALED_SIZE.s15,
        color,
        paddingBottom: SCALED_SIZE.s10,
        paddingTop: SCALED_SIZE.s40,
    }),
    termsOfService: color => ({
        fontFamily: FONT.BOLD,
        color,
        fontSize: SCALED_SIZE.s15,
        paddingBottom: SCALED_SIZE.s40,
    }),
    signupButton: {
        width: '100%',
        borderColor: '#ffffff',
        borderWidth: SCALED_SIZE.s1,
    },
});
