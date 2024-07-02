import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
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
    headingText: color => ({
        fontFamily: FONT.BOLD,
        fontSize: SCALED_SIZE.s18,
        color,
        alignSelf: 'flex-start',
    }),
});
