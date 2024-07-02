import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import rootReducer from '~src/redux/rootReducer';
import rootSaga from '~src/redux/rootSaga';

const sagaMiddleware = createSagaMiddleWare();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
