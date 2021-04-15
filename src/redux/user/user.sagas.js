import { takeLatest,call,put,all } from "redux-saga/effects";

import userActionTypes from "./user.types";

import { signInSuccess,signInFailure,signOutSuccess,signOutFailure,signUpSuccess,signUpFailure } from "./user.actions";

import { auth,googleProvider,createUserProfileDocument,checkUser } from "../../firebase/firebase.utils";

export function* getSnapshotFromAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument,userAuth)
    const snapShot = yield userRef.get()
    yield put(signInSuccess({id: snapShot.id, ...snapShot.data()}))
  }catch(error){
    yield put(signInFailure(error))
  }
}

export function* GoogleSignInAsync() {
  try {
    const {user} = yield auth.signInWithPopup(googleProvider)
    yield getSnapshotFromAuth(user)
  }catch(error){
    yield put(signInFailure(error))

  }
}

export function* EmailSignInAsync({payload:{email,password}}) {
  try{
    const {user} = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromAuth(user)
  }catch(error){
    yield put(signInFailure(error))

  }
}

export function* checkCurrentUser() {
  try{
    const userAuth = yield checkUser()
    if(!userAuth) return;
    yield getSnapshotFromAuth(userAuth)
  }catch(error){
    yield put(signInFailure(error))
  }
}

export function* signOut() {
  try{
    yield auth.signOut();
    yield put(signOutSuccess())
  }catch(error){
    yield put(signOutFailure(error))
  }
}

export function* signUp({payload:{email,password,displayName}}) {
  try{
    const userCredential = yield auth.createUserWithEmailAndPassword(email,password); 
    const userAuth = yield userCredential.user
    console.log(userAuth);
    //异步方法返回一个firebase.auth object,从此处开始app.js里的onauthStateChange已经监听到一个userAuth
    //auth.user这个object中缺少关于displayName的信息，需要自己添加
    const userRef = yield createUserProfileDocument(userAuth, { displayName });
    console.log(userRef);
    const snapShot = yield userRef.get()
    console.log(snapShot.id,snapShot.data());
    yield put(signUpSuccess({id: snapShot.id, ...snapShot.data()}))
  }catch(error){
    yield put(signUpFailure(error))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGNIN_START,GoogleSignInAsync)
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGNIN_START,EmailSignInAsync)
}

export function* onCheckCurrentUser() {
  yield takeLatest(userActionTypes.CHECK_CURRENT_USER,checkCurrentUser)
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGNOUT_START,signOut)
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGNUP_START,signUp)
}

export function* signInSaga() {
  yield all([call(onGoogleSignInStart),call(onEmailSignInStart),call(onCheckCurrentUser),call(onSignOutStart),call(onSignUpStart)])
}