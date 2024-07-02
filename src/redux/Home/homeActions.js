import HOME from './homeConstants';

export const updateProfileViewRequest = id => ({
    type: HOME.UPDATE_PROFILE_VIEW,
    id
});

/* **************************** */
/* Profile Visited by actions with pagination */
/* **************************** */
export const getUserProfileVisitedByRequest = () => ({
    type: HOME.GET_USER_PROFILE_VISITED_BY_REQUEST,
});

export const getUserProfileVisitedByRequestStarted = () => ({
    type: HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_STARTED,
});

export const getUserProfileVisitedByRequestSuccess = profileVisitedByData => ({
    type: HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_SUCCESS,
    payload: profileVisitedByData,
});

export const getUserProfileVisitedByRequestFailed = err => ({
    type: HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_FAILURE,
    payload: err,
});

export const getUserProfileVisitedByRequestOnEndReached = () => ({
    type: HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_ON_END_REACHED,
});

export const getUserProfileVisitedByRequestOnEndReachedStarted = () => ({
    type: HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_ON_END_REACHED_STARTED,
});

export const getUserProfileVisitedByRequestOnEndReachedSuccess = profileVisitedByData => ({
    type: HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_ON_END_REACHED_SUCCESS,
    payload: profileVisitedByData,
});

export const getUserProfileVisitedByRequestOnEndReachedFailed = err => ({
    type: HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_ON_END_REACHED_FAILURE,
    payload: err,
});
/* **************************** */

/* **************************** */
/* Dil Received to user actions with pagination */
/* **************************** */
export const getDilReceivedUsersRequest = () => ({
    type: HOME.GET_DIL_RECEIVED_USERS_REQUEST,
});

export const getDilReceivedUsersStarted = () => ({
    type: HOME.GET_DIL_RECEIVED_USERS_REQUEST_STARTED,
});

export const getDilReceivedUsersSuccess = dilReceivedUsers => ({
    type: HOME.GET_DIL_RECEIVED_USERS_REQUEST_SUCCESS,
    payload: dilReceivedUsers,
});

export const getDilReceivedUsersFailed = err => ({
    type: HOME.GET_DIL_RECEIVED_USERS_REQUEST_FAILURE,
    payload: err,
});

export const getDilReceivedUsersOnEndReachedRequest = () => ({
    type: HOME.GET_DIL_RECEIVED_USERS_REQUEST,
});

export const getDilReceivedUsersOnEndReachedStarted = () => ({
    type: HOME.GET_DIL_RECEIVED_USERS_REQUEST_STARTED,
});

export const getDilReceivedUsersOnEndReachedSuccess = dilReceivedUsers => ({
    type: HOME.GET_DIL_RECEIVED_USERS_REQUEST_SUCCESS,
    payload: dilReceivedUsers,
});

export const getDilReceivedUsersOnEndReachedFailed = err => ({
    type: HOME.GET_DIL_RECEIVED_USERS_REQUEST_FAILURE,
    payload: err,
});
/* **************************** */

export const setSelectedUser = user => ({
    type: HOME.SET_SELECTED_USER,
    payload: user,
});

export const sendLikeSentiment = sentimentTo => ({
    type: HOME.SEND_LIKE_SENTIMENT,
    sentimentTo
});

export const sendDisLikeSentiment = sentimentTo => ({
    type: HOME.SEND_DISLIKE_SENTIMENT,
    sentimentTo
});

export const openChatWithUser = otherUserID => ({
    type: HOME.OPEN_CHAT_WITH_USER,
    otherUserID
});
