/* eslint-disable default-param-last */
import TOAST from './constants';

const initialState = {
    isShowing: false,
    text: '',
    position: 'bottom',
    positionValue: 120,
    fadeInDuration: 0,
    fadeOutDuration: 2000,
    opacity: 1
};

const toastReducer = (state = initialState, action) => {
    switch (action.type) {
    case TOAST.TOAST_TRIGGER_ON:
        return {
            ...state,
            isShowing: true,
            ...action.payload
        };
    case TOAST.TOAST_TRIGGER_OFF:
        return {
            ...initialState,
            isShowing: false
        };

    default: {
        return state;
    }
    }
};
export default toastReducer;
