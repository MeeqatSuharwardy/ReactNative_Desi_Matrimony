/* eslint-disable default-param-last */
import HOME from './homeConstants';

const initialState = {
    userProfileVisitedBy: [],
    userProfileVisitedByPage: 1,
    fetchingUserProfileVisitedByRequest: true,
    fetchingUserProfileVisitedByRequestOnEndReached: false,
    canRequestuserProfileVisitedByRequestOnEndReached: true,
    
    dilReceivedUsers: [],
    dilReceivedUsersPage: 1,
    fetchingDilReceivedUsersRequest: true,
    fetchingDilReceivedUsersRequestOnEndReached: false,
    canRequestDilReceivedUsersRequestOnEndReached: true,

    selectedUser: null,
    errors: [],
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {

    case HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_STARTED:
        return {
            ...state,
            // fetchingUserProfileVisitedByRequest: true,
        };

    case HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_SUCCESS:
        return {
            ...state,
            userProfileVisitedBy: action.payload,
            fetchingUserProfileVisitedByRequest: false,
            fetchingUserProfileVisitedByRequestOnEndReached: false
        };

    case HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingUserProfileVisitedByRequest: false,
        };

    case HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_ON_END_REACHED_STARTED:
        return {
            ...state,
            userProfileVisitedByPage: state.userProfileVisitedByPage + 1,
            fetchingUserProfileVisitedByRequestOnEndReached: true,
        };

    case HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_ON_END_REACHED_SUCCESS:
        return {
            ...state,
            userProfileVisitedBy: [...state.userProfileVisitedBy, ...action.payload],
            fetchingUserProfileVisitedByRequestOnEndReached: false,
            canRequestuserProfileVisitedByRequestOnEndReached: action.payload.length > 0
        };

    case HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_ON_END_REACHED_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingUserProfileVisitedByRequestOnEndReached: false,
        };
        
    case HOME.GET_DIL_RECEIVED_USERS_REQUEST_STARTED:
        return {
            ...state,
            // fetchingDilReceivedUsersRequest: true,
        };
    
    case HOME.GET_DIL_RECEIVED_USERS_REQUEST_SUCCESS:
        return {
            ...state,
            dilReceivedUsers: action.payload,
            fetchingDilReceivedUsersRequest: false,
            fetchingDilReceivedUsersRequestOnEndReached: false
        };
    
    case HOME.GET_DIL_RECEIVED_USERS_REQUEST_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingDilReceivedUsersRequest: false,
        };
    
    case HOME.GET_DIL_RECEIVED_USERS_REQUEST_ON_END_REACHED_STARTED:
        return {
            ...state,
            dilReceivedUsersPage: state.dilReceivedUsersPage + 1,
            fetchingDilReceivedUsersRequestOnEndReached: true,
        };
    
    case HOME.GET_DIL_RECEIVED_USERS_REQUEST_ON_END_REACHED_SUCCESS:
        return {
            ...state,
            dilReceivedUsers: [...state.dilReceivedUsers, ...action.payload],
            fetchingDilReceivedUsersRequestOnEndReached: false,
            canRequestDilReceivedUsersRequestOnEndReached: action.payload.length > 0
        };
    
    case HOME.GET_DIL_RECEIVED_USERS_REQUEST_ON_END_REACHED_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingDilReceivedUsersRequestOnEndReached: false,
        };

    case HOME.SET_SELECTED_USER:
        return {
            ...state,
            selectedUser: action.payload,
        };
    default: {
        return state;
    }
    }
};

export default homeReducer;
