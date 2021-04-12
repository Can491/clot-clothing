import { combineReducers } from "redux";  //用于合并各个reducer

import userReducer from "./user/user-reducer";

import { directoryReducer } from "./directory/directory.reducer";

import { shopReducer } from "./shop/shop.reducer";

import CartReducer from "./cart/cart-reducer";

import { persistReducer } from "redux-persist";// for redux-persist

import storage from "redux-persist/lib/storage"; //引进local storage，session storage有着不同的路径

const persistConfig = {
    key: 'root', //表示想从哪一点开始store reducer
    storage,    // local storage
    whitelist: ['cart'] //想要persist的reducer,userReducer会由firebase来handle
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: CartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer); //这是一个升级了的rootReducer with persist ability 和 persistConfig