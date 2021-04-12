//the container parttern don't render any component, just passing down props and making the component tidy(optional)
import { connect } from "react-redux";

import CategoryPage from "./category.component";

import { createStructuredSelector } from "reselect";

import { compose } from "redux";

import { selectIsCollection } from "../../redux/shop/shop.selector";

import { WithSpinner } from "../with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollection(state)
})

const CategoryPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CategoryPage)

export default CategoryPageContainer;