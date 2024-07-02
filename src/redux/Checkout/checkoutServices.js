import { isEmpty } from 'lodash';
import { api, apiEndPoints } from '~src/services';

export const getPaymentPlans = async () => {
    const requestUrl = apiEndPoints
        .GET_PAYMENT_PLAN;
    const paymentPlanResponse = await api.doGet(requestUrl);
    return !isEmpty(paymentPlanResponse) ? paymentPlanResponse.results : [];
};

export const getPaymentIntent = async ({ paymentPlanId }) => {
    const requestUrl = apiEndPoints
        .CREATE_PAYMENT_INTENT;
    const paymentIntentResponse = await api.doPost(requestUrl, { payment_plan: paymentPlanId });
    return !isEmpty(paymentIntentResponse) ? paymentIntentResponse : null;
};
