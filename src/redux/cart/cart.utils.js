export const addItemToCart = (cartItems, itemToAdd) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === itemToAdd.id) //array.find会穷尽这个array(找到了符合条件就停止，没找到就继续)然后返回一个boolean值

    //修改一个object的方法就是{...cartItem, new key: new value}其它key和value不变，添加一个new key和new value
    if (existingItem) {
        return cartItems.map(cartItem =>  //这里的return语句会直接stop excution,返回新arrary，最后一行代码不会执行
        ((cartItem.id === itemToAdd.id) ? //这里的return语句一方面返回一个新array另外一方面stop excution让最后一行不执行
            { ...cartItem, quantity: cartItem.quantity + 1 } :
            cartItem
        ))
    } //map方法会返回一个新的array(new prorps会使得application进入updating phase然后rerender)

    return [...cartItems, { ...itemToAdd, quantity: 1 }] //cartItem是空的或者itemToAdd是第一次添加到array里

}

export const removeItemFromCart = (cartItems, itemToRemove) => {
    return cartItems.filter(cartItem => !(cartItem.id === itemToRemove.id))
}

export const decreaseItemFromCart = (cartItems, itemToDecrease) => {
    if (itemToDecrease.quantity === 1) {
        return cartItems.filter(cartItem => !(cartItem.id === itemToDecrease.id))
    }

    return cartItems.map(cartItem => (
        (cartItem.id === itemToDecrease.id) ?
            { ...cartItem, quantity: cartItem.quantity - 1 } :
            cartItem
    ))
}