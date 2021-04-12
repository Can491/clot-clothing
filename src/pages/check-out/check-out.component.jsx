import React from 'react';

import './check-out.styles.scss';

import { connect } from "react-redux";

import { selectCartItems } from "../../redux/cart/cart-selector";

import { createStructuredSelector } from "reselect";

import { selectCartTotal } from "../../redux/cart/cart-selector";

import CheckOutItem from "../../component/checkout-item/checkout-item.component";

import StripeButton from "../../component/stripe-button/stripe-button.component";



const CheckOut = ({ total, cartItems }) => (
    <div className="checkout-page">
        <div className='checkout-header'>
            <div className="checkout-block">
                <span>Product</span>
            </div>
            <div className="checkout-block">
                <span>Description</span>
            </div>
            <div className="checkout-block">
                <span>Quality</span>
            </div>
            <div className="checkout-block">
                <span>Price</span>
            </div>
            <div className="checkout-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem =>
                (<CheckOutItem key={cartItem.id} cartItem={cartItem} />))
        }
        <div className='total'>${total}</div>
        <div className='warning-information'>
            *This is not a live payment,please use the following card for payment:
            <br />
            4242 4242 4242 4242 - Exp:01/22 - CVV: 123
        </div>
        <StripeButton price={total} />
    </div>
)

const mapStateToProps = createStructuredSelector({
    total: selectCartTotal,
    cartItems: selectCartItems
})

export default connect(mapStateToProps)(CheckOut);