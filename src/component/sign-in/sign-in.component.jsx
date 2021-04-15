import React from 'react';

import { FormInput } from "../form-input/form-input.component";

import { CustomeButton } from "../custome-button/custome-button.component";

//import { auth } from "../../firebase/firebase.utils";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { googleSignInStart, emailSignInStart} from "../../redux/user/user.actions";


import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    /*event.preventDefault能阻止form submitting,其同样可以用于阻止link中的to功能,
    Line3会清空input */
    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        // try {
        //     await auth.signInWithEmailAndPassword(email, password); //注意这是一个异步方法

        // } catch (error) {
        //     alert(error.message)
        //     console.log(error.message);
        // }
        const {emailSignIn} = this.props;
        emailSignIn(email,password);
        this.setState({ email: '', password: '' })
    }


    /*这里的event.target.name为input标签里name，[name] = [${name}],我们能灵活的设置state里的值，而不用写
    多个不同的handleChange方法,也可以用以下的方法，但是会多写一些handleChange方法 */
    // handleEmailChange = event => {
    //     const email = event.target.value;
    //     this.setState({email: email})
    // }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    //当使用了arrow function,就可以在render中使用this关键词，而不用binding
    //type为submit的input标签，value值为显示出来的值
    render() {
        const {googleSignIn} = this.props;
        return (
            <div className='sign-in'>
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' value={this.state.email} onChange={this.handleChange} type='email' label='Email' required />
                    <FormInput name="password" value={this.state.password} onChange={this.handleChange} type='password' label='Password' required />
                    <div className="buttons">
                        <CustomeButton type="submit">SIGN IN</CustomeButton>
                        <CustomeButton type='button' onClick={googleSignIn} isSignInWithGoogle>SIGN IN With GOOGLE</CustomeButton>
                    </div>
                </form>
                <Link to="./signup" className='sign-up'>Without account? click here to sign up</Link>
            </div>
        ) //signInWithGoogle本身就是一个arrow function我们不用再设置
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignIn: () => dispatch(googleSignInStart()),
    emailSignIn: (email,password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchToProps)(SignIn);