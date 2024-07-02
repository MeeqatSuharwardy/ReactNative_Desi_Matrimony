/* eslint-disable import/no-cycle */
import { isEmpty } from 'lodash';
import { SentimentEnum } from '~src/enum';
import { api, apiEndPoints } from '~src/services';

export const updateProfileView = async data => {
    const requestUrl = apiEndPoints
        .PROFILE_VIEW;
    const profileViewResponse = await api.doPost(requestUrl, data);
    return !isEmpty(profileViewResponse) ? profileViewResponse : null;
};

export const getUserProfileVisitedBy = async ({ page, id }) => {
    const requestUrl = apiEndPoints
        .USER_PROFILE_VISITED_BY
        .replace(':id', `${id}`)
        .replace(':page=', `page=${page}`);
    const userProfileVisitedBy = await api.doGet(requestUrl);
    return !isEmpty(userProfileVisitedBy) ? userProfileVisitedBy?.results : [];
};

export const getDilReceivedUsers = async ({ page, id }) => {
    const requestUrl = apiEndPoints
        .GET_USER_RECEIVED_SENTIMENTS
        .replace(':id', `${id}`)
        .replace(':page=', `page=${page}`)
        .replace(':sentiment=', `sentiment=${SentimentEnum.LIKE}`);
    const dilReceivedUsers = await api.doGet(requestUrl);
    return !isEmpty(dilReceivedUsers) ? dilReceivedUsers?.results : [];
};

export const sendSentiment = async data => {
    const requestUrl = apiEndPoints
        .SENTIMENTS;
    const sentimentsResponse = await api.doPost(requestUrl, data);
    return !isEmpty(sentimentsResponse) ? sentimentsResponse : null;
};
