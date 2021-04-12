import {userActionTypes} from './user.types';

//设置action,payload可以理解为参数，可以有也可以没有
export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
})