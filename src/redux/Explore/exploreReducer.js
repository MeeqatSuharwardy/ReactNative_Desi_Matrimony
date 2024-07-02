/* eslint-disable default-param-last */
import EXPLORE from './exploreConstants';

const initialState = {
    active_users: [],
    filtered_active_users: [],
    subscribed_id: '',
    subscribed_id_user: null,
    errors: [],
};

const exploreReducer = (state = initialState, action) => {
    switch (action.type) {

    case EXPLORE.UPDATE_ACTIVE_USERS_REQUEST:
        return {
            ...state,
            active_users: action.payload,
        };
        
    case EXPLORE.UPDATE_FILTERED_ACTIVE_USERS:
        return {
            ...state,
            filtered_active_users: action.payload,
        };

    case EXPLORE.REST_FILTERED_ACTIVE_USERS:
        return {
            ...state,
            active_users: [],
            filtered_active_users: [],
            subscribed_id: '',
            subscribed_id_user: null,
        };

    case EXPLORE.UPDATE_SUBSCRIBED_ID:
        return {
            ...state,
            subscribed_id: action.payload,
        };

    case EXPLORE.UPDATE_SUBSCRIBED_ID_USER:
        return {
            ...state,
            subscribed_id_user: action.payload,
        };

    default: {
        return state;
    }
    }
};

export default exploreReducer;
