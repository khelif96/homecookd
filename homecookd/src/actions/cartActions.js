import { ADD_CART, REMOVE_CART, CLEAR_CART } from './actionTypes';

export function addCart(order){
  return {
    type: ADD_CART,
    order
  };
}

export function removeCart(id){
  return {
    type: REMOVE_CART,
    id
  };
}

export function clearCart(){
  return {
    type: CLEAR_CART
  };
}
