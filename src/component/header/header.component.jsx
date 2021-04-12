import React from 'react';

import CartIcon from "../cart-icon/cart-icon.component";

import CartDropDown from "../cart-dropdown/cart-dropdown.component";

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./header.styles";

import { createStructuredSelector } from "reselect";

import { selectHidden } from "../../redux/cart/cart-selector";

import { selectCurrentUser } from "../../redux/user/user.selector";

import { auth } from "../../firebase/firebase.utils";
//在这里引入auth library，因为我们需要使用auth.signout功能来实现登出

import { ReactComponent as Logo } from "../../assets/crown.svg";
//这是一种引用svg文件的特殊格式

import { connect } from "react-redux"; //connect是一个higher order component,有了它就可以access reducer相关的数据和action

//<Logo>有专门logo标签，这是一个不需要</Logo>的自我封闭标签,Link才有to这个属性，不能直接放在Logo标签里
const Header = ({ currentUser, hidden }) => ( //这里currentUser的值已经是来源于userReducer了，action部分放在app.js里set currentUser在里面
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/contact'>CONTACT</OptionLink>
            {
                currentUser ?
                    <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink> :
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ?
                null :
                <CartDropDown />
        }

    </HeaderContainer>
)/*注意：auth.signOut()不要丢括号，当currentUser作为props传过来，我们需要判断如果其值不为空，那就是已登录，需要设置登出
但如果传过来为null判断为false，就需要转回到sign in界面去登录*/


//更高级destructure的方法:({上一级object:{最低一级}，上一级object:{最低一级}}) 引用时直接用最低一级即可
//这里的state是top-level的rootReducer,通过它我们可以access userReducer->currentUser值
//state.user是userReducer,这里拿到的currentUser的值为null，还没有和action相关
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectHidden
})

export default connect(mapStateToProps)(Header);