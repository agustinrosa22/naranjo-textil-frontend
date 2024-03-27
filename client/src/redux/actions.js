import axios from 'axios'
import {
    GET_PRODUCTS,
    CREATE_PRODUCT,
    SEARCH_PRODUCTS,
    EDIT_PRODUCT_SUCCESS, 
    EDIT_PRODUCT_FAILURE,
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    LOGOUT,
    FILTER_PRODUCTS_REQUEST,
    FILTER_PRODUCTS_SUCCESS,
    FILTER_PRODUCTS_FAILURE 
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
      window.location.href = '/home';
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


export const sellProduct = (saleData) => async (dispatch) => {
  try {
    const response = await axios.post('/sell', saleData);
    dispatch({ type: 'SELL_PRODUCT_SUCCESS', payload: response.data });
    console.log(response.data);
  } catch (error) {
    dispatch({ type: 'SELL_PRODUCT_FAILURE', payload: error.message });
    console.error('Error selling product:', error);
  }
};

export const loginRequest = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/login', { username, password });
      const data = response.data;
      if (data.access) {
        dispatch(loginSuccess(data.user));
      } else {
        dispatch(loginFailure("Error: acceso denegado"));
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const loginSuccess = (user) => {
  // Guardar datos del usuario en localStorage
  localStorage.setItem('user', JSON.stringify(user));
  
  // Actualizar el estado global con los datos del usuario
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
};
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logout = () => {
  // Limpiar los datos del usuario en el almacenamiento local
  localStorage.removeItem('user');

  // Devolver la acción LOGOUT
  return {
    type: LOGOUT,
  };
};

export const filterProductsRequest = () => ({
  type: FILTER_PRODUCTS_REQUEST,
});

export const filterProductsSuccess = (filteredProducts) => ({
  type: FILTER_PRODUCTS_SUCCESS,
  payload: filteredProducts,
});

export const filterProductsFailure = (error) => ({
  type: FILTER_PRODUCTS_FAILURE,
  payload: error,
});

export const filterProducts = (filters) => async (dispatch) => {
  dispatch(filterProductsRequest());
  try {
    const response = await axios.get('/products/filter', { params: filters });
    dispatch(filterProductsSuccess(response.data));
    // console.log(response.data)
  } catch (error) {
    dispatch(filterProductsFailure(error.message));
  }
};