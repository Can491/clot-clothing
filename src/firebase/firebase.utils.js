import firebase from 'firebase/app'; //在这个项目中我们需要auth和firestore

/*只有引进了firebase之后，我们才能引进相对应的firestore和auth */
import 'firebase/firestore';
import 'firebase/auth'

//firebase config object
const config = {
    apiKey: "AIzaSyDNof8dxKXwIEfXR3xLGrBQh-orX54jidM",
    authDomain: "crown-clothing-db-32153.firebaseapp.com",
    projectId: "crown-clothing-db-32153",
    storageBucket: "crown-clothing-db-32153.appspot.com",
    messagingSenderId: "84307315343",
    appId: "1:84307315343:web:d16da4c4b372e31b523efa",
    measurementId: "G-SJ4CB01MK1"
}

firebase.initializeApp(config) //Creates and initializes a Firebase {@link firebase.app.App app} instance.

export const auth = firebase.auth(); //to get authentication function
export const firestore = firebase.firestore(); //to firestore function

/*在firestore中有两种用于储存数据的单元一种是collection,一种是document，collection类似一个总的array(users)
里面嵌套document(user且具有一个unique id),然后每一个document又可以嵌套一个collection(cartItems)然后又指向一个document(cartitem) */
/*有两种方式fetch在firestore中的数据：
1.firestore.collection('users').doc('wf7XFVa0C7iu5lGQhGCW').collection('cartitems').doc('sKVw5ABs6nTgYPOChMaL')
这样就能fetch到指定的object
2.firestore.doc('/users/wf7XFVa0C7iu5lGQhGCW/cartitems/sKVw5ABs6nTgYPOChMaL') */



/*1.首先判断userAuth是否存在，即用户是否已登录
2.拿到documentReference,进而拿到snapshot中的数据(async) 格式为firestore.doc('/user/uid')
3.确认这一数据即uid是否已经存在（如存在不用再存）
4.ref.set() create一个document包含displayName,email,creatAt，需要用try-catch包裹
5.返回一个userRef以便使用*/
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    } else {
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const userSnap = await userRef.get();
        if (!userSnap.exists) {
            const { displayName, email } = userAuth;
            const createAt = new Date();
            try {
                await userRef.set({
                    displayName,
                    email,
                    createAt,
                    ...additionalData
                })
            } catch (error) {
                console.log("there is an error", error.message)
            }
        }
        return userRef;
    }
}

export const checkUser = () => {
    return new Promise((resolve,reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth)
        },reject)
    })
}




//传入的两个参数分别为所创建的collection的名称和需要store的object/arrary
export const AddCollectionAndDocument = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey); //得到collection reference
    const batch = firestore.batch(); //以batch去set snapshot要么全部成功要么全部fail，就不会出现上传了一部分然后失败的问题
    objectToAdd.forEach(obj => {  //forEach方法和map类似但它并不会返回一个新的array
        const objectRef = collectionRef.doc() //随机设置ID
        console.log(objectRef);
        batch.set(objectRef, obj) //ID+object设置collection下的每一个doc snapshot
    });
    return await batch.commit(); //这会return一个promise并且fire batch.set
}

export const ConvertDataTypeFromArrayToObject = collections => {
    const covertedData = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: decodeURI(title.toLowerCase()),
            id: doc.id,
            title: title,
            items: items
        }
    })
    return covertedData.reduce((accumulator, currentElement) => {
        accumulator[currentElement.title.toLowerCase()] = currentElement;
        return accumulator
    }, {})
}


export const googleProvider = new firebase.auth.GoogleAuthProvider(); //access to googleAuthProvider from auth library
googleProvider.setCustomParameters({ prompt: 'select_account' }) //设置provider的参数，当使用google登录时弹出google登录的对话框
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider) //这就是我们使用google登录时需要的方法，使用时直接引入至onClick方法

export default firebase;