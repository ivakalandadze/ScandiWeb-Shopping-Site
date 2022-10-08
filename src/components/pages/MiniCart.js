import React, { Component } from 'react'
import { CartConsumer } from '../../context/CartContext'
import InCartItem from '../InCartItem';

export default class Cart extends Component {
  render() {
    return (
      <CartConsumer>
        {props=>{
          const {cartItems} = props;
          const cartItemElements = cartItems.map(cartItem=>{
            const id = Object.keys(cartItem)[0]
            return <InCartItem itemId={id} cartItem={cartItem[id]}/>
          })
          const totalCost = 0
          cartItems.forEach(item => {
            const id = Object.keys(cartItem)[0]
            totalCost+=item[id].price
          });
          return (
            <div className='cart-box'>
              {cartItems.length>0 ? 
                <div>
                    {cartItemElements}
                    <p>{totalCost}</p>
                    </div> : 
                <h1>Please add items to cart</h1>
              }
            </div>
          )
        }}
      </CartConsumer>
    )
  }
}
