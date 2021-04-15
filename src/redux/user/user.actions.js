import userActionTypes from './user.types';

//设置action,payload可以理解为参数，可以有也可以没有
export const googleSignInStart = () => ({
    type: userActionTypes.GOOGLE_SIGNIN_START
})

export const signInSuccess = user => ({
    type: userActionTypes.SIGNIN_SUCCESS,
    payload: user
})

export const signInFailure = error => ({
    type: userActionTypes.SIGNIN_FAILURE,
    payload:error
})

export const emailSignInStart = emailAndPassword => ({
    type: userActionTypes.EMAIL_SIGNIN_START,
    payload: emailAndPassword
})

export const checkCurrentUser = () => ({
    type: userActionTypes.CHECK_CURRENT_USER
})

export const signOutStart = () => ({
    type: userActionTypes.SIGNOUT_START
})

export const signOutSuccess = () => ({
    type: userActionTypes.SIGNOUT_SUCCESS
})

export const signOutFailure = error => ({
    type: userActionTypes.SIGNOUT_FAILURE,
    payload:error
})

export const signUpStart = emailAndPasswordAndDisplayname => ({
    type: userActionTypes.SIGNUP_START,
    payload: emailAndPasswordAndDisplayname
})

export const signUpSuccess = user => ({
    type: userActionTypes.SIGNUP_SUCCESS,
    payload: user
})

export const signUpFailure = error => ({
    type: userActionTypes.SIGNUP_FAILURE,
    payload:error
})