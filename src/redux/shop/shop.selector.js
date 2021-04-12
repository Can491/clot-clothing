import { createSelector } from "reselect";

import memoize from "lodash.memoize";

const selectShop = state => state.shop;



export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

//Object.keys(Object)会返回一个由object key组成的array,然后这里再用map方法将原object里的各个value组成一个新的array
export const selectCollectionsForOverview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(element => collections[element]) : []
)


export const selectCategory = memoize((categoryType) => createSelector(
    [selectShopCollections],
    collections => collections ? collections[categoryType] : null
))//这个selector需要两个参数一个是state，另外一个是基于match.param.categoryId而得到相应ID，然后通过find方法找到ID一致的object,注意find方法只返回第一个符合条件的object
//这是一个curried method,简单说就是const a = (b) => (c) => b*c，在call function的时候，应该为a(b)(c)或者const d = a(b),d(c)
//state nomalization指的是修改数据结构由array改为object，并增加相对应的key，这样搜索的速度会加快，因为find在大量数据的情况下会比较慢

export const selectIsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectIsCollection = createSelector(
    [selectShop],
    shop => !!shop.collections
)