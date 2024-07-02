/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import toastReducer from '~src/components/Toast/toastReducer';
import { appReducer } from '~src/redux/App';
import { authReducer } from '~src/redux/Auth';
import { checkoutReducer } from '../Checkout';
import { eventsReducer } from '../Events';
import { exploreReducer } from '../Explore';
import { homeReducer } from '../Home';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    toast: toastReducer,
    explore: exploreReducer,
    events: eventsReducer,
    home: homeReducer,
    checkout: checkoutReducer
});

export default rootReducer;
