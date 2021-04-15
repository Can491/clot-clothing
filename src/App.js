import HomePage from "./pages/homepage/homepage.component";

import ShopPage from './pages/shoppage/shoppage.component';

import Header from "./component/header/header.component";

import SignIn from "./component/sign-in/sign-in.component";

import SignUp from "./component/sign-up/sign-up-component";

//import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
//我们在此引入auth library的原因是希望得到auth.user  这个object,并将它设置为local state，以便使用或传到其他component

import { Switch, Route, Redirect } from "react-router-dom"; //Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack
/*Switch在Route里没有exact时只会render url里第一个相符合的rul，不会去加载多余的东西,
<Route>标签中exact默认为true,会严格加载标签path里的url,当path为‘/’,默认为localhost:3000
component为所要加载的component*/

import './App.css';

import React from "react";

import { connect } from "react-redux"; //我们在this.setState({currentUser: user})的地方dispatch action

//import { setCurrentUser } from "./redux/user/user.actions";

import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selector";

//import { selectCollectionsForOverview } from "./redux/shop/shop.selector";

import CheckOut from "./pages/check-out/check-out.component";

import { checkCurrentUser } from "./redux/user/user.actions";



//<Route path='/topics/:topicId' component={TopicDetail} /> :topicId这是match.params.topicId
/*有两种办法可以navigate application,第一种是link，我们首先需要引进Link,然后利用Link标签中to attribute将我们带向我们需要去的网页
第二种方法为props.history.push('url')这种方式更加灵活，可以放在button里和onclick使用，也可以放在componentDidMount中因为不需要点击，
props来自于Route标签中component加载时返回的三个参数(match,history,loaction)*/
/*props.location.pathname能得到现在所输入url,match.url是实际match的，{`${props.match.url}/21`}类似这样可以在不知道完全url的情况下带我们去想去的url*/
//任何被Route标签所加载的component都会返回的三个参数，分别为props.url,props.match,props.history
/*只有第一个被Route render的component能get history,match,location，
只有在homepage component能使用这些参数，为了避免使用将这些参数一层一层的往下传
我们会使用诸如withroute这样higher order component,这样一些子component就能直接get到和route相关的一些参数*/
class App extends React.Component {
  //为什么删掉constructor-本地不需要local state的值/且不在使用this.setState


  //unsubscribeFromAuth = null;

  /*当application第一次mounting以后auth.onAuthStateChanged()就会持续监听user object的变化情况
  即使关闭网页或者刷新，也依然会继续，除非主动的unsubscribe */
  componentDidMount() {
    const {isUserExists} = this.props;
    isUserExists();
    //const { setCurrentUser } = this.props; //这个props是通过connect这个higher order component获得
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   //如果user存在，即用户处在登录状态
    //   if (userAuth) {
    //     const userReference = await createUserProfileDocument(userAuth); //1.第一次登录的用户会先把数据存在firestore并返回documentreference 2.已登录的用户直接返回reference
    //     userReference.onSnapshot(snapShot => { //此方法会会像auth.onAuthStateChanged()持续监听user object的变化情况一样监听snapshot的变化,因为不管是google signin还是email signin一旦有了userAuth object便开始监听，一些addtionaldata需要在后面添加需要持续监听
    //       setCurrentUser( //这里是整体将currentUser设成一个包含id和displayName,createAt的object
    //         {
    //           id: userAuth.uid,
    //           ...snapShot.data()
    //         })
    //     })
    //   } else {
    //     setCurrentUser(userAuth) //用户未登录直接设为null 
    //   }
    // })
    //AddCollectionAndDocument('collections', arrayToAdd.map(({ title, items }) => ({ title, items })))
    //新array中只需要包括title和items，其它key和value不需要，放在ComponentDidMount中只运行一次即可，单纯为了上传数据
  }

  /*当我们stripe off the dom的时候，就需要清除掉和auth的connection,就不会再监听user object的情况(这不是sign out),只是防止memory leaking */

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  //在header标签中引入this.state.currentUser传入到header component中帮助判断现在是登入还是登出的状态
  //这里exact在相应的component中的nested route也会exact
  render() {
    const { currentUser } = this.props
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckOut} />
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : <SignIn />} />
          <Route exact path='/signup' render={() => currentUser ? (<Redirect to='/' />) : <SignUp />} />
        </Switch>
      </div>// render是一个方法，这里改成了arrow function,将决定返回哪一个component，如果currentUser存在，那就navigate to主页，否则就return 登录页
    );
  }
}

const mapStateToProps = createStructuredSelector({  //为了确定当前到底有没有用户处于登陆状态，不管是action还是state都是外来props,都要加上this.props
  currentUser: selectCurrentUser
  //arrayToAdd: selectCollectionsForOverview
})

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))  //dispatch用于inteprete the action object passed in,这是一个object,setCurrentUser是key name，也是我们在component里使用的方法的名称，你也可以叫其它
// })                                                        // value部分是一个方法，参数为user，dispatch相当于一个翻译器，setCurrentUser来自于action.js

const mapDispatchToProps = dispatch => ({
  isUserExists: () => dispatch(checkCurrentUser())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
