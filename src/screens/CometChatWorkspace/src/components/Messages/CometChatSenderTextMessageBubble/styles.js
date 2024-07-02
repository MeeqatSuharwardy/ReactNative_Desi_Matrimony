import { StyleSheet } from 'react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { heightRatio, widthRatio } from '../../../utils/consts';

export default StyleSheet.create({
  container: { marginBottom: SCALED_SIZE.s16, marginRight: SCALED_SIZE.s8 },
  linkTitle: { fontWeight: '700' },
  linkDescription: {
    fontStyle: 'italic',
    fontSize: SCALED_SIZE.s13,
  },
  autoLinkStyle: { color: 'white', fontSize: SCALED_SIZE.s16, fontFamily: FONT.REGULAR, fontWeight:'400' },
  previewAutoLinkStyle: { textAlign: 'center' },
  linkStyle: { textDecorationLine: 'underline', fontSize: SCALED_SIZE.s15 },
  linkTextStyle: { fontWeight: '700' },
  messageWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3c78',

    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: SCALED_SIZE.s12,
    paddingVertical: SCALED_SIZE.s8,
    maxWidth: '65%',
    borderRadius: SCALED_SIZE.s10,
    marginBottom: SCALED_SIZE.s4,
  },
  messageInfoWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
});
