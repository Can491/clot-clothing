import React from 'react';

import {
    CollectionItemContainer,
    AddButton,
    ImageContainer,
    FooterContainer,
    NameContainer,
    PriceContainer
} from "./collection-item.styles";

import { connect } from "react-redux";

import { addItem } from "../../redux/cart/cart.actions";

const CollectionItem = ({ item, addItems }) => {
    const { name, price, imageUrl } = item
    return (
        <CollectionItemContainer>
            <ImageContainer className='image' imageUrl={imageUrl} />
            <FooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>${price}</PriceContainer>
            </FooterContainer>
            <AddButton inverted onClick={() => { addItems(item) }}> ADD TO CART </AddButton>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    addItems: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);