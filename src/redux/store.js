import { createStore, applyMiddleware } from "redux"; //middleware->between action and rootreducer, catch the action and display and inteprte them in rootreducer
import logger from "redux-logger";  //catch the action and display them
import rootReducer from "./root-reducer";  //这里引进的rootreducer，而不是combineReducer,注意！！
import { persistStore } from "redux-persist";//for redux-persist
//import thunk from "redux-thunk"; this library can allow middleware to detect action which is not object but a function
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]; // for dispatching multiple actions in redux actions.js

//如果当环境为开发时，我们才将logger添加入middlewares以显示state和action
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares)) //之后可能会添加其它的middlewares

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);//这是一个persist版本的store

