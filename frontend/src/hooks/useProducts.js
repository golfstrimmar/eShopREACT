import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/actions/productsActions';

const useProducts = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        console.log(response.data);
        dispatch(setProducts(response.data)); // Сохраняем товары в Redux
      } catch (error) {
        console.error('Ошибка при получении товаров:', error);
      }
    };
    
    fetchProducts();
  }, [dispatch]);
};

export default useProducts;


