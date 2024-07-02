/* eslint-disable import/no-cycle */
/* eslint-disable func-style */
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Firebase } from '~src/Firebase';
import { IGNORED_LIST } from '~src/constants/storageKeys';
import { getTimeDifferenceInSeconds } from '~src/utils/dateFuncs';
import { selectApp } from '../Auth/authSelectors';
import { updateProfileViewRequest } from '../Home/homeActions';
import { apiSaga } from '../rootSaga/apiSaga';
import { updateFilteredActiveUsers, updateSubscribedIdUser } from './exploreActions';
import EXPLORE from './exploreConstants';
import { selectFirebaseUsersStates } from './exploreSelectors';
import * as ExploreApi from './exploreServices';

/** UPDATE FIREBASE EXTRACTED ACTIVE USER DATA */
function* processActiveUsersData() {
    const { active_users: activeUsers } = yield select(selectFirebaseUsersStates);
    const ignoredIds = yield AsyncStorage.getItem(IGNORED_LIST);
    const toRemove = new Set([...JSON.parse(ignoredIds), '0']);
    const filteredActiveUsers = activeUsers.filter(id => !toRemove.has(id));
    yield put(updateFilteredActiveUsers(filteredActiveUsers));
};

/** SHOW RANDOM USER PROFILES */
function* showRandomProfileToBothUsers() {

    const {
        filtered_active_users: filteredActiveUsers
    } = yield select(selectFirebaseUsersStates);

    const { currentUser } = yield select(selectApp);

    const randomId = _.sample(filteredActiveUsers);

    if (randomId) {
        let currentIdResult = yield call(
            ExploreApi.getFirebaseMatchStatusForId,
            currentUser.id.toString()
        );
        currentIdResult = currentIdResult.val();
        const currentIdResultRequestWith = currentIdResult
            [
                Firebase
                    .constants
                    .MATCHING_REQUEST_PARAMS
                    .REQUEST_WITH
            ];
        const currentIdResultTimeStamp = currentIdResult
            [
                Firebase
                    .constants
                    .MATCHING_REQUEST_PARAMS
                    .TIME_STAMP
            ];
        const lastUpdatedTimeInCurrentId = getTimeDifferenceInSeconds(
            new Date(currentIdResultTimeStamp)
        );

        if (_.isEmpty(currentIdResultRequestWith)) {
            yield call(
                ExploreApi.updateMatchStatusTableAndActiveUserTabelForBothUsers,
                currentUser.id.toString(),
                randomId
            );
        } else if (lastUpdatedTimeInCurrentId >= 30) {
            yield call(
                ExploreApi.updateMatchStatusTableAndActiveUserTabelForBothUsers,
                currentUser.id.toString(),
                randomId
            );
        }
    }
};

/** FETCH RANDOM USER PROFILES */
function* fetchUserProfileToDisplay() {
    const {
        subscribed_id: subscribedId,
        subscribed_id_user: subscribedIdUser
    } = yield select(selectFirebaseUsersStates);
    if (subscribedId && subscribedId !== subscribedIdUser?.id) {
        yield put(updateProfileViewRequest(subscribedId));
        yield apiSaga(
            ExploreApi.fetchUserById,
            [subscribedId],
            null,
            userData => updateSubscribedIdUser(userData),
            null,
        );
    } else {
        yield put(updateSubscribedIdUser(null));
    }
};

export default function* exploreSagas() {
    yield takeLatest(EXPLORE.UPDATE_ACTIVE_USERS_REQUEST, processActiveUsersData);
    yield takeLatest(EXPLORE.UPDATE_FILTERED_ACTIVE_USERS, showRandomProfileToBothUsers);
    yield takeLatest(EXPLORE.UPDATE_SUBSCRIBED_ID, fetchUserProfileToDisplay);
};
