import React, { memo } from 'react';
import { Text, Image, Pressable } from 'react-native';
import { SCALED_SIZE } from '~src/assets/fonts';
import { scale } from '~src/constants/screenSizes';
import { propTypes, defaultProps, IMAGE_SIZE_VARIANTS } from './props';

/**
 * Rounded Image View Component that displays either the Avatar/Profile Image  or the name initials in
 * circular shape. 
 * 
 * It takes a size prop which can either be a number or one of IMAGE_SIZE_VARIANTS(SMALL, MEDIUM, LARGE).
 * There are three pre-defined sizes; SMALL (90px), MEDIUM (130px) and LARGE (160px), one of those can 
 * be set via IMAGE_SIZE_VARIANTS.
 * 
 * Since for circular image the width & height should be equal, there is only this prop named `size`, 
 * which sets the same value for both width & height attributes of the Image widget.
 * 
 * There is a border-radius required to make the image circular, which is always half of the size. As a 
 * consumer of the component, one does not need to provide that value. It's calculated from size prop.
 * 
 * nameInitials props are required which are displayed as alternate if the Avatar/Profile Image URI is 
 * not available, only first 2 letters of the nameInitials are displayed as Text Avatar.
 * @param {*} param0 
 * @returns 
 */

const getSize = size => {
    let imgSize;
    switch (size) {
    case IMAGE_SIZE_VARIANTS.SMALL:
        imgSize = 90;
        break;
    case IMAGE_SIZE_VARIANTS.MEDIUM:
        imgSize = 130;
        break;
    case IMAGE_SIZE_VARIANTS.LARGE:
        imgSize = 160;
        break;
    default:
        imgSize = size;
        break;
    }
    return scale(imgSize);
};

const getBorderRadius = size => {
    let borderRadius;
    switch (size) {
    case IMAGE_SIZE_VARIANTS.SMALL:
        borderRadius = 90;
        break;
    case IMAGE_SIZE_VARIANTS.MEDIUM:
        borderRadius = 130;
        break;
    case IMAGE_SIZE_VARIANTS.LARGE:
        borderRadius = 160;
        break;
    default:
        borderRadius = size;
        break;
    }
    borderRadius = Math.ceil(borderRadius / 2);
    return scale(borderRadius);
};

export const RoundedImageView = memo(({
    size,
    imageUri,
    bgColor,
    nameInitials,
    nameTextColor,
    nameFontSize,
    nameLineHeight,
    onPress,
    borderColor
}) => {

    let textAvatar = nameInitials || '';
    textAvatar = textAvatar
        && textAvatar.length > 2
        ? textAvatar
            .substring(0, 2)
            .toUpperCase()
        : textAvatar
            .toUpperCase();

    return (
        <Pressable
            onPress={onPress}
            style={{
                alignItems: 'center',
                backgroundColor: imageUri
                    ? 'transparent'
                    : bgColor,
                height: getSize(size),
                justifyContent: 'center',
                width: getSize(size),
                borderRadius: getBorderRadius(size),
                borderWidth: SCALED_SIZE.s1,
                borderColor
               
            }}
        >
            {
                imageUri &&
                <Image
                    style={{
                        borderRadius: getBorderRadius(size),
                        flex: 1,
                        height: '100%',
                        resizeMode: 'cover',
                        width: '100%',
                    }}
                    source={{ uri: imageUri }}
                />
            }
            {
                !imageUri
                && textAvatar
                &&
                <Text
                    style={{
                        color: nameTextColor,
                        fontSize: nameFontSize,
                        lineHeight: nameLineHeight,
                    }}
                >
                    {textAvatar}
                </Text>
            }
        </Pressable>
    );
});

RoundedImageView.propTypes = propTypes;
RoundedImageView.defaultProps = defaultProps;
