import React, { Component } from 'react'
import { CartConsumer } from '../../context/CartContext'
import InCartItem from '../InCartItem';

export default class MiniCart extends Component {
  render() {
    return (
      <CartConsumer>
        {props=>{
          const {cartItems} = props;
          const cartItemElements = cartItems.map(cartItem=>{
            const id = Object.keys(cartItem)[0]
            console.log(id)
            return <InCartItem cartItem={cartItem[id]}/>
          })
          return (
            <div>
              {cartItemElements}
            </div>
          )
        }}
      </CartConsumer>
    )
  }
}
