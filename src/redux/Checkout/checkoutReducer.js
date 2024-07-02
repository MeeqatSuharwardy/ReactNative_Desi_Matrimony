/* eslint-disable default-param-last */
import CHECKOUT from './checkoutConstants';

const initialState = {
    selected_payment_plan_id: null,
    payment_plans_data: null,
    fetchingPaymentPlansRequest: true,

    stripePublishableKey: '',
    stripeClientSecret: '',
    paymentIntent: null,
    fetchingPaymentIntentRequest: true,

    errors: [],
};

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {

    case CHECKOUT.GET_PAYMENT_PLANS_REQUEST:
        return {
            ...state,
            fetchingPaymentPlansRequest: true,
        };

    case CHECKOUT.GET_PAYMENT_PLANS_REQUEST_SUCCESS:
        return {
            ...state,
            payment_plans_data: action.payload,
            fetchingPaymentPlansRequest: false,
        };

    case CHECKOUT.GET_PAYMENT_PLANS_REQUEST_FAILURE:
        return {
            ...state,
            errors: action.payload,
            fetchingPaymentPlansRequest: false,
        };

    case CHECKOUT.SET_SELECTED_PAYMENT_PLAN_ID:
        return {
            ...state,
            selected_payment_plan_id: action.payload,
        };
        
    case CHECKOUT.GET_PAYMENT_INTENT_REQUEST:
        return {
            ...state,
            fetchingPaymentIntentRequest: true,
        };

    case CHECKOUT.GET_PAYMENT_INTENT_REQUEST_SUCCESS:
        return {
            ...state,
            paymentIntent: action.payload,
            stripePublishableKey: action.payload.public_key,
            stripeClientSecret: action.payload.client_secret,
            fetchingPaymentIntentRequest: false,
        };

    case CHECKOUT.GET_PAYMENT_INTENT_REQUEST_FAILURE:
        return {
            ...state,
            errors: action.payload,
            paymentIntent: null,
            stripePublishableKey: '',
            stripeClientSecret: '',
            fetchingPaymentIntentRequest: true,
        };

    default: {
        return state;
    }
    }
};

export default checkoutReducer;
