import React from 'react';

import { connect } from "react-redux";

import { CustomeButton } from '../custome-button/custome-button.component';

import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../redux/cart/cart-selector";

import { withRouter } from "react-router-dom";

import { setHidden } from "../../redux/cart/cart.actions";

import { CartDropDownContainer, CartItemsContainer, EmptyMessageContainer } from "./cart-dropdown.styles";


//我们也可以不写mapToDispatchProps方法，因为connect会将dispatch作为props的一部分传到component里，这可以简化代码，但是这需要connect这个HOC已经warp了这个component，即已经使用了mapStateToProps的情况下
//注意此方法只在mapStateToProps已存在的情况下使用
const CartDropDown = ({ cartItems, history, match, dispatch }) => (
    <CartDropDownContainer>
        <CartItemsContainer>
            {cartItems.length ?
                (cartItems.map(cartItem =>
                    (<CartItem key={cartItem.id} item={cartItem} />))) :
                <EmptyMessageContainer>The cart is empty</EmptyMessageContainer>
            }
        </CartItemsContainer>
        <CustomeButton onClick={() => {
            history.push(`${match.url}checkout`);
            dispatch(setHidden()); //当onClick需要触发第二个方法时，加{}和；然后可加上第二个方法
        }}>GO TO CHECKOUT</CustomeButton>
    </CartDropDownContainer>
)

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

// const mapDispatchToProps = dispatch => ({
//     hidePop: () => dispatch(setHidden())
// })

export default withRouter(connect(mapStateToProps)(CartDropDown));