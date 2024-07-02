/* eslint-disable import/no-cycle */
/* eslint-disable func-style */
import { all } from 'redux-saga/effects';
import toastSagas from '~src/components/Toast/sagas';
import { sagas as appSagas } from '~src/redux/App';
import { sagas as authSagas } from '~src/redux/Auth';
import { sagas as checkoutSagas } from '~src/redux/Checkout';
import { sagas as eventsSagas } from '~src/redux/Events';
import { sagas as exploreSagas } from '~src/redux/Explore';
import { sagas as homeSagas } from '~src/redux/Home';

function* rootSaga() {
    yield all([
        appSagas(),
        authSagas(),
        toastSagas(),
        exploreSagas(),
        eventsSagas(),
        homeSagas(),
        checkoutSagas()
    ]);
}
export default rootSaga;
