import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { screenHeight } from '~src/constants/screenSizes';
import theme from '../../../resources/theme';
import { widthRatio, heightRatio } from '../../../utils/consts';

export default StyleSheet.create({
  callMessageStyle: {
    paddingVertical: SCALED_SIZE.s8,
    paddingHorizontal: SCALED_SIZE.s12,
    marginBottom: SCALED_SIZE.s16,
    textAlign: 'center',
  },
  callMessageTxtStyle: {
    alignSelf: 'center',
    fontSize: SCALED_SIZE.s12,
    fontWeight: '500',
    margin: SCALED_SIZE.s0,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: screenHeight * 0.07,
    paddingHorizontal: SCALED_SIZE.s10,
    backgroundColor: '#ff3c78',
  
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: SCALED_SIZE.s20,
    color: theme.color.blue,
  },
  headerDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  audioCallContainer: {
    paddingHorizontal: SCALED_SIZE.s8,
  },
  videoCallContainer: {
    paddingHorizontal: SCALED_SIZE.s8,
  },
  callIcon: {
    height: SCALED_SIZE.s24,
    width: SCALED_SIZE.s24,
  },
  videoIcon: { width: SCALED_SIZE.s34, height: SCALED_SIZE.s24, resizeMode: 'contain' },
  itemDetailContainer: {
    flex: 1,
  },
  itemNameText: {
    fontSize: SCALED_SIZE.s18,
    // fontWeight: '500',
    fontFamily: FONT.BOLD,
    color: theme.color.white,
  },
  statusText: {
    fontSize: SCALED_SIZE.s14,
    fontFamily: FONT.MEDIUM,
    color: theme.color.white,
  },
  avatarContainer: {
    height: SCALED_SIZE.s40,
    width: SCALED_SIZE.s40,
    borderRadius: SCALED_SIZE.s25,
    marginRight: SCALED_SIZE.s12,
  },
});
