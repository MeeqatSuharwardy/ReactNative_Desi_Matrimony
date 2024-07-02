import { StyleSheet } from 'react-native';
import { SCALED_SIZE } from '~src/assets/fonts';

export default StyleSheet.create({
    container: backgroundColor => ({
        flex: 1,
        backgroundColor,
        paddingHorizontal: SCALED_SIZE.s10,
        paddingVertical: SCALED_SIZE.s20,
    }),
    completeAnimation: {
        height: SCALED_SIZE.s30,
        width: SCALED_SIZE.s30,
    }
});
