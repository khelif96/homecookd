import { combineReducers } from 'redux';
import accountType from './accountTypeReducer';
import accountReducer from './account-reducer';
import cartReducer from './cartReducer';

const allReducers = combineReducers({
    accountType: accountType,
    logged: accountReducer,
    cart: cartReducer
});

export default allReducers;
