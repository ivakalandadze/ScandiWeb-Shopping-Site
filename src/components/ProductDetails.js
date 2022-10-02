import React, { Component } from 'react'
import Product from './Product'
import withRouter from './withRouter'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Attribute from './Attribute';
import { CurrencyConsumer } from '../context/CurrencyContext';
import { CartConsumer } from '../context/CartContext';

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
            const defaultAttributes = {...choosenAttributes}
            this.setState({product:{...product,choosenAttributes,defaultAttributes}})
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
    
    
    return (
      <CartConsumer>
        {cart=>{
          const {addItemtoCart} = cart;
          return(
            <CurrencyConsumer>
              {currencies=>{
                const {selectedCurrency} = currencies;

                return (
                  <div>
                  {this.state.product.prices ? <ProductInfo  addToCart={addItemtoCart} changeAttribute={this.changeAttribute} currency={selectedCurrency} product={this.state.product} itemId={itemId}/> : <></>}
                  </div>
                )
              }}
            </CurrencyConsumer>
          )
        }}
      </CartConsumer>
    )
  }
}

class ProductInfo extends Component {
  state = {
    price: "",
    mainPhoto: "",
    photos: []
  }

  componentDidMount(){
   this.setPrice()
   this.setPhotos()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.currency!=this.props.currency){
      this.setPrice()
    }
  }

  setPrice = () => {
    if(this.props.product.prices){
      this.props.product.prices.map(price=>{
        if(price.currency.label===this.props.currency){
          this.setState({price: `${price.currency.symbol}${price.amount}`})
        }
      })
    }
  }

  setPhotos = () => {
    this.setState({mainPhoto: this.props.product.gallery[0]})
    this.setState({photos: this.props.product.gallery})
  }

  chooseMainPhoto = (index) => {
    console.log(this.state.photos[index])
    this.setState({mainPhoto: this.state.photos[index]})
  }
  render() {
    console.log("rendered")
    const attributesElements = this.props.product.attributes ?  this.props.product.attributes.map(attribute=>{
      return (
        <div>
          <h3>{attribute.id}</h3>
          <Attribute changeAttribute={this.props.changeAttribute} fromDetails={true} productItem={this.props.product} itemId={this.props.itemId} attribute={attribute}/>
        </div>
      )
    }) : []

    const imgElements = this.state.photos.map((photo,index)=>(
      <button onClick={()=>this.chooseMainPhoto(index)}key={index}><img className='img' src={photo} width="70px" height="70px"/></button>
    ))

    return (
      <div>
        <h1>{this.props.product.brand}</h1>
            <h2>{this.props.product.name}</h2>
            <div>{attributesElements}</div>
            <h3>Price:</h3>
            <h3>{this.state.price}</h3>
            <button onClick={()=>this.props.addToCart(this.props.product, this.state.price)}>Add To Cart</button>
            <div dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
            <button><img className='main-img' src={this.state.mainPhoto} width="200px" height="200px"/></button>
            {imgElements}
      </div>
    )
  }
}


export default withRouter(ProductDetails)
