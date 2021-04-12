import React from 'react';

import { connect } from "react-redux";

import { removeItem } from "../../redux/cart/cart.actions";

import { CartItemContainer, ItemDetailsContainer, NameContainer, ArrowContainer } from "./cart-item.styles";

const CartItem = ({ item, removeCartItem }) => {
    const { imageUrl, name, price, quantity } = item;
    return (<CartItemContainer>
        <img src={imageUrl} alt='item' />
        <ItemDetailsContainer>
            <NameContainer>{name}</NameContainer>
            <span>${price}×{quantity}</span>
        </ItemDetailsContainer>
        <ArrowContainer onClick={() => removeCartItem(item)}>&#10006;</ArrowContainer>
    </CartItemContainer>)
}

const mapDispatchToProps = dispatch => ({
    removeCartItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CartItem);