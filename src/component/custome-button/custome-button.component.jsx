import React from 'react';

import { CustomedButtonContainer } from "./custome-button.styles";

//目前otherProps只包含了一个type属性，但鉴于其它的button可能会有其余属性，用otherProps比较好
//可以把${isSignInWithGoogle? "sign-in-with-google":''}看作一个函数，会返回一个字符串与后面的custome-button组合起来
export const CustomeButton = ({ children, ...props }) => (
    <CustomedButtonContainer {...props}>
        {children}
    </CustomedButtonContainer>
)