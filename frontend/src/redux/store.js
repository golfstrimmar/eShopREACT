import { combineReducers, createStore } from 'redux';
import productsReducer from './reducers/productsReducer';
import cartReducer from './reducers/cartReducer'; // импортируем редьюсер корзины

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer, // добавляем редьюсер корзины
});

const store = createStore(rootReducer);

export default store;
