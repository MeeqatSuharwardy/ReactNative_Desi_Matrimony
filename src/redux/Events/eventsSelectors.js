import { createSelector } from 'reselect';

const eventsReducer = state => state.events;

export const selectCurrentEventStates = createSelector(eventsReducer, events => ({
    currentEvents: events.currentEvents,
    currentEventsPage: events.currentEventsPage,
    fetchingCurrentEventsRequest: events.fetchingCurrentEventsRequest,
    fetchingCurrentEventsRequestOnEndReached: events.fetchingCurrentEventsRequestOnEndReached,
    canRequestCurrentEventsRequestOnEndReached: events.canRequestCurrentEventsRequestOnEndReached,
}));

export const selectPastEventStates = createSelector(eventsReducer, events => ({
    pastEvents: events.pastEvents,
    pastEventsPage: events.pastEventsPage,
    fetchingPastEventsRequest: events.fetchingPastEventsRequest,
    fetchingPastEventsRequestOnEndReached: events.fetchingPastEventsRequestOnEndReached,
    canRequestPastEventsRequestOnEndReached: events.canRequestPastEventsRequestOnEndReached,
}));

export const selectUpcomingEventStates = createSelector(eventsReducer, events => ({
    upcomingEvents: events.upcomingEvents,
    upcomingEventsPage: events.upcomingEventsPage,
    fetchingUpcomingEventsRequest: events.fetchingUpcomingEventsRequest,
    fetchingUpcomingEventsRequestOnEndReached: events.fetchingUpcomingEventsRequestOnEndReached,
    canRequestUpcomingEventsRequestOnEndReached: events.canRequestUpcomingEventsRequestOnEndReached,
}));
