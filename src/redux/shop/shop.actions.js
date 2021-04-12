import { shopActionTypes } from "./shop.types";

import { firestore, ConvertDataTypeFromArrayToObject } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = showData => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: showData
})

export const fetchCollectionsFailure = errorMessage => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsAsync = () => {
    return dispatch => {  //we have dispatch because we want to fire multiple actions during the process of fetching data
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        /*docRef or collectionRef.get().then() can be used for back-end which is not firebase,
        but it will not always listen to change of snpashot, 
        we can only update the data when reMount the shoppage component*/
        collectionRef.get().then(snapShot => {
            const showData = ConvertDataTypeFromArrayToObject(snapShot);
            dispatch(fetchCollectionsSuccess(showData))
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}