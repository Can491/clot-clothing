import CollectionOverview from "./collection-overview.component";

import { selectIsCollection } from "../../redux/shop/shop.selector";

import { WithSpinner } from "../with-spinner/with-spinner.component";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollection(state)
}) //state => !selectIsCollection(state)will create a new selector

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview)

export default CollectionOverviewContainer;
