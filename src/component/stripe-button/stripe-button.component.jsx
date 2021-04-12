import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
    const priceForStripe = price * 100; //在实际结算中需要考虑非integer货币的结算

    //for integrating the function into the application
    const publishableKey = 'pk_test_51IbRlQLinIANanYUJvD3w7ELcqEfgOEfkQDeToqIV0EiVVNk9dlp7xhrFq6VJryIHSzzjDQYawqACWP9LpLzEzdb00bffpKZlO';

    const onToken = token => {
        console.log(token)
        alert('payment successful')
    } // token object会包含一系列的信息，在实际操作将由back-end进行处理create charge

    return (
        <StripeCheckout
            label='Pay Now'
            name='Crwn-clothing Co'
            shippingAddress
            billingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`your total is $${price}`} //显示付款数目
            amount={priceForStripe} //实际付款数目
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            alipay
        />
    )
}

export default StripeButton;