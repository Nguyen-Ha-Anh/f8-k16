//file khai bao hanh dong
export const ADD_CART = 'ADD_CART';
export const INCRE_QUANTITY = 'INCRE_QUANTITY';
export const DECRE_QUANTITY = 'DECRE_QUANTITY';
export const REMOVE_CART = 'REMOVE_CAR'
export const TOGGLE_CART = 'TOGGLE_CART';

export const addCart = (product) => ({
    type: ADD_CART,
    payload: product
})
export const increQuantity = (id) => ({
    type: INCRE_QUANTITY,
    payload: id
})
export const decreQuantity = (id) => ({
    type: DECRE_QUANTITY,
    payload: id
})
export const removeCart = (id) => ({
    type: REMOVE_CART,
    payload: id
})
export const toggleCart = () => ({
    type: TOGGLE_CART
})