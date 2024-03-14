import axios from 'axios'
import {
    GET_PRODUCTS,
    CREATE_PRODUCT,
    SEARCH_PRODUCTS,
    EDIT_PRODUCT_SUCCESS, 
    EDIT_PRODUCT_FAILURE
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

  export const searchProducts = (productName) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/products/name/${productName}`);
            const products = response.data.data; // Acceder a los datos específicos de la respuesta
            return dispatch({
                type: SEARCH_PRODUCTS,
                payload: products, // Utilizar los datos de los productos como payload
            });
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };
};

export const editProduct = (id, productData) => {

  return async (dispatch) => {
    try {
      const response = await axios.put(`/product/${id}`, productData);
      dispatch(editProductSuccess(response.data));
      window.location.href = '/';
      alert('Producto editado exitosamente');
    } catch (error) {
      dispatch(editProductFailure(error.message));
    }
  };
};

const editProductSuccess = (product) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: product,
});

const editProductFailure = (error) => ({
  type: EDIT_PRODUCT_FAILURE,
  payload: error,
});