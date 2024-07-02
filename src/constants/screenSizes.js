import { Dimensions, PixelRatio } from 'react-native';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const MEDIA_VALUE = {
    STANDARD_WIDTH: 414,
    STANDARD_HEIGHT: 896,
    SCREEN_PIXEL: 1.273,
    LARGE_SCREEN_WIDTH: 786,
};

const iphone11Wscale = WIDTH / MEDIA_VALUE.STANDARD_WIDTH;

const iphone11Hscale = HEIGHT / MEDIA_VALUE.STANDARD_HEIGHT;

export const screenHeight = HEIGHT;

export const screenWidth = WIDTH;

export const responsiveSize = (
    size,
    accessibilityScaleFactor,
    based = 'width',
) => {
    let newSize =
        based === 'height'
            ? size * iphone11Hscale
            : size * iphone11Wscale
        ;
    if (screenWidth < MEDIA_VALUE.LARGE_SCREEN_WIDTH) {
        if (accessibilityScaleFactor) {
            newSize = accessibilityScaleFactor(newSize);
        }
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    return size * MEDIA_VALUE.SCREEN_PIXEL;
};

export const scale = responsiveSize;
