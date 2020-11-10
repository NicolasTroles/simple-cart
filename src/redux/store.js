import { createStore, combineReducers } from 'redux'

import { productsReducer } from './products/reducer';
import { cartReducer } from './cart/reducer';

const Reducers = combineReducers({
    productsState: productsReducer,
    cartState: cartReducer,
});

export default createStore(Reducers);