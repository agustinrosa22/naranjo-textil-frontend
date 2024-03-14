import { 
    GET_PRODUCTS,
    CREATE_PRODUCT,
    SEARCH_PRODUCTS,
    EDIT_PRODUCT_SUCCESS, 
    EDIT_PRODUCT_FAILURE
 } from "./actionTypes";

 const initialState = {
    productList: [],
    error: null,
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
                case EDIT_PRODUCT_SUCCESS:
                    return {
                      ...state,
                      product: action.payload,
                      error: null,
                    };
                  case EDIT_PRODUCT_FAILURE:
                    return {
                      ...state,
                      product: null,
                      error: action.payload,
                    };
        default:
            return state;
    }
};

export default rootReducer;