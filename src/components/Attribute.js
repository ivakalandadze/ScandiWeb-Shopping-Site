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
                if(productItem.choosenAttributes[id].displayValue===item.displayValue){
                  if(type==="swatch"){
                    return (<button
                      onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(productItem,itemId, id, index)}
                      className={`${this.props.class}-choosen-swatch-attribute`}
                      style={{backgroundColor:`${item.displayValue}`}}
                    />)
                  }else{
                    return (<button
                      onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(productItem,itemId, id, index)}
                      className={id==="Capacity" ? `${this.props.class}-capacity-choosen-text-attribute`:`${this.props.class}-choosen-text-attribute`}
                    >
                      {`${item.value}`}
                    </button>)
                  }
                }else{
                  if(type==="swatch"){
                    return (<button
                      onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(productItem,itemId, id, index)}
                      className={`${this.props.class}-swatch-attribute`}
                      style={{backgroundColor:`${item.displayValue}`}}
                    />)
                  }else{
                    return (<button
                      onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(productItem,itemId, id, index)}
                      className={id==="Capacity" ? `${this.props.class}-capacity-text-attribute` : `${this.props.class}-text-attribute`}
                    >
                      {`${item.value}`}
                    </button>)
                  }
                }
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
