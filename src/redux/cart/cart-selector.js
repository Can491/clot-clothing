import { createSelector } from "reselect";

const selectCart = state => state.cart; //这是一个input selector


//下面三个都是output selector，state->cart(input selector)->cartItems(output selector)->cartItemsCount(output selector)
//在mapStateToProps中使用slector可以避免因为top-level state的变化(包含多个reducer，其它reducer中的数据有变化)而引起的不必要的rerender
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulator, cartItem) =>
        cartItem.quantity + accumulator, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulator, cartItem) =>
        cartItem.quantity * cartItem.price + accumulator, 0)
)


