import React, { Component, createContext } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

export const CartContext = createContext();

export const CartConsumer = CartContext.Consumer

export default class CartProvider extends Component {
    state = {
        cartItems: []
    }

    

    getProducts = (id,price) =>{
      client
            .query({
                query: gql`
                query Query($productId: String!) {
                  product(id: $productId) {
                    name
                    id
                    gallery
                    description
                    attributes {
                      id
                      name
                      type
                      items {
                        displayValue
                        value
                        id
                      }
                    }
                  }
                }
                `,
                variables: {
                   "productId": id
                }
            })
            .then(result=>{
              const product = {...result.data.product}
              const choosenAttributes = {}
              product.attributes.forEach(attribute=>{
                choosenAttributes[attribute.id] = attribute.items[0]
              })
              const defaultAttributes = {...choosenAttributes}
              this.setState(prevState=>({
              cartItems:[...prevState.cartItems, {[id]:{
                "count": 1,
                product,
                price,
                choosenAttributes,
                defaultAttributes
              }}]
            }))
          })
    }

    addItemtoCart = (item,price) => {
      const existingItem = this.state.cartItems.find(prevItem=>Object.keys(prevItem)[0]===item.id)
      if(existingItem&&existingItem[item.id].choosenAtributes===existingItem[item.id].defaultAttributes){
        // const attributesMatch = existingItem[item.id].choosenAtributes===existingItem[item.id].defaultAttributes
          const prevItems = [...this.state.cartItems]
          const index = this.state.cartItems.indexOf(existingItem)
          prevItems[index][item.id]["count"] ++
          this.setState({cartItems: prevItems})
      }else {
        this.getProducts(item.id,price)
      }
    }

    changeQuantity = (id,command) => {
      this.state.cartItems.map((cartItem,index)=>{
        if(Object.keys(cartItem)[0]===id){
          const newQuantity = [...this.state.cartItems]
          if(command==="increase"){
            newQuantity[index][id].count += 1
          }else if(command==="decrease") {
            newQuantity[index][id].count -= 1
          }
          this.setState({cartItems: newQuantity})
        }
      })
    }
    
    changeAttributeInCart = (id, attributeId, itemId) => {
      const prevCartItems=[...this.state.cartItems]
      const index = prevCartItems.findIndex(cartItem=>Object.keys(cartItem)[0]===id)
      const attributeIndex = prevCartItems[index][id].product.attributes.findIndex(attribute=>attribute.id===attributeId)
      const newItem = prevCartItems[index][id].product.attributes[attributeIndex].items[itemId]
      prevCartItems[index][id].choosenAttributes[attributeId] = newItem
      this.setState({cartItems: prevCartItems})
    }

  render() {
    const {cartItems} = this.state;
    const {addItemtoCart,changeQuantity,changeAttributeInCart} = this;
    return (
      <CartContext.Provider 
        value={{
          cartItems,
          addItemtoCart,
          changeQuantity,
          changeAttributeInCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}
