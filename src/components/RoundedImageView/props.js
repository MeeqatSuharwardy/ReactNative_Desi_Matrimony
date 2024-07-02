import PropTypes from 'prop-types';

export const IMAGE_SIZE_VARIANTS = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
};

export const propTypes = {
    /**
     * Size prop for height & width of image. Round image will 
     * have same width & height.
     */
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * String prop to supply image URI
     */
    imageUri: PropTypes.string,
    /**
     * nameInitials
     */
    nameInitials: PropTypes.string,
    /**
     * nameTextColor
     */
    nameTextColor: PropTypes.string,
    /**
   * Number prop to apply custom font size to Name Initials
   */
    nameFontSize: PropTypes.number,
    /**
   * callback on image pressed
   */
    onPress: PropTypes.func,
    /**
   * borderColor of 
   */
    borderColor: PropTypes.string
};

export const defaultProps = {
    size: IMAGE_SIZE_VARIANTS.MEDIUM,
    borderColor: '#ffffff',
    onPress: () => {}
};
