import { combineReducers } from 'redux';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  // Здесь могут быть другие редьюсеры
});

export default rootReducer;
