import { createSelector } from 'reselect';

const checkoutReducer = state => state.checkout;

export const selectPaymentPlanStates = createSelector(checkoutReducer, checkout => ({
    selected_payment_plan_id: checkout.selected_payment_plan_id,
    payment_plans_data: checkout.payment_plans_data,
    fetchingPaymentPlansRequest: checkout.fetchingPaymentPlansRequest
}));

export const selectStripePaymentIntentStates = createSelector(checkoutReducer, checkout => ({
    stripePublishableKey: checkout.stripePublishableKey, 
    stripeClientSecret: checkout.stripeClientSecret,
    fetchingPaymentIntentRequest: checkout.fetchingPaymentIntentRequest, 
    paymentIntent: checkout.paymentIntent
}));
