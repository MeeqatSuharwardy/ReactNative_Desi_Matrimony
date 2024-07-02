/* eslint-disable func-style */
import { takeLatest, put } from 'redux-saga/effects';
import TOAST from './constants';

/** Initialize Toast */
function* getInitToast(action) {
    yield put({ type: TOAST.TOAST_TRIGGER_ON, payload: { ...action.payload } });
}

export default function* toast() {
    yield takeLatest(TOAST.TOAST_TRIGGER, getInitToast);
}
