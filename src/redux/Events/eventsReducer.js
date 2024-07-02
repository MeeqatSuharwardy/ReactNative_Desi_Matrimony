/* eslint-disable default-param-last */
import EVENTS from './eventsConstants';

const initialState = {
    currentEvents: [],
    currentEventsPage: 1,
    fetchingCurrentEventsRequest: true,
    fetchingCurrentEventsRequestOnEndReached: false,
    canRequestCurrentEventsRequestOnEndReached: true,

    pastEvents: [],
    pastEventsPage: 1,
    fetchingPastEventsRequest: true,
    fetchingPastEventsRequestOnEndReached: false,
    canRequestPastEventsRequestOnEndReached: true,

    upcomingEvents: [],
    upcomingEventsPage: 1,
    fetchingUpcomingEventsRequest: true,
    fetchingUpcomingEventsRequestOnEndReached: false,
    canRequestUpcomingEventsRequestOnEndReached: true,

    errors: [],
};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {

    case EVENTS.GET_CURRENT_EVENT_REQUEST_STARTED:
        return {
            ...state,
            fetchingCurrentEventsRequest: true,
        };

    case EVENTS.GET_CURRENT_EVENT_REQUEST_SUCCESS:
        return {
            ...state,
            currentEvents: action.payload,
            fetchingCurrentEventsRequest: false,
            fetchingCurrentEventsRequestOnEndReached: false,
        };

    case EVENTS.GET_CURRENT_EVENT_REQUEST_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingPastEventsRequest: false,
        };

    case EVENTS.GET_PAST_EVENT_REQUEST_STARTED:
        return {
            ...state,
            fetchingPastEventsRequest: true,
        };

    case EVENTS.GET_PAST_EVENT_REQUEST_SUCCESS:
        return {
            ...state,
            pastEvents: action.payload,
            fetchingPastEventsRequest: false,
            fetchingPastEventsRequestOnEndReached: false,
        };

    case EVENTS.GET_PAST_EVENT_REQUEST_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingPastEventsRequest: false,
        };

    case EVENTS.GET_UPCOMING_EVENT_REQUEST_STARTED:
        return {
            ...state,
            fetchingUpcomingEventsRequest: true,
        };
    
    case EVENTS.GET_UPCOMING_EVENT_REQUEST_SUCCESS:
        return {
            ...state,
            upcomingEvents: action.payload,
            fetchingUpcomingEventsRequest: false,
            fetchingUpcomingEventsRequestOnEndReached: false,
        };
    
    case EVENTS.GET_UPCOMING_EVENT_REQUEST_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingUpcomingEventsRequest: false,
        };

    case EVENTS.GET_CURRENT_EVENT_REQUEST_ON_END_REACHED_STARTED:
        return {
            ...state,
            currentEventsPage: state.currentEventsPage + 1,
            fetchingCurrentEventsRequestOnEndReached: true,
        };
    
    case EVENTS.GET_CURRENT_EVENT_REQUEST_ON_END_REACHED_SUCCESS:
        return {
            ...state,
            currentEvents: [...state.currentEvents, ...action.payload],
            fetchingCurrentEventsRequestOnEndReached: false,
            canRequestCurrentEventsRequestOnEndReached: action.payload.length > 0
        };
    
    case EVENTS.GET_CURRENT_EVENT_REQUEST_ON_END_REACHED_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingCurrentEventsRequestOnEndReached: false,
        };

    case EVENTS.GET_PAST_EVENT_REQUEST_ON_END_REACHED_STARTED:
        return {
            ...state,
            pastEventsPage: state.pastEventsPage + 1,
            fetchingPastEventsRequestOnEndReached: true,
        };
        
    case EVENTS.GET_PAST_EVENT_REQUEST_ON_END_REACHED_SUCCESS:
        return {
            ...state,
            pastEvents: [...state.pastEvents, ...action.payload],
            fetchingPastEventsRequestOnEndReached: false,
            canRequestPastEventsRequestOnEndReached: action.payload.length > 0
        };
        
    case EVENTS.GET_PAST_EVENT_REQUEST_ON_END_REACHED_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingPastEventsRequestOnEndReached: false,
        };

    case EVENTS.GET_UPCOMING_EVENT_REQUEST_ON_END_REACHED_STARTED:
        return {
            ...state,
            upcomingEventsPage: state.upcomingEventsPage + 1,
            fetchingUpcomingEventsRequestOnEndReached: true,
        };
            
    case EVENTS.GET_UPCOMING_EVENT_REQUEST_ON_END_REACHED_SUCCESS:
        return {
            ...state,
            upcomingEvents: [...state.upcomingEvents, ...action.payload],
            fetchingUpcomingEventsRequestOnEndReached: false,
            canRequestUpcomingEventsRequestOnEndReached: action.payload.length > 0
        };
            
    case EVENTS.GET_UPCOMING_EVENT_REQUEST_ON_END_REACHED_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingUpcomingEventsRequestOnEndReached: false,
        };

    default: {
        return state;
    }
    }
};

export default eventsReducer;
