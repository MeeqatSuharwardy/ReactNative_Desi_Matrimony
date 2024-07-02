import CHECKOUT from './checkoutConstants';

export const getPaymentPlansRequest = () => ({
    type: CHECKOUT.GET_PAYMENT_PLANS_REQUEST,
});

export const getPaymentPlansRequestStarted = () => ({
    type: CHECKOUT.GET_PAYMENT_PLANS_REQUEST_STARTED,
});

export const getPaymentPlansRequestSuccess = paymentPlan => ({
    type: CHECKOUT.GET_PAYMENT_PLANS_REQUEST_SUCCESS,
    payload: paymentPlan,
});

export const setSelectedPaymentPlanId = id => ({
    type: CHECKOUT.SET_SELECTED_PAYMENT_PLAN_ID,
    payload: id,
});

export const getPaymentPlansRequestFailed = err => ({
    type: CHECKOUT.GET_PAYMENT_PLANS_REQUEST_FAILURE,
    payload: err,
});

export const getPaymentIntentRequest = () => ({
    type: CHECKOUT.GET_PAYMENT_INTENT_REQUEST,
});

export const getPaymentIntentRequestStarted = () => ({
    type: CHECKOUT.GET_PAYMENT_INTENT_REQUEST_STARTED,
});

export const getPaymentIntentRequestSuccess = paymentIntent => ({
    type: CHECKOUT.GET_PAYMENT_INTENT_REQUEST_SUCCESS,
    payload: paymentIntent,
});

export const getPaymentIntentRequestFailed = err => ({
    type: CHECKOUT.GET_PAYMENT_INTENT_REQUEST_FAILURE,
    payload: err,
});
