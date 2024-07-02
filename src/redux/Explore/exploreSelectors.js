import { createSelector } from 'reselect';

const exploreReducer = state => state.explore;

export const selectFirebaseUsersStates = createSelector(exploreReducer, explore => ({
    active_users: explore.active_users,
    filtered_active_users: explore.filtered_active_users,
    subscribed_id: explore.subscribed_id,
    subscribed_id_user: explore.subscribed_id_user
}));
