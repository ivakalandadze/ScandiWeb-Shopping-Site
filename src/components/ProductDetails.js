import React, { Component } from 'react'
import Product from './Product'
import withRouter from './withRouter'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Attribute from './Attribute';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

class ProductDetails extends Component {
  state ={
    product: {}
  }
  componentDidMount(){
    this.getProducts(this.props.params.id)
  }
  
  getProducts = (id) =>{
    client
          .query({
              query: gql`
              query Query($productId: String!) {
                product(id: $productId) {
                  name
                  id
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
                  brand
                }
              }
              `,
              variables: {
                 "productId": id
              }
          })
          .then(result=>{
            const product = {...result.data.product}
            const choosenAtributes = {}
              product.attributes.forEach(attribute=>{
                choosenAtributes[attribute.id] = attribute.items[0]
              })
            this.setState({product:{...product,choosenAtributes}})
          })
  }
  render() {
    const itemId=this.props.params.id
    const product = this.state.product
    const attributesElements = product.attributes ?  product.attributes.map(attribute=>(
      <Attribute productItem={product} itemId={itemId} attribute={attribute}/>
    )) : []
    return (
      <div>
        <h1>{product.brand}</h1>
        <h2>{product.name}</h2>
        <div>{attributesElements}</div>
      </div>
    )
  }
}

export default withRouter(ProductDetails)
