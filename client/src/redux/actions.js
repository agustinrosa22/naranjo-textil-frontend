import axios from 'axios'
import {
    GET_PRODUCTS
} from './actionTypes'

export const getProducts = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get('/product');
            return dispatch({
                type: GET_PRODUCTS,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);
        }
    }
}