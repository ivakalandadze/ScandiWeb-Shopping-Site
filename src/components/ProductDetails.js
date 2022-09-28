import React, { Component } from 'react'
import Product from './Product'
import withRouter from './withRouter'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Attribute from './Attribute';
import { CurrencyConsumer } from '../context/CurrencyContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

class ProductDetails extends Component {
  state ={
    product: {},
    price: "",
    localCurrency: ""
  }
  componentDidMount(){
    this.getProducts(this.props.params.id)

  }
  // componentDidUpdate(prevProps, prevState){
  //     if(prevState.localCurrency!==""){
  //     if(this.state.product.prices){
  //       this.state.product.prices.map(price=>{
  //         if(price.currency.label===this.state.localCurrency){
  //           this.setState({price: `${price.currency.symbol}${price.amount}`})
  //         }
  //       })
  //     }
  //   }
  // }
  
  getProducts = (id) =>{
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
                  prices {
                    currency {
                      label
                      symbol
                    }
                    amount
                  }
                  brand
                  inStock
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
            this.setState({product:{...product,choosenAttributes}})
          })
  }

  changeAttribute =(attributeId, itemId)=>{ 
    const prevState = {...this.state.product}
    const newAttribute = prevState.attributes.find(attribute=>attribute.id===attributeId)
    const newItem = newAttribute.items[itemId]
    prevState.choosenAttributes[attributeId] = newItem
    this.setState(prevState)
  }
  
  render() {
    const itemId=this.props.params.id
    const product = this.state.product
    let attributeName = ""
    const attributesElements = product.attributes ?  product.attributes.map(attribute=>{
      return (
        <div>
          <h3>{attribute.id}</h3>
          <Attribute changeAttribute={this.changeAttribute} fromDetails={true} productItem={product} itemId={itemId} attribute={attribute}/>
        </div>
      )
    }) : []
    
    return (
      <CurrencyConsumer>
        {currencies=>{
          const {selectedCurrency} = currencies;
          // console.log("gijivit ilogeba")
          // this.setState({localCurrency: selectedCurrency})
          //     if(prevState.localCurrency!==""){
      if(this.state.product.prices){
        this.state.product.prices.map(price=>{
          if(price.currency.label===selectedCurrency){
            this.setState({price: `${price.currency.symbol}${price.amount}`})
          }
        })
      }
    
          
          return (
            <div>
              <h1>{product.brand}</h1>
              <h2>{product.name}</h2>
              <div>{attributesElements}</div>
              <h3>Price:</h3>
              <h3>{this.state.price}</h3>
            </div>
          )
        }}
      </CurrencyConsumer>
    )
  }
}

export default withRouter(ProductDetails)
