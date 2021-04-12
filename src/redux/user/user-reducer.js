import {userActionTypes} from './user.types';

const INITIAL_STATE = {
    currentUser: null    //设置一个state的default值，一般与local state中设置的相同
}

const userReducer = (state = INITIAL_STATE,action) => {
    switch(action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload  //其他state都不变,currentUser会被设成user即action.payload
            } 
        default:
            return state; //没有相对于的action.type,则返回default state
        }
}

export default userReducer;