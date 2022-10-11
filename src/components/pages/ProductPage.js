import React, { Component } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Product from '../Product';
import { CurencyContext } from '../../context/CurrencyContext';
import { CartContext } from '../../context/CartContext';


const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
}); 



export default class ProductPage extends Component {

    state = {
        products : []
    }
    
    componentDidMount() {
      this.getProducts()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.category !== this.props.category){
            this.getProducts()
        }
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
    
    
    render() {
    const categoryProducts = this.state.products.map(item=>(
        <Product 
        key={item.id}
        {...item}
        selectedCurrency={this.context.selectedCurrency}
        />
    ))
    
    return (
      <div className='product-list'>
        {categoryProducts}
        {this.props.pageState==="miniCart" ? <h1>MiniCart</h1> : <></>}
        </div>
    )
  }
}

ProductPage.contextType = CurencyContext;