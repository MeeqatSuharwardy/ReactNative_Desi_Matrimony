import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';

export default StyleSheet.create({
    carouselContainer: {
        flexGrow: 1,
        height: '90%'
    },
    carouselContentContainer: {
    },
    paginationDot: {
        width: SCALED_SIZE.s50,
        height: SCALED_SIZE.s10,
        borderRadius: SCALED_SIZE.s20,
        marginHorizontal: SCALED_SIZE.s0,
        backgroundColor: '#ff3c78',
    },
    paginationDotInactive: {
        backgroundColor: '#BBC2DB',
        width: SCALED_SIZE.s10,
        marginHorizontal: SCALED_SIZE.s0,
        height: SCALED_SIZE.s10,
    },
    introItem: {
        padding: SCALED_SIZE.s20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: SCALED_SIZE.s15,
        paddingHorizontal: SCALED_SIZE.s10,
        textAlign: 'center',
        lineHeight: SCALED_SIZE.s27,
    },
    introImage: {
        width: '80%',
        height: '75%',
    },
    description: {
        lineHeight: SCALED_SIZE.s27,
        paddingHorizontal: SCALED_SIZE.s30,
        textAlign: 'center',
    },
    bottomActionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SCALED_SIZE.s40
    },
    skipTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nextTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    labelText: {
        fontFamily: FONT.MEDIUM,
        fontSize: SCALED_SIZE.s16,
        color: '#ff3c78'
    }
});
