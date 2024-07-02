/* eslint-disable import/no-cycle */
/* eslint-disable func-style */
import { CometChat } from '@cometchat-pro/react-native-chat';
import { select, takeLatest, takeLeading } from 'redux-saga/effects';
import { SentimentEnum } from '~src/enum';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import { selectApp } from '../Auth/authSelectors';
import { apiSaga } from '../rootSaga/apiSaga';
import {
    getDilReceivedUsersFailed,
    getDilReceivedUsersStarted,
    getDilReceivedUsersSuccess,
    getUserProfileVisitedByRequestFailed,
    getUserProfileVisitedByRequestStarted,
    getUserProfileVisitedByRequestSuccess
} from './homeActions';
import HOME from './homeConstants';
import { selectDilReceivedStates, selectUserProfileVisitedByStates } from './homeSelectors';
import * as HomeApi from './homeServices';

/* CHANGE EVENT STATUS SUCCESS */
function* updateProfileViewAsync(payload) {
    const { id } = payload;
    const { currentUser } = yield select(selectApp);
    yield apiSaga(
        HomeApi.updateProfileView,
        [{
            viewer: currentUser?.id,
            viewee: id
        }],
    );
}

/* FETCH USER PROFILE VISITED BY DATA */
function* getUserProfileVisitedByAsync() {
    const { userProfileVisitedByPage: page } = yield select(selectUserProfileVisitedByStates);
    const { currentUser } = yield select(selectApp);
    yield apiSaga(
        HomeApi.getUserProfileVisitedBy,
        [{
            page,
            id: currentUser?.id || ''
        }],
        getUserProfileVisitedByRequestStarted(),
        profileVisitedByData => getUserProfileVisitedByRequestSuccess(profileVisitedByData),
        error => getUserProfileVisitedByRequestFailed(error),
    );
}

/* GET DIL RECEIVED USERS DATA */
function* getDilReceivedUsersAsync() {
    const { currentUser } = yield select(selectApp);
    const { dilReceivedUsersPage: page } = yield select(selectDilReceivedStates);
    yield apiSaga(
        HomeApi.getDilReceivedUsers,
        [{
            page,
            id: currentUser?.id || ''
        }],
        getDilReceivedUsersStarted(),
        dilReceivedUsers => getDilReceivedUsersSuccess(dilReceivedUsers),
        error => getDilReceivedUsersFailed(error),
    );
}

/* OPEN USERS DETAILS PAGE */
function* openUserDetailsPage() {
    yield navigationActions
        .navigate(
            NavigatorPath
                .UserDetails
        );
}

/* SEND LIKE SENTIMENT DATA */
function* sendLikeSentiment(payload) {
    const { sentimentTo } = payload;
    const { currentUser } = yield select(selectApp);
    yield apiSaga(
        HomeApi.sendSentiment,
        [{
            sentiment: SentimentEnum.LIKE,
            sentiment_to: sentimentTo,
            sentiment_from: currentUser?.id
        }],
    );
}

/* SEND DISLIKE SENTIMENT DATA */
function* sendDisLikeSentiment(payload) {
    const { sentimentTo } = payload;
    const { currentUser } = yield select(selectApp);
    yield apiSaga(
        HomeApi.sendSentiment,
        [{
            sentiment: SentimentEnum.DISLIKE,
            sentiment_to: sentimentTo,
            sentiment_from: currentUser?.id
        }],
    );
}
/* CHAT BUTTON FROM PROFILE CARD PRESSED */
function* openChatWithUser(payload) {
    try {
        const { otherUserID } = payload;
        const { currentUser } = yield select(selectApp);
        const currentUserID = currentUser?.id?.toString();
        let otherUser = null;
        CometChat.getUser(otherUserID?.toString())
            .then(
                async user => {
                    otherUser = { ...user };
                    if (otherUser) {
                        navigationActions.navigate(NavigatorPath.CometChatMessages,
                            {
                                item: { ...otherUser },
                                type: 'user',
                                loggedInUser: await CometChat.getUser(currentUserID),
                                actionGenerated: () => {},
                                composedThreadMessage: {},
                                callMessage: {},
                            },
                        );
                    }
                },
                error => {
                    // eslint-disable-next-line no-console
                    console.log('User details fetching failed with error:', error);
                }
            );
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.log('ERR', err);
    }
}

export default function* eventsSagas() {
    yield takeLeading(HOME.UPDATE_PROFILE_VIEW, updateProfileViewAsync);
    yield takeLatest(HOME.GET_USER_PROFILE_VISITED_BY_REQUEST, getUserProfileVisitedByAsync);
    yield takeLatest(HOME.GET_USER_PROFILE_VISITED_BY_REQUEST_ON_END_REACHED, getUserProfileVisitedByAsync);
    yield takeLatest(HOME.GET_DIL_RECEIVED_USERS_REQUEST, getDilReceivedUsersAsync);
    yield takeLatest(HOME.GET_DIL_RECEIVED_USERS_REQUEST_ON_END_REACHED, getDilReceivedUsersAsync);
    yield takeLatest(HOME.SET_SELECTED_USER, openUserDetailsPage);
    yield takeLatest(HOME.SEND_LIKE_SENTIMENT, sendLikeSentiment);
    yield takeLatest(HOME.SEND_DISLIKE_SENTIMENT, sendDisLikeSentiment);
    yield takeLatest(HOME.OPEN_CHAT_WITH_USER, openChatWithUser);
};
