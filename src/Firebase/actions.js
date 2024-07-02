/* eslint-disable import/no-cycle */
import database from '@react-native-firebase/database';
import _ from 'lodash';
import { getUserId } from '~src/utils/helperFuncs';
import * as FirebaseConstants from './constants';
import {
    processActiveUsersData,
    processMatchStatusData,
    processMatchStatusForIdData,
    recordError
} from './services';

export const activeUsersTableRefrence = () =>
    database()
        .ref(
            FirebaseConstants
                .TABLES
                .ACTIVE_USERS
        );

export const addUserInActiveUsersTable = async (
    id,
    data =
    FirebaseConstants
        .MATCHING_STATUSES
        .MATCHING
) => {
    const currentUserId = await getUserId();
    if (currentUserId) {
        return activeUsersTableRefrence()
            .child(id || currentUserId)
            .set(data);
    }
    return null;
};

export const removeCurrentUserinActiveUsersTable = async () => {
    const currentUserId = await getUserId();
    if (currentUserId) {
        return activeUsersTableRefrence()
            .child(currentUserId)
            .remove();
    }
    return null;
};

export const subscribeActiveUsers = () => {
    activeUsersTableRefrence()
        .orderByValue()
        .equalTo(
            FirebaseConstants
                .MATCHING_STATUSES
                .MATCHING
        )
        .on(
            FirebaseConstants
                .LISTNERS
                .ACTIVE_USERS,
            snapshot =>
                processActiveUsersData({
                    snapshot,
                    activeUsersTableRefrence,
                    getUserId
                }),
            recordError
        );
};

export const unsubscribeActiveUsers = () => {
    removeCurrentUserinActiveUsersTable();
    return activeUsersTableRefrence()
        .off();
};

export const matchStatusTableRefrence = () =>
    database()
        .ref(
            FirebaseConstants
                .TABLES
                .MATCHED_STATUS
        );

export const addRequestWithParamInMatchStatusTable = async (
    params = {
        [
        FirebaseConstants
            .MATCHING_REQUEST_PARAMS
            .REQUEST_WITH
        ]: '',
        [
        FirebaseConstants
            .MATCHING_REQUEST_PARAMS
            .TIME_STAMP
        ]: database
            .ServerValue
            .TIMESTAMP,
    },
    id = ''
) => {
    const currentUserId = await getUserId();
    if (currentUserId) {
        return matchStatusTableRefrence()
            .child(id || currentUserId)
            .set(params);
    }
    return null;
};

export const subscribeMatchStatus = async () => {
    const currentUserId = await getUserId();
    if (currentUserId) {
        matchStatusTableRefrence()
            .child(currentUserId)
            .on(
                FirebaseConstants
                    .LISTNERS
                    .MATCHED_STATUS,
                snapshot =>
                    processMatchStatusData({
                        snapshot,
                        matchStatusTableRefrence,
                        getUserId
                    }),
                recordError
            );
    }
    return null;
};

export const getMatchStatusForId = id =>
    matchStatusTableRefrence()
        .child(id)
        .once(
            FirebaseConstants
                .LISTNERS
                .GET_MATCHED_STATUSFOR_USER_ID,
            processMatchStatusForIdData,
            recordError
        );


export const removeStatusinMatchStatusTable = async () => {
    const currentUserId = await getUserId();
    if (currentUserId) {
        let matchedStatusIdForCurrentUser = await getMatchStatusForId(currentUserId);
        matchedStatusIdForCurrentUser = matchedStatusIdForCurrentUser
            .val()
            [
                FirebaseConstants
                    .MATCHING_REQUEST_PARAMS
                    .REQUEST_WITH
            ];
        if (!_.isEmpty(matchedStatusIdForCurrentUser)) {
            matchStatusTableRefrence()
                .child(matchedStatusIdForCurrentUser)
                .set({
                    [
                    FirebaseConstants
                        .MATCHING_REQUEST_PARAMS
                        .REQUEST_WITH
                    ]: '',
                    [
                    FirebaseConstants
                        .MATCHING_REQUEST_PARAMS
                        .TIME_STAMP
                    ]: database
                        .ServerValue
                        .TIMESTAMP,
                });
            addUserInActiveUsersTable(matchedStatusIdForCurrentUser);
        }
        matchStatusTableRefrence()
            .child(currentUserId)
            .set({
                [
                FirebaseConstants
                    .MATCHING_REQUEST_PARAMS
                    .REQUEST_WITH
                ]: '',
                [
                FirebaseConstants
                    .MATCHING_REQUEST_PARAMS
                    .TIME_STAMP
                ]: database
                    .ServerValue
                    .TIMESTAMP,
            });
    }
};

export const unsubscribeMatchStatus = () => {
    removeStatusinMatchStatusTable();
    return matchStatusTableRefrence()
        .off();
};
