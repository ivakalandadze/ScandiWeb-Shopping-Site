import React, { Component } from 'react'
import { CartConsumer } from '../context/CartContext';
import { CurrencyConsumer } from '../context/CurrencyContext'

export default class Attribute extends Component {

  
  render() {
      return (
        <CartConsumer>
          {cart=>{
            const {changeAttributeInCart} = cart;
            const changeAttribute = this.props.changeAttribute
            const productItem = this.props.productItem
            const {type, id, items} = this.props.attribute;
            const fromDetails = this.props.fromDetails
            const itemId = this.props.itemId
            const attributeOptions = items.map((item,index)=>{
              return(
              <button 
                onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(itemId, id, index)  }
                className={productItem.choosenAttributes[id].displayValue===item.displayValue ? "choosen-attribute" : ""}
              >
                {
                  type==="swatch" ? <div style={{backgroundColor:`${item.value}`}}>{`${item.displayValue}`}</div> 
                  : type==="text" ? <div>{`${item.displayValue}`}</div> 
                  : <></>
                }
              </button>)
            }
        )
            return(
              <div>
                {attributeOptions}
              </div>

            )
          }}
        </CartConsumer>
      )
  }
}
