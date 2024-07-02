import EXPLORE from './exploreConstants';

export const updateActiveUsersRequest = payload => ({
    type: EXPLORE.UPDATE_ACTIVE_USERS_REQUEST,
    payload
});

export const updateFilteredActiveUsers = payload => ({
    type: EXPLORE.UPDATE_FILTERED_ACTIVE_USERS,
    payload
});

export const resetFilteredActiveUsers = () => ({
    type: EXPLORE.REST_FILTERED_ACTIVE_USERS,
});

export const updateSubscribedId = payload => ({
    type: EXPLORE.UPDATE_SUBSCRIBED_ID,
    payload
});

export const updateSubscribedIdUser = payload => ({
    type: EXPLORE.UPDATE_SUBSCRIBED_ID_USER,
    payload
});
