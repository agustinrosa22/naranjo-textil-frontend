import { 
    GET_PRODUCTS,
    CREATE_PRODUCT,
    SEARCH_PRODUCTS,
    EDIT_PRODUCT_SUCCESS, 
    EDIT_PRODUCT_FAILURE,
    SELL_PRODUCT_REQUEST,
    SELL_PRODUCT_SUCCESS,
    SELL_PRODUCT_FAILURE,
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    LOGOUT,
    FILTER_PRODUCTS_SUCCESS,
    GET_ALL_TRANSACTIONS_REQUEST,
    GET_ALL_TRANSACTIONS_SUCCESS,
    GET_ALL_TRANSACTIONS_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
    GET_TRANSACTIONS_AND_PRODUCT_REQUEST,
    GET_TRANSACTIONS_AND_PRODUCT_SUCCESS,
    GET_TRANSACTIONS_AND_PRODUCT_FAILURE,
    REMOVE_TRANSACTION,
    FETCH_PRODUCTS_SUCCESS, 
    FETCH_PRODUCTS_FAILURE, 
    EDIT_PRODUCT
 } from "./actionTypes";

 const initialState = {
    productList: [],
    filteredProductList: [],
    transactions: [],
    products: [],
    error: null,
    saleData: null,
    loading: false,
    user: null,
    product: null,
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
                    case SELL_PRODUCT_REQUEST:
                      return {
                        ...state,
                        loading: true,
                        error: null,
                      };
                    case SELL_PRODUCT_SUCCESS:
                      return {
                        ...state,
                        loading: false,
                        saleData: action.payload,
                      };
                    case SELL_PRODUCT_FAILURE:
                      return {
                        ...state,
                        loading: false,
                        error: action.payload,
                      };
                      case LOGIN_REQUEST:
                            return {
                        ...state,
                        loading: true,
                        error: null
                      };
                      case LOGIN_SUCCESS:
                        return {
                          ...state,
                          user: action.payload,
                          loading: false,
                          error: null
                        };
                      case LOGIN_FAILURE:
                        return {
                          ...state,
                          loading: false,
                          error: action.payload
                        };
                        case LOGOUT:
                          return {
                            ...state,
                            user: null, // Limpiar los datos del usuario al hacer logout
                          };
                          case FILTER_PRODUCTS_SUCCESS:
                            return {
                                ...state,
                                productList: action.payload,
                            };
                            case GET_ALL_TRANSACTIONS_REQUEST:
                              return {
                                ...state,
                                loading: true,
                                error: null,
                              };
                            case GET_ALL_TRANSACTIONS_SUCCESS:
                              return {
                                ...state,
                                transactions: action.payload,
                                loading: false,
                              };
                            case GET_ALL_TRANSACTIONS_FAILURE:
                              return {
                                ...state,
                                loading: false,
                                error: action.payload,
                              };
                              case GET_PRODUCT_BY_ID_REQUEST:
                                return {
                                  ...state,
                                  loading: true,
                                  error: null,
                                  product: null,
                                };
                              case GET_PRODUCT_BY_ID_SUCCESS:
                                return {
                                  ...state,
                                  loading: false,
                                  product: action.payload,
                                };
                              case GET_PRODUCT_BY_ID_FAILURE:
                                return {
                                  ...state,
                                  loading: false,
                                  error: action.payload,
                                };
                                case GET_TRANSACTIONS_AND_PRODUCT_REQUEST:
                                  return {
                                    ...state,
                                    loading: true,
                                    error: null,
                                  };
                                case GET_TRANSACTIONS_AND_PRODUCT_SUCCESS:
                                  return {
                                    ...state,
                                    loading: false,
                                    transactions: action.payload.transactions,
                                    product: action.payload.product,
                                  };
                                case GET_TRANSACTIONS_AND_PRODUCT_FAILURE:
                                  return {
                                    ...state,
                                    loading: false,
                                    error: action.payload,
                                  };
                                  case REMOVE_TRANSACTION:
                                    return {
                                      ...state,
                                      transactions: state.transactions.filter(
                                        (transaction) => transaction.id !== action.payload
                                      ), // Filtrar la lista de transacciones para eliminar la correspondiente
                                    };
                                    case FETCH_PRODUCTS_SUCCESS:
                                      return {
                                        ...state,
                                        products: action.payload,
                                        error: null,
                                      };
                                    case FETCH_PRODUCTS_FAILURE:
                                      return {
                                        ...state,
                                        products: [],
                                        error: action.payload,
                                      };
                                      
        default:
         
            return state;
    }
};

export default rootReducer;