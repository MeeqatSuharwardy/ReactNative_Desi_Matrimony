import { scale } from "~src/constants/screenSizes";

export const FONT = {
    BLACK: "TTNormsPro-Black",
    BLACK_ITALIC: "TTNormsPro-BlackItalic",
    BOLD: "TTNormsPro-Bold",
    BOLD_ITALIC: "TTNormsPro-BoldItalic",
    EXTRA_BLACK_ITALIC: "TTNormsPro-ExtraBlackItalic",
    EXTRA_BLACK: "TTNormsPro-ExtraBlack",
    EXTRA_BOLD_ITALIC: "TTNormsPro-ExtraBoldItalic",
    EXTRA_BOLD: "TTNormsPro-ExtraBold",
    EXTRA_LIGHT_ITALIC: "TTNormsPro-ExtraLightItalic",
    EXTRA_LIGHT: "TTNormsPro-ExtraLight",
    ITALIC: "TTNormsPro-Italic",
    LIGHT_ITALIC: "TTNormsPro-LightItalic",
    LIGHT: "TTNormsPro-Light",
    MEDIUM_ITALIC: "TTNormsPro-MediumItalic",
    MEDIUM: "TTNormsPro-Medium",
    REGULAR: "TTNormsPro-Regular",
    THIN_ITALIC: "TTNormsPro-ThinItalic",
    THIN: "TTNormsPro-Thin",
};

const createFontSize = (base, types) => {
    const res = {};
    // eslint-disable-next-line no-return-assign
    types.forEach(type => (res[`${base}${type}`] = scale(type)));
    return res;
};

export const SCALED_SIZE = createFontSize('s', Array.from(Array(500).keys()));
