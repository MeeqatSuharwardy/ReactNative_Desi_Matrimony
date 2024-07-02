import { createSelector } from 'reselect';

const homeReducer = state => state.home;

export const selectUserProfileVisitedByStates = createSelector(homeReducer, home => ({
    userProfileVisitedBy: home.userProfileVisitedBy,
    userProfileVisitedByPage: home.userProfileVisitedByPage,
    fetchingUserProfileVisitedByRequest: home.fetchingUserProfileVisitedByRequest,
    fetchingUserProfileVisitedByRequestOnEndReached: home.fetchingUserProfileVisitedByRequestOnEndReached,
    canRequestuserProfileVisitedByRequestOnEndReached: home.canRequestuserProfileVisitedByRequestOnEndReached,
}));

export const selectDilReceivedStates = createSelector(homeReducer, home => ({
    dilReceivedUsers: home.dilReceivedUsers,
    dilReceivedUsersPage: home.dilReceivedUsersPage,
    fetchingDilReceivedUsersRequest: home.fetchingDilReceivedUsersRequest,
    fetchingDilReceivedUsersRequestOnEndReached: home.fetchingDilReceivedUsersRequestOnEndReached,
    canRequestDilReceivedUsersRequestOnEndReached: home.fetchingDilReceivedUsersRequestOnEndReached,
}));

export const selectSelectedUser = createSelector(homeReducer, home => home.selectedUser);
