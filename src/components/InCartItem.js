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
        const brand = this.props.cartItem.product.brand
        const price = `${this.props.cartItem.symbol}${this.props.cartItem.price}`
        const pictureURL = this.props.cartItem.product.gallery[0]
        const count = this.props.cartItem.count
        const attributesElements = attributes.map(attribute=>{
          const atrName = attribute.name.toUpperCase()
          return (
            <div>
              <h5 className='attribute-name'>{`${atrName}:`}</h5>
              <Attribute productItem ={this.props.cartItem} itemId={itemId} attribute={attribute}/>
            </div>
          )
        });
        return (
            
            <div className='cart-item-container'>
              <div className='cart-info-box'>
                <h3 className='brand'>{brand}</h3>
                <p className='name'>{name}</p>
                <h4 className='price'>{price}</h4>
                {attributesElements}
              </div>
              <div className='cart-img-box'>
                <div className='amount-box'>
                  <button className="quantity-button"onClick={()=>changeQuantity(id,item,"increase")}>+</button>
                  <p className="count">{count}</p>
                  <button className="quantity-button"onClick={()=>changeQuantity(id,item,"decrease")}>-</button>
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
