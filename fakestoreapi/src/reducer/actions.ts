export interface Product {
  id: number;
  count?: number;
}


export const addToCart = (product: Product, count = 1) => ({
  type: 'ADD_TO_CART',
  payload: { product, count }
});

export const removeToCart = (product: Product) => ({
  type: 'REMOVE_TO_CART',
  payload: { product }
})

export const updateItemCount = (product: Product, actionType: string) => ({
  type: 'UPDATE_ITEM_COUNT',
  payload: { product, actionType },
});
export const loginSuccess = (user: any) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
});