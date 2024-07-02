import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';

export default StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: backgroundColor => ({
        flex: 1,
        backgroundColor,
        padding: SCALED_SIZE.s20
    }),
    buttonContainer: {
        justifyContent: 'flex-end',
        flex: 1
    },
    loginButtontext: color => ({
        color
    }),
    loginButtonColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: SCALED_SIZE.s50
    },
    image: {
        height: SCALED_SIZE.s220,
        width: SCALED_SIZE.s220
    },
    logoText:{
        color: '#FFFFFF',
        fontFamily: FONT.BOLD,
        fontSize: SCALED_SIZE.s28
    }
});
