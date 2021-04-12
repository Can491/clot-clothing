/*有两种方式处理异步事件，第一种是promise,第二种是async await，需要添加async关键字
并且在异步事件前添加await 关键字，处理error用try catch */
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(users => {
    const firstUser = users[0];
    console.log(firstUser);
    return fetch('https://jsonplaceholder.typicode.com/posts?userId=' + firstUser.id);
})
.then(response => response.json())
.then(posts => console.log(posts))
.catch(error => console.log(error));

const myAsyncFunction = async () => {
    try{
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await userResponse.json();
        const secondUser = users[1];
        console.log(secondUser);
        const userPosts = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + secondUser.id);
        const posts = await userPosts.json()
        console.log(posts)
    }catch(error){
        console.log('there is an error')
    }
}