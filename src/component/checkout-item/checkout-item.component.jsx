import React from 'react';

import './checkout-item.styles.scss';

import { connect } from "react-redux";

import { removeItem, addItem, decreaseItem } from "../../redux/cart/cart.actions";


const CheckOutItem = ({ cartItem, removeCartItem, addItems, decreaseCartItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    return (<div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt="item" />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <span className="arrow" onClick={() => decreaseCartItem(cartItem)}>&#10094;</span>
            <span className="value">{quantity}</span>
            <span className="arrow" onClick={() => addItems(cartItem)}>&#10095;</span>
        </span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={() => removeCartItem(cartItem)}>&#10005;</div>
    </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeCartItem: item => dispatch(removeItem(item)),
    addItems: item => dispatch(addItem(item)),
    decreaseCartItem: item => dispatch(decreaseItem(item))
})

export default connect(null, mapDispatchToProps)(CheckOutItem);