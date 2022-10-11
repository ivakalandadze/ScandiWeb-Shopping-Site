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
            return <InCartItem class="cart" itemId={id} cartItem={cartItem[id]}/>
          })
          let totalCost = 0
          cartItems.forEach(item => {
            const id = Object.keys(item)[0]
            totalCost+=item[id].price*item[id].count
          });
          let quantity = 0
          let symbol = ""
          cartItems.forEach(item => {
            const id = Object.keys(item)[0]
            quantity+=item[id].count
            symbol = item[id].symbol
          });
          const tax = totalCost*0.18
          return (
            <div className='cart-box'>
              {cartItems.length>0 ? 
                <div>
                  <h2 className='cart-header'>CART</h2>
                  {cartItemElements}
                  <div className='checkout-box'>
                    <p className="checkout-info">Tax 18%: {tax.toFixed(2)}</p>
                    <p className="checkout-info">Quantity: {quantity}</p>
                    <p className="checkout-info total">Total: {symbol}{totalCost.toFixed(2)}</p>
                    <button onClick={()=>alert("Order has been placed")}className='order-button'>Order</button>
                  </div>
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
