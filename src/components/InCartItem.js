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
        const name = this.props.cartItem.product.name
        const price = this.props.cartItem.price
        const pictureURL = this.props.cartItem.product.gallery[0]
        const count = this.props.cartItem.count
        const attributesElements = attributes.map(attribute=>{
            return <Attribute productItem ={this.props.cartItem} itemId={itemId} attribute={attribute}/>
        });
        return (
            
            <div>
              {name}
              {count}
              {price}
              {attributesElements}
              <img width="50px"src={pictureURL}/>
              <button onClick={()=>changeQuantity(id,"increase")}>+</button>
              <button onClick={()=>changeQuantity(id,"decrease")}>-</button>
            </div>
        )
      }}
    </CartConsumer>
    )
  }
}
