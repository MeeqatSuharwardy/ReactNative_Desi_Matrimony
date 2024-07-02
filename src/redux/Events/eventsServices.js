/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { isEmpty } from 'lodash';
import { api, apiEndPoints } from '~src/services';

export const getUserEvents = async ({ page, status, id }) => {
    const requestUrl = apiEndPoints
        .GET_USER_EVENTS
        .replace(':id', `${id}`)
        .replace(':page=', `page=${page}`)
        .replace(':status=',
            !isEmpty(status)
                ? `status=${status}`
                : ''
        );
    const userEventResponse = await api.doGet(requestUrl);
    return !isEmpty(userEventResponse) ? userEventResponse?.results : [];
};

export const getEvents = async ({ page, status }) => {
    const requestUrl = apiEndPoints
        .GET_EVENTS
        .replace(':page=', `page=${page}`)
        .replace(':status=',
            !isEmpty(status)
                ? `status=${status}`
                : ''
        );
    const eventResponse = await api.doGet(requestUrl);
    return !isEmpty(eventResponse) ? eventResponse?.results : [];
};

export const changeEventStatus = async ({ interest_status, event, user, user_event }) => {
    const conditionalCall = user_event 
        ? api.doPatch 
        : api.doPost;
    const requestUrl = apiEndPoints
        .CHANGE_EVENT_STATUS_FOR_USER
        .replace(
            ':id/', 
            user_event 
                ? `${user_event}/` 
                : ''
        );
    const changeEventResponse = await conditionalCall(requestUrl, { interest_status, event, user });
    return !isEmpty(changeEventResponse) ? changeEventResponse : {};
};
