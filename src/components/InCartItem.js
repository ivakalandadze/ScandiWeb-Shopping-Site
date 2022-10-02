import React, { Component } from 'react'
import Attribute from './Attribute'
import { CartConsumer } from '../context/CartContext'

export default class InCartItem extends Component {
  render() {
    return (
    <CartConsumer>
      {cart=>{
        const {changeQuantity} = cart;
        const itemId = this.props.itemId
        const attributes = this.props.cartItem.product.attributes
        const id = this.props.cartItem.product.id
        const item = this.props.cartItem
        const name = this.props.cartItem.product.name
        const price = this.props.cartItem.price
        const pictureURL = this.props.cartItem.product.gallery[0]
        const count = this.props.cartItem.count
        const attributesElements = attributes.map(attribute=>{
          return (
            <div>
              <h5>{`${attribute.name}:`}</h5>
              <Attribute productItem ={this.props.cartItem} itemId={itemId} attribute={attribute}/>
            </div>
          )
        });
        return (
            
            <div className='cart-item-container'>
              <div className='cart-info-box'>
                {name}
                <b>{price}</b>
                {attributesElements}
              </div>
              <div className='cart-img-box'>
                <div className='amount-box'>
                <button onClick={()=>changeQuantity(id,item,"increase")}>+</button>
                {count}
                <button onClick={()=>changeQuantity(id,item,"decrease")}>-</button>
                </div>
                <img width="200px" height="200px"src={pictureURL}/>
              </div>
            </div>
        )
      }}
    </CartConsumer>
    )
  }
}
