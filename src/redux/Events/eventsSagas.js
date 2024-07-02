/* eslint-disable import/no-cycle */
/* eslint-disable func-style */
import { put, select, takeLatest } from 'redux-saga/effects';
import { selectApp } from '../Auth/authSelectors';
import { apiSaga } from '../rootSaga/apiSaga';
import {
    changeEventStatusFailed,
    changeEventStatusStarted,
    changeEventStatusSuccess,
    getCurrentEventRequestFailed,
    getCurrentEventRequestStarted,
    getCurrentEventRequestSuccess,
    getPastEventRequestFailed,
    getPastEventRequestStarted,
    getPastEventRequestSuccess,
    getUpcomingEventRequestFailed,
    getUpcomingEventRequestStarted,
    getUpcomingEventRequestSuccess
} from './eventsActions';
import EVENTS from './eventsConstants';
import { selectCurrentEventStates, selectPastEventStates, selectUpcomingEventStates } from './eventsSelectors';
import * as EventsApi from './eventsServices';

/** FETCH CURRENT EVENT DATA */
function* getCurrentEventAsync() {
    const { currentEventsPage: page } = yield select(selectCurrentEventStates);
    const { currentUser } = yield select(selectApp);
    yield apiSaga(
        EventsApi.getUserEvents,
        [{
            page,
            id: currentUser?.id || ''
        }],
        getCurrentEventRequestStarted(),
        eventData => getCurrentEventRequestSuccess(eventData),
        error => getCurrentEventRequestFailed(error),
    );
}

/** FETCH PAST EVENT DATA */
function* getPastEventAsync() {
    const { pastEventsPage: page } = yield select(selectPastEventStates);
    yield apiSaga(
        EventsApi.getEvents,
        [{
            page,
            status: 'past'
        }],
        getPastEventRequestStarted(),
        eventData => getPastEventRequestSuccess(eventData),
        error => getPastEventRequestFailed(error),
    );
}

/** FETCH UPCOMING EVENT DATA */
function* getUpcomingEventAsync() {
    const { upcomingEventsPage: page } = yield select(selectUpcomingEventStates);
    yield apiSaga(
        EventsApi.getEvents,
        [{
            page,
            status: 'pending'
        }],
        getUpcomingEventRequestStarted(),
        eventData => getUpcomingEventRequestSuccess(eventData),
        error => getUpcomingEventRequestFailed(error),
    );
}

/** CHANGE EVENT STATUS */
function* changeEventStatusAsync({ payload }) {
    const { item, index, from } = payload;
    const { currentUser } = yield select(selectApp);
    const interestStatus = item.interest_status === 'I'
        ||
        item.interest_status === 'N'
        ? 'A'
        : 'I';
    yield apiSaga(
        EventsApi.changeEventStatus,
        [{
            interest_status: interestStatus,
            event: item?.id || '',
            user: currentUser?.id || '',
            user_event: item?.user_event || null
        }],
        changeEventStatusStarted(),
        updatedEvent => changeEventStatusSuccess({
            item: {
                ...item,
                interest_status: interestStatus,
                user_event: updatedEvent?.id
            },
            index,
            from
        }),
        error => changeEventStatusFailed(error),
    );
}

/** CHANGE EVENT STATUS SUCCESS */
function* changeEventStatusSuccessAsync({ payload }) {
    const { item, index, from } = payload;
    const { upcomingEvents } = yield select(selectUpcomingEventStates);
    const { currentEvents } = yield select(selectCurrentEventStates);
    const { pastEvents } = yield select(selectPastEventStates);
    if (from === 'upcoming') {
        upcomingEvents[index] = item;
        yield put(getUpcomingEventRequestSuccess(upcomingEvents));
        const indexInCurrentEvent = currentEvents.findIndex(_item => _item?.user_event === item?.user_event );
        if (indexInCurrentEvent === -1) {
            yield put(getCurrentEventRequestSuccess([item, ...currentEvents]));
        }
        else {
            currentEvents[indexInCurrentEvent] = item;
            yield put(getCurrentEventRequestSuccess(currentEvents));
        }
    }
    if (from === 'current') {
        currentEvents[index] = item;
        yield put(getCurrentEventRequestSuccess(currentEvents));

        const indexInUpcommingEvent = upcomingEvents.findIndex(_item => _item?.user_event === item?.user_event );
        if (indexInUpcommingEvent !== -1) {
            upcomingEvents[indexInUpcommingEvent] = item;
            yield put(getUpcomingEventRequestSuccess(upcomingEvents));
        }
    }
    if (from === 'past') {
        pastEvents[index] = item;
        yield put(getPastEventRequestSuccess(pastEvents));
    }
}

export default function* eventsSagas() {
    yield takeLatest(EVENTS.GET_CURRENT_EVENT_REQUEST, getCurrentEventAsync);
    yield takeLatest(EVENTS.GET_PAST_EVENT_REQUEST, getPastEventAsync);
    yield takeLatest(EVENTS.GET_UPCOMING_EVENT_REQUEST, getUpcomingEventAsync);
    yield takeLatest(EVENTS.GET_CURRENT_EVENT_REQUEST_ON_END_REACHED, getCurrentEventAsync);
    yield takeLatest(EVENTS.GET_PAST_EVENT_REQUEST_ON_END_REACHED, getPastEventAsync);
    yield takeLatest(EVENTS.GET_UPCOMING_EVENT_REQUEST_ON_END_REACHED, getUpcomingEventAsync);
    yield takeLatest(EVENTS.CHANGE_EVENT_STATUS, changeEventStatusAsync);
    yield takeLatest(EVENTS.CHANGE_EVENT_STATUS_SUCCESS, changeEventStatusSuccessAsync);
};
