const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.payload;
    case "PRODUCT_DELITE":
      return state.filter((product) => product._id !== action.payload._id);
    default:
      return state;
  }
};

export default productsReducer;
