import { combineReducers, createStore, applyMiddleware } from "redux";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer"; // Редьюсер корзины

// Middleware для сохранения состояния корзины в localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart)); // Сохраняем только корзину
  return result;
};

// Функция для восстановления состояния корзины из localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error("Ошибка загрузки корзины из localStorage:", e);
    return [];
  }
};

// Создаем rootReducer
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

// Предварительное состояние, включая корзину из localStorage
const preloadedState = {
  cart: loadCartFromLocalStorage(),
};

// Создаем store с middleware
const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(localStorageMiddleware) // Подключаем middleware
);

export default store;
