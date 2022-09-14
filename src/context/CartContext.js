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
        cartItems: [{"huarache-x-stussy-le": 1}]
    }

    getProducts = () =>{
      client
            .query({
                query: gql`
                query Query($input: CategoryInput) {
                    category(input: $input) {
                    products {
                        inStock
                        id
                        name
                        gallery
                        description
                        prices {
                        currency {
                            label
                            symbol
                        }
                        amount
                        }
                        brand
                    }
                    }
                }
                `,
                variables: {
                    "input": {
                        "title": this.props.category
                    }
                }
            })
            .then(result => this.setState({products:result.data.category.products})); 
    }

    addItemtoCart = (item) => {
      this.setState(prevState=>{
        const existingItem = prevState.cartItems.find(prevItem=>Object.keys(prevItem)[0]===item.id)
        if(existingItem){
          const prevItems = [...prevState.cartItems]
          console.log("shevida")
          const index = prevState.cartItems.indexOf(existingItem)
          console.log(prevItems[index][item.id])
          prevItems[index][item.id] ++
          return {cartItems: prevItems}
        }
        else{
          return {cartItems:[...prevState.cartItems,{[item.id]:1}]}
        }
      })
    }
  render() {
    const {cartItems} = this.state;
    const {addItemtoCart} = this;
    return (
      <CartContext.Provider 
        value={{
          cartItems,
          addItemtoCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}
