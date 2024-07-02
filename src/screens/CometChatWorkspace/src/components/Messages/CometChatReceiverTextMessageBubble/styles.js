import { StyleSheet } from 'react-native';
import { heightRatio, widthRatio } from '../../../utils/consts';
import theme from '../../../resources/theme';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
export default StyleSheet.create({
  messageLinkStyle: {
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize: 15,
  },
  container: { marginBottom: SCALED_SIZE.s16, marginLeft: SCALED_SIZE.s4 },
  innerContainer: { flexDirection: 'row', alignItems: 'flex-start' },
  senderNameStyle: {
    marginBottom: SCALED_SIZE.s2,
    color: theme.color.helpText,
    fontSize: SCALED_SIZE.s12,
    paddingLeft: SCALED_SIZE.s8,
  },
  autolinkStyle: { color: theme.color.primary, fontSize: SCALED_SIZE.s16, fontFamily: FONT.REGULAR, fontWeight:'400' },
  messageContainer: { maxWidth: '81%', minWidth: '81%' },
  linkObjectDescription: {
    fontStyle: 'italic',
    fontSize: SCALED_SIZE.s13,
  },
  linkObjectTitle: {
    fontWeight: '700',
  },
  messageWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SCALED_SIZE.s0,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: SCALED_SIZE.s8,
    paddingVertical: SCALED_SIZE.s8,
    maxWidth: '100%',
    borderRadius: SCALED_SIZE.s12,
  },
  messageInfoWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: SCALED_SIZE.s8,
  },
  messagePreviewContainerStyle: {
    borderRadius: SCALED_SIZE.s12,
    flex: 1,
  },
  previewImageStyle: {
    height: SCALED_SIZE.s150,
    marginVertical: SCALED_SIZE.s12,
  },
  previewImageIconStyle: {
    height: SCALED_SIZE.s50,
    marginVertical: SCALED_SIZE.s12,
  },
  previewDataStyle: {
    borderTopWidth: SCALED_SIZE.s1,
    borderBottomWidth: SCALED_SIZE.s1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewTitleStyle: {
    flexWrap: 'wrap',
    textAlign: 'left',
    marginBottom: SCALED_SIZE.s8,
  },
  previewDescStyle: {
    textAlign: 'left',
    paddingVertical: SCALED_SIZE.s8,
  },
  previewTextStyle: {
    paddingHorizontal: SCALED_SIZE.s5,
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: SCALED_SIZE.s8,
  },
  previewLinkStyle: {
    padding: SCALED_SIZE.s12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  msgTimestampStyle: {
    fontSize: SCALED_SIZE.s11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  avatarStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: SCALED_SIZE.s36,
    height: SCALED_SIZE.s36,
    marginRight: SCALED_SIZE.s8,
    backgroundColor: 'rgba(51,153,255,0.25)',
    borderRadius: SCALED_SIZE.s25,
    alignSelf: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
