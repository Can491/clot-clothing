import { all,call } from "redux-saga/effects";

import { shopSagas } from "./shop/shop.sagas";

import { signInSaga } from "./user/user.sagas";

import { cartSagas } from "./cart/cart.sagas";

//rootSaga is similar to rootReducer, we can place all generator functions into all method, they will be fired side by side
export default function* rootSaga() {
  yield all([call(shopSagas),call(signInSaga),call(cartSagas)])
}