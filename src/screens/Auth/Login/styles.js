import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';

export default StyleSheet.create({

    container: backgroundColor => ({
        flex: 1,
        backgroundColor,
    }),
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: SCALED_SIZE.s50,
        paddingHorizontal: SCALED_SIZE.s20,
    },
    welcomeText: color => ({
        fontFamily: FONT.BLACK,
        fontSize: SCALED_SIZE.s24,
        color
    }),
    logback: color => ({
        fontFamily: FONT.BOLD,
        fontSize: SCALED_SIZE.s16,
        color,
        paddingTop: SCALED_SIZE.s20,
        paddingBottom: SCALED_SIZE.s40,
    }),
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loginBox: backgroundColor => ({
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SCALED_SIZE.s30,
        paddingVertical: SCALED_SIZE.s20,
        borderTopLeftRadius: SCALED_SIZE.s100,
        borderTopRightRadius: SCALED_SIZE.s100,
        borderBottomLeftRadius: SCALED_SIZE.s15,
        borderBottomRightRadius: SCALED_SIZE.s100,
        backgroundColor,
        height: SCALED_SIZE.s430,
        shadowColor: '#000',
        shadowOffset: {
            width: SCALED_SIZE.s0,
            height: SCALED_SIZE.s2,
        },
        shadowOpacity: 0.35,
        shadowRadius: SCALED_SIZE.s14,
        elevation: SCALED_SIZE.s5,
    }),
    loginText: color => ({
        fontSize: SCALED_SIZE.s24,
        color,
        paddingBottom: SCALED_SIZE.s40,
        width: '100%',
        fontFamily: FONT.EXTRA_BLACK,
    }),
    icon: {
        height: SCALED_SIZE.s20,
        width: SCALED_SIZE.s20,
    },
    loginButton: {
        marginTop: SCALED_SIZE.s40,
        width: '100%',
        borderColor: '#ffffff',
        borderWidth: SCALED_SIZE.s1,
    },
    accountYet: color => ({
        fontFamily: FONT.MEDIUM,
        fontSize: SCALED_SIZE.s15,
        color,
        paddingBottom: SCALED_SIZE.s20,
        paddingTop: SCALED_SIZE.s50,
        textAlign: 'center',
    }),
    joinNow: color => ({
        fontFamily: FONT.BOLD,
        color,
    }),
    forgotPassword: color => ({
        textAlign: 'center',
        fontFamily: FONT.BOLD,
        fontSize: SCALED_SIZE.s15,
        color,
    }),
});
