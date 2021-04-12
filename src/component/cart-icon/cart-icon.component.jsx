import React from "react";

import './cart-icon.styles.scss';

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { connect } from "react-redux";

import { setHidden } from "../../redux/cart/cart.actions";

import { selectCartItemsCount } from "../../redux/cart/cart-selector";

import { createStructuredSelector } from "reselect";

const CartIcon = ({ setHidden, itemCount }) => (   //这里可以直接destructure后使用this.props.setHidden = ({setHidden})
    <div className='cart-icon' onClick={setHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    setHidden: () => dispatch(setHidden())
})

const mapStateToProps = createStructuredSelector({   //引入的createStructuredSelector会自动把top-level state传入到相应的selector方法中
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);