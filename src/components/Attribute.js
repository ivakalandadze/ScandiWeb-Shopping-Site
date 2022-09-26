import React, { Component } from 'react'
import { CartConsumer } from '../context/CartContext';
import { CurrencyConsumer } from '../context/CurrencyContext'

export default class Attribute extends Component {

  
  render() {
    // const {type, id, items} = this.props.attribute;
    // const attributeOptions = items.map((item,index)=>(
    //       <button onClick={()=>this.chooseAttribute(index)}className={index===this.state.choosenAttributeIndex ? "choosen-attribute" : "attribute"}>
    //         {
    //           type==="swatch" ? <div style={{backgroundColor:`${item.value}`}}>{`${item.displayValue}`}</div> 
    //           : type==="text" ? <div>{`${item.displayValue}`}</div> 
    //           : <></>
    //         }
    //       </button>
    //    )
    // )
      return (
        <CartConsumer>
          {cart=>{
            const {changeAttribute} = cart;
            const productItem = this.props.productItem
            const {type, id, items} = this.props.attribute;
            const itemId = this.props.itemId
            const attributeOptions = items.map((item,index)=>{
              return(
              <button onClick={()=>changeAttribute(itemId, id, index)}
                className={productItem.choosenAtributes[id].displayValue===item.displayValue ? "choosen-attribute" : ""}
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
