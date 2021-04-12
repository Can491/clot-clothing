import React from "react";

import { Route } from "react-router-dom";

import CollectionOverviewContainer from "../../component/collection-overview/collection-overview.container";

import CategoryPageContainer from "../../component/category/category.container";

import { fetchCollectionsAsync } from "../../redux/shop/shop.actions";

import { connect } from "react-redux";

//match.path在这里即为/shop
//categoryId为params->match.params.categoryId,在match中有path,url,params三个重要参数
//任意一个Route中render的component，在component中都可access相应match,history,location
//只有被render的component page可以get到相应的match,history,location再往下需要用withRouter
class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsAsync } = this.props;
        fetchCollectionsAsync();
    }

    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
                <Route path={`${match.path}/:categoryId`} component={CategoryPageContainer} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsAsync: () => dispatch(fetchCollectionsAsync())
})


export default connect(null, mapDispatchToProps)(ShopPage);