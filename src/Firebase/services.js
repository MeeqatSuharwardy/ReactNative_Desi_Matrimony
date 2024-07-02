/* eslint-disable import/no-cycle */
import database from '@react-native-firebase/database';
import { updateActiveUsersRequest, updateSubscribedId } from '~src/redux/Explore/exploreActions';
import store from '~src/redux/store/configureStore';
import * as FirebaseConstants from './constants';

export const processActiveUsersData = async ({
    snapshot,
    activeUsersTableRefrence,
    getUserId
}) => {
    const currentUserId = await getUserId();
    const snapshotData = snapshot.val();
    const dbConnection = activeUsersTableRefrence();
    dbConnection
        .child(currentUserId)
        .onDisconnect()
        .remove();
    if (snapshot.exists()) {
        store.dispatch(
            updateActiveUsersRequest(
                Object
                    .keys(snapshotData)
            )
        );
    }
    else {
        store.dispatch(
            updateActiveUsersRequest(
                []
            )
        );
    }
};

export const processMatchStatusData = async ({
    snapshot,
    matchStatusTableRefrence,
    getUserId
}) => {
    const currentUserId = await getUserId();
    const snapshotData = snapshot.val();
    const dbConnection = matchStatusTableRefrence();
    dbConnection
        .child(currentUserId)
        .onDisconnect()
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
        });;
    if (snapshot.exists()) {
        store.dispatch(
            updateSubscribedId(
                snapshotData
                    [
                        FirebaseConstants
                            .MATCHING_REQUEST_PARAMS
                            .REQUEST_WITH
                    ]
            )
        );
    }
    else {
        store.dispatch(updateSubscribedId(''));
    }
};

export const processMatchStatusForIdData = snapshot => {
    const snapshotData = snapshot.val();
    if (snapshot.exists()) {
        return snapshotData;
    }
    return null;
};

// Can do firebase error handling here
export const recordError = error => {
    // eslint-disable-next-line no-console
    console.log('Error in Firebase action', error);
};
