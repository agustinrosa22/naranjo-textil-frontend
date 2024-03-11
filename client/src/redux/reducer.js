import { 
    GET_PRODUCTS,
    CREATE_PRODUCT,
    SEARCH_PRODUCTS,
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
        case CREATE_PRODUCT:
            return {
              ...state,
              productList: [...state.productList, action.payload],
            };
            case SEARCH_PRODUCTS:
                return {
                    ...state,
                    productList: action.payload
                };
            
        default:
            return state;
    }
};

export default rootReducer;