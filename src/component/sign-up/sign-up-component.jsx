import React from 'react';

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import { FormInput } from "../form-input/form-input.component";

import { CustomeButton } from "../custome-button/custome-button.component";

import { withRouter } from "react-router-dom";

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmedPassword: ''
        }
    }

    // backSignin = props => {

    // }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmedPassword } = this.state;
        if (!(password === confirmedPassword)) { //先验证密码是否相符合
            alert('password and confirmedPassword do not match')
            return;  //不符合到此处即停止
        } else {
            try {
                const { user } = await auth.createUserWithEmailAndPassword(email, password); //异步方法返回一个firebase.auth object,从此处开始app.js里的onauthStateChange已经监听到一个userAuth
                console.log('test');
                console.log(user); //auth.user这个object中缺少关于displayName的信息，需要自己添加
                await createUserProfileDocument(user, { displayName });
                this.setState({
                    displayName: '',  //清空input
                    email: '',
                    password: '',
                    confirmedPassword: ''
                })
            } catch (error) {
                console.error(error)
            }
        }





    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }


    //CustomeButton的type属性为submit和form标签中的onSubmit相对应
    render() {
        return (
            <div className="sign-up">
                <h1 className='title'>I do not have an account</h1>
                <span>sign up with email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="text" name="displayName" value={this.state.displayName} label='displayName' onChange={this.handleChange}
                        required />
                    <FormInput type="email" name="email" value={this.state.email} label='email' onChange={this.handleChange}
                        required />
                    <FormInput type="password" name="password" value={this.state.password} label='password' onChange={this.handleChange}
                        required />
                    <FormInput type="password" name="confirmedPassword" value={this.state.confirmedPassword} label='confirmedPassword' onChange={this.handleChange}
                        required />
                    <div className="buttons">
                        <CustomeButton type='submit'>SIGN UP</CustomeButton>
                        <CustomeButton type="button" onClick={() => this.props.history.push('/signin')}>Back</CustomeButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignUp);