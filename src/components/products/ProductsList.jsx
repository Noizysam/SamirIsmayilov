import React, { Component } from 'react'
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom'

const PRODUCT_QUERY = `
{
   category {
      products {
         inStock
         category
         brand
         name
         gallery
         id
         description
         attributes {
            name
            items {
               value
            }
         }
         prices {
            amount
            currency {
               symbol
               }
            }
         }
      }
   }`

export class ProductsList extends Component {
   constructor() {
      super();
      this.state = {
         productsInfo: [],
         hui: 'samir'
      }
   }

   componentDidMount () {
      fetch("http://localhost:4000/", {
         method: "POST",
         headers: { "Content-Type": "application/json"},
         body: JSON.stringify({ query: PRODUCT_QUERY})
      })
      .then((response) => response.json())
      .then(ItemsInfo => {
         this.setState({productsInfo: ItemsInfo.data.category.products})
      })
   }


   render() {
      return (
      <div className='products-list'>
         {this.state.productsInfo.map(productInfo => (((this.props.chosenCategory === 'all') || (this.props.chosenCategory === productInfo.category)) && (<ProductItem key={productInfo.id} product={productInfo} currentCurrency={this.props.currentCurrency} getData={this.props.getData} />)))}
      </div>
      )
   }
}

export default ProductsList


/* 
{this.state.productsInfo.map(productInfo => {
            (this.props.chosenCategory == 'all' || this.props.chosenCategory == productInfo.category && (
               <ProductItem key={productInfo.id} product={productInfo} currentCurrency={this.props.currentCurrency} />
            ) ) })}
            */