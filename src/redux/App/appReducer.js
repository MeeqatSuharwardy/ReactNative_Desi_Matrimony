/* eslint-disable default-param-last */
import APP from './appConstants';

const initialState = {
    root: null,
    starting: true,
    ready: false,
    inactive: false,
    background: false,
    db: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
    case APP.START:
        return {
            ...state,
            root: action.payload
        };
    case APP.INIT:
        return {
            ...state,
            ready: false,
            starting: true
        };
    case APP.READY:
        return {
            ...state,
            ready: true,
            starting: false
        };
    default:
        return state;
    }
};

export default appReducer;
