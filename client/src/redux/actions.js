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
    FILTER_PRODUCTS_FAILURE,
    GET_ALL_TRANSACTIONS_REQUEST,
    GET_ALL_TRANSACTIONS_SUCCESS,
    GET_ALL_TRANSACTIONS_FAILURE, 
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
    GET_TRANSACTIONS_AND_PRODUCT_REQUEST,
    GET_TRANSACTIONS_AND_PRODUCT_SUCCESS,
    GET_TRANSACTIONS_AND_PRODUCT_FAILURE, 
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
          const storedImage = JSON.parse(localStorage.getItem('uploadedImage')); // Verifica la clave
          const dataWithImage = {
              ...productData,
              image: storedImage, // Ajusta para enviar la imagen correcta
          };
          
          const response = await axios.post('/product', dataWithImage);
          dispatch({
              type: CREATE_PRODUCT,
              payload: response.data,
          });

          localStorage.removeItem('uploadedImage'); // Limpiar después de usar
          window.location.href = '/home';
      alert('Producto creado exitosamente');
      } catch (error) {
          console.error('Error al crear producto:', error);
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

export const getAllTransactions = (startDate, endDate) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_TRANSACTIONS_REQUEST });

    try {
      const response = await axios.get(`/sell?startDate=${startDate}&endDate=${endDate}`);
      dispatch({
        type: GET_ALL_TRANSACTIONS_SUCCESS,
        payload: response.data.transactions,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TRANSACTIONS_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};


export const getProductByIdRequest = (id) => ({
  type: GET_PRODUCT_BY_ID_REQUEST,
  payload: id,
});

export const getProductByIdSuccess = (product) => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  payload: product,
});

export const getProductByIdFailure = (error) => ({
  type: GET_PRODUCT_BY_ID_FAILURE,
  payload: error,
});

export const getProductById = (id) => {
  return async (dispatch) => {
    dispatch(getProductByIdRequest(id));
    try {
      const response = await fetch(`/api/product/${id}`); // Ajusta la URL de la API según tu configuración
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      dispatch(getProductByIdSuccess(data));
    } catch (error) {
      dispatch(getProductByIdFailure(error.message));
    }
  };
};


export const getTransactionsAndProduct = (startDate, endDate, tipo, clase ) => {
  return async (dispatch) => {
    dispatch({ type: GET_TRANSACTIONS_AND_PRODUCT_REQUEST });

    try {
      // Obtener transacciones
      const transactionsResponse = await axios.get(`/sell?startDate=${startDate}&endDate=${endDate}&tipo=${tipo}&clase=${clase}`);
      const transactions = transactionsResponse.data.transactions;

      // Combinar transacciones y producto
      const data = { transactions };
console.log(data);
      dispatch({
        type: GET_TRANSACTIONS_AND_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_TRANSACTIONS_AND_PRODUCT_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
      if (error.response && error.response.status === 404) {
        // alert('Transacciones no encontradas');
        dispatch(getTransactionsAndProduct('', '', '', '')); 
    }}
  };
};