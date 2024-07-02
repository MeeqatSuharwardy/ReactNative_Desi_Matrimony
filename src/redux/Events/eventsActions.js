import EVENTS from './eventsConstants';

export const getCurrentEventRequest = () => ({
    type: EVENTS.GET_CURRENT_EVENT_REQUEST,
});

export const getCurrentEventRequestStarted = () => ({
    type: EVENTS.GET_CURRENT_EVENT_REQUEST_STARTED,
});

export const getCurrentEventRequestSuccess = events => ({
    type: EVENTS.GET_CURRENT_EVENT_REQUEST_SUCCESS,
    payload: events,
});

export const getCurrentEventRequestFailed = err => ({
    type: EVENTS.GET_CURRENT_EVENT_REQUEST_FAILURE,
    payload: err,
});

export const getUpcomingEventRequest = () => ({
    type: EVENTS.GET_UPCOMING_EVENT_REQUEST,
});

export const getUpcomingEventRequestStarted = () => ({
    type: EVENTS.GET_UPCOMING_EVENT_REQUEST_STARTED,
});

export const getUpcomingEventRequestSuccess = events => ({
    type: EVENTS.GET_UPCOMING_EVENT_REQUEST_SUCCESS,
    payload: events,
});

export const getUpcomingEventRequestFailed = err => ({
    type: EVENTS.GET_UPCOMING_EVENT_REQUEST_FAILURE,
    payload: err,
});

export const getPastEventRequest = () => ({
    type: EVENTS.GET_PAST_EVENT_REQUEST,
});

export const getPastEventRequestStarted = () => ({
    type: EVENTS.GET_PAST_EVENT_REQUEST_STARTED,
});

export const getPastEventRequestSuccess = events => ({
    type: EVENTS.GET_PAST_EVENT_REQUEST_SUCCESS,
    payload: events,
});

export const getPastEventRequestFailed = err => ({
    type: EVENTS.GET_PAST_EVENT_REQUEST_FAILURE,
    payload: err,
});

export const getCurrentEventRequestOnEndReached = () => ({
    type: EVENTS.GET_CURRENT_EVENT_REQUEST_ON_END_REACHED,
});

export const getCurrentEventRequestOnEndReachedStarted = () => ({
    type: EVENTS.GET_CURRENT_EVENT_REQUEST_ON_END_REACHED_STARTED,
});

export const getCurrentEventRequestOnEndReachedSuccess = events => ({
    type: EVENTS.GET_CURRENT_EVENT_REQUEST_ON_END_REACHED_SUCCESS,
    payload: events,
});

export const getCurrentEventRequestOnEndReachedFailed = err => ({
    type: EVENTS.GET_CURRENT_EVENT_REQUEST_ON_END_REACHED_FAILURE,
    payload: err,
});

export const getUpcomingEventRequestOnEndReached = () => ({
    type: EVENTS.GET_UPCOMING_EVENT_REQUEST_ON_END_REACHED,
});

export const getUpcomingEventRequestOnEndReachedStarted = () => ({
    type: EVENTS.GET_UPCOMING_EVENT_REQUEST_ON_END_REACHED_STARTED,
});

export const getUpcomingEventRequestOnEndReachedSuccess = events => ({
    type: EVENTS.GET_UPCOMING_EVENT_REQUEST_ON_END_REACHED_SUCCESS,
    payload: events,
});

export const getUpcomingEventRequestOnEndReachedFailed = err => ({
    type: EVENTS.GET_UPCOMING_EVENT_REQUEST_ON_END_REACHED_FAILURE,
    payload: err,
});

export const getPastEventRequestOnEndReached = () => ({
    type: EVENTS.GET_PAST_EVENT_REQUEST_ON_END_REACHED,
});

export const getPastEventRequestOnEndReachedStarted = () => ({
    type: EVENTS.GET_PAST_EVENT_REQUEST_ON_END_REACHED_STARTED,
});

export const getPastEventRequestOnEndReachedSuccess = events => ({
    type: EVENTS.GET_PAST_EVENT_REQUEST_ON_END_REACHED_SUCCESS,
    payload: events,
});

export const getPastEventRequestOnEndReachedFailed = err => ({
    type: EVENTS.GET_PAST_EVENT_REQUEST_ON_END_REACHED_FAILURE,
    payload: err,
});

export const changeEventStatus = payload => ({
    type: EVENTS.CHANGE_EVENT_STATUS,
    payload
});

export const changeEventStatusStarted = () => ({
    type: EVENTS.CHANGE_EVENT_STATUS_STARTED
});

export const changeEventStatusSuccess = status => ({
    type: EVENTS.CHANGE_EVENT_STATUS_SUCCESS,
    payload: status,
});

export const changeEventStatusFailed = err => ({
    type: EVENTS.CHANGE_EVENT_STATUS_FAILURE,
    payload: err,
});
