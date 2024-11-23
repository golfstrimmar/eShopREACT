import product1Image from '../../assets/images/product1.png';
import product2Image from '../../assets/images/product2.png';

// Начальное состояние — массив товаров
const initialState = [
  { id: 1, name: 'Товар 1', price: 100, image: product1Image },
  { id: 2, name: 'Товар 2', price: 200, image: product2Image }
];

// Редьюсер для товаров
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.payload; // Перезаписываем список товаров, если передан
    default:
      return state;
  }
};

export default productsReducer;
