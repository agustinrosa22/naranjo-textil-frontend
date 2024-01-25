import axios from 'axios'
import {
    GET_PRODUCTS,
    CREATE_PRODUCT
} from './actionTypes'

export const getProducts = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get('/product');
            return dispatch({
              type: GET_PRODUCTS,
              payload: apiData.data.data, // Cambia a apiData.data
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const createProduct = (productData) => {
    return async function (dispatch) {
      try {
        const response = await axios.post('/product', productData); // Ajusta la URL según tu backend
        dispatch({
          type: CREATE_PRODUCT,
          payload: response.data,
        });
      } catch (error) {
        console.error('Error creating product:', error);
      }
    };
  };