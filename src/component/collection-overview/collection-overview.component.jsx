import React from "react";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { selectCollectionsForOverview } from "../../redux/shop/shop.selector";

import './collection-overview.styles.scss';

import CollectionPreview from "../collection-preview/collection-preview.component";

//<div>标签中的变量要加{}，这是javaScript,otherProps前面要加...
const CollectionOverview = ({ collections }) => {
    return (<div className='collection-overview'>
        {
            collections.map(({ id, ...otherCollectionProps }) =>
                (<CollectionPreview key={id} {...otherCollectionProps} />))
        }
    </div>)
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForOverview
})

export default connect(mapStateToProps)(CollectionOverview);