/* eslint-disable func-style */
import { select, takeLatest } from 'redux-saga/effects';
import { apiSaga } from '../rootSaga/apiSaga';
import {
    getPaymentIntentRequestFailed,
    getPaymentIntentRequestStarted,
    getPaymentIntentRequestSuccess,
    getPaymentPlansRequestFailed,
    getPaymentPlansRequestStarted,
    getPaymentPlansRequestSuccess
} from './checkoutActions';
import CHECKOUT from './checkoutConstants';
import { selectPaymentPlanStates } from './checkoutSelectors';
import * as CheckoutApi from './checkoutServices';

/** FETCH PAYMENT PLAN DATA */
function* getPaymentPlansRequestAsync() {
    yield apiSaga(
        CheckoutApi.getPaymentPlans,
        [],
        getPaymentPlansRequestStarted(),
        paymentPlan => getPaymentPlansRequestSuccess(paymentPlan),
        error => getPaymentPlansRequestFailed(error),
    );
}

/** FETCH PAYMENT INTENT DATA */
function* getPaymentIntentRequestAsync() {
    const { selected_payment_plan_id: paymentPlanId } = yield select(selectPaymentPlanStates);
    yield apiSaga(
        CheckoutApi.getPaymentIntent,
        [{
            paymentPlanId
        }],
        getPaymentIntentRequestStarted(),
        paymentIntent => getPaymentIntentRequestSuccess(paymentIntent),
        error => getPaymentIntentRequestFailed(error),
    );
}

export default function* checkoutSagas() {
    yield takeLatest(CHECKOUT.GET_PAYMENT_INTENT_REQUEST, getPaymentIntentRequestAsync);
    yield takeLatest(CHECKOUT.GET_PAYMENT_PLANS_REQUEST, getPaymentPlansRequestAsync);
};
