import { screenHeight } from '~src/constants/screenSizes';
import TOAST from './constants';

export const showToast = (
    message,
    _positionValue = screenHeight * 0.2,
    _position = 'bottom',
    _backgroundColor = 'red',
    _fadeOutDuration = 3000
) => ({
    type: TOAST.TOAST_TRIGGER,
    payload: {
        position: _position,
        text: message,
        style: { backgroundColor: _backgroundColor },
        fadeOutDuration: _fadeOutDuration,
        positionValue: _positionValue
    },
});
