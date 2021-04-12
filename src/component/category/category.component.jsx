import React from 'react';

import { connect } from "react-redux";

import { selectCategory } from "../../redux/shop/shop.selector";

import CollectionItem from "../collection-item/collection-item.component";

import './category.styles.scss';

const CategoryPage = ({ match, collection }) => {
    const { items, title } = collection;
    return (<div className='category-page'>
        <h2 className='title'>{title}</h2>
        <div className="items">
            {
                items.map(item => <CollectionItem key={item.id} item={item} />)
            }
        </div>

    </div>)

}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCategory(ownProps.match.params.categoryId)(state)
}
)//通过ownProps我们可以access所有在CategoryPage Component上的props,包括由Route传过来的match,history,location

export default connect(mapStateToProps)(CategoryPage);