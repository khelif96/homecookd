import { ADD_CART, REMOVE_CART, CLEAR_CART } from '../actions/actionTypes';

const initialState = {
  cart: []
}

function cartReducer(state=initialState, action){
  let cart = [];

  switch(action.type){
    case ADD_CART:
      var newState = {...state};
      return{
        ...newState,
        cart: [...newState.cart, action.order]
      }
    case REMOVE_CART:
      let index = state.cart.findIndex(id => id === action.id);
      cart = state.cart.slice(0);
      cart.splice(index, 1);
      return {...state, cart}
    case CLEAR_CART:
      cart = [];
      return {...state, cart}
    default:
      return state;
  }
}

export default cartReducer;
