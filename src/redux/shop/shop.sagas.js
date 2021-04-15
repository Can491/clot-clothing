import { takeLatest,put,call,all } from "redux-saga/effects"; //takeEvery will listen to the incoming actions and fire relevant functions according to actions received

import { shopActionTypes } from "./shop.types";

import { firestore,ConvertDataTypeFromArrayToObject } from "../../firebase/firebase.utils";

import { fetchCollectionsSuccess,fetchCollectionsFailure } from "./shop.actions";

export function* fetchCollectionsAsync() {
  try{
    const collectionRef = firestore.collection('collections');
    const collectionMap = yield collectionRef.get(); //yield in the generator function will wait the response of API call
    const showData = yield call(ConvertDataTypeFromArrayToObject,collectionMap)//call method has same effect of ConvertDataTypeFromArrayToObject(collectionMap)
    yield put(fetchCollectionsSuccess(showData)) //put is similar to the dispatch is thunk
  }
  catch(error){
    yield put(fetchCollectionsFailure(error.message))
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionsAsync) //if takeEvery receive the action whose type of action is FETCH_COLLECTIONS_START,it will fire fetchCollectionsAsync
  // takeLatest will cancel the previous actions and only fire the latest action called
  // we only need to fire the action of fetching data one time here
  //fetchCollectionStart is generator function will be fired in the shopPage component, and then it will fires other sagas
}

//take(actionType) take will only receive one parameter and return the action.payload,take will follow basic rules of generator function and will not be fired again when it has been fired, it can be used to debounce multiple actions,for example we can use delay to avoid the saga being fired withing specific time
//takeLatest will cancel the previous saga request and will fire the latest one

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)])
}