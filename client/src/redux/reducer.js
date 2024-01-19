import { 
    GET_PRODUCTS,
 } from "./actionTypes";

 const initialState = {
    productList: [],
  };
const rootReducer = (state = initialState, action) => {
switch(action.type) {
    case GET_PRODUCTS:
        return {
            ...state,
            productList: action.payload
        };
        default:
            return state;
    }
};

export default rootReducer;