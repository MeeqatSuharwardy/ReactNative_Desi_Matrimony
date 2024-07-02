/* eslint-disable import/no-cycle */
import database from '@react-native-firebase/database';
import { isEmpty } from 'lodash';
import { Firebase } from '~src/Firebase';
import { api, apiEndPoints } from '~src/services';

export const getFirebaseMatchStatusForId = async id => Firebase.actions.getMatchStatusForId(id);

export const updateMatchStatusTableAndActiveUserTabelForBothUsers
    = (currentUserId, otherUserId) => {
        Firebase
            .actions
            .addRequestWithParamInMatchStatusTable({
                [
                Firebase
                    .constants
                    .MATCHING_REQUEST_PARAMS
                    .REQUEST_WITH
                ]: otherUserId,
                [
                Firebase
                    .constants
                    .MATCHING_REQUEST_PARAMS
                    .TIME_STAMP
                ]: database
                    .ServerValue
                    .TIMESTAMP,
            },
            currentUserId
            );
        Firebase
            .actions
            .addRequestWithParamInMatchStatusTable({
                [
                Firebase
                    .constants
                    .MATCHING_REQUEST_PARAMS
                    .REQUEST_WITH
                ]: currentUserId,
                [
                Firebase
                    .constants
                    .MATCHING_REQUEST_PARAMS
                    .TIME_STAMP
                ]: database
                    .ServerValue
                    .TIMESTAMP,
            },
            otherUserId
            );

        Firebase
            .actions
            .addUserInActiveUsersTable(
                currentUserId,
                Firebase
                    .constants
                    .MATCHING_STATUSES
                    .MATCHED
            );
        Firebase
            .actions
            .addUserInActiveUsersTable(
                otherUserId,
                Firebase
                    .constants
                    .MATCHING_STATUSES
                    .MATCHED
            );
    };

export const fetchUserById = async (id = '') => {
    const requestURL = apiEndPoints.USER_INFO.replace(':id', `${id}`);
    let userInfo = await api.doGet(requestURL);
    userInfo = !isEmpty(userInfo) ? userInfo : null;
    return userInfo;
};
