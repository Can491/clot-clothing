import { takeLatest,all,put,call } from "redux-saga/effects";

import { clearCart } from "./cart.actions";

import userActionTypes from "../user/user.types";

export function* shopCart() {
  yield put(clearCart())
}

export function* clearShopCart() {
  yield takeLatest(userActionTypes.SIGNOUT_SUCCESS,shopCart)
}

export function* cartSagas() {
  yield all([call(clearShopCart)])
}