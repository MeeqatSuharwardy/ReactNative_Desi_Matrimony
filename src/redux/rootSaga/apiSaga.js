/* eslint-disable func-style */
import isEmpty from 'lodash/isEmpty';
import { call, put } from 'redux-saga/effects';
import { showToast } from '~src/components/Toast/action';
import { CLAUSE } from '~src/constants/displayTexts';
import { logoutRequest } from '~src/redux/Auth/authActions';
import { responseCodes } from '~src/services';
import { parseError } from '~src/utils/validations';

export function* apiSaga(
    fn,
    args,
    initAction,
    successAction,
    failureAction,
    successCB
) {
    try {
        if (initAction) {
            yield put(initAction);
        }
        const response = yield call(fn, ...args);
        if (successAction) {
            yield put(successAction(response));
        }
        if (successCB) {
            successCB(response);
        }
    } catch (error) {
        if (error) {
            const errors = parseError(error);
            let errText = typeof error === 'object' && !isEmpty(error)
                ? `${Object.keys(errors)[0]} ${errors[Object.keys(errors)[0]]}`
                : errors[0];
            if (errText && (typeof errText === 'string')) {
                if (errText?.includes(responseCodes.UNAUTHORIZED)) {
                    errText = CLAUSE.SESSION_EXPIRED;
                    yield put(logoutRequest());
                }
            }
            if (errText && typeof errText === 'number') {
                errText = 'Something went wrong';
            }
            if (typeof errText === 'string' && errText !== '') {
                yield put(showToast(errText));
            }
            if (failureAction) {
                yield put(failureAction(errors));
            }
        }
    }
}
