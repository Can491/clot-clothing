import styled from "styled-components";

export const CartItemContainer = styled.div`
width: 100%;
    display: flex;
    height: 80px;
    margin-bottom: 15px;
  
    img {
      width: 30%;
    }
`

export const ItemDetailsContainer = styled.div`
width: 60%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 10px 20px;
`

export const NameContainer = styled.span`
font-size: 16px;
`

export const ArrowContainer = styled.div`
      cursor: pointer;
      width: 10%;
      padding-top: 30px;
      padding-right: 30px;
`