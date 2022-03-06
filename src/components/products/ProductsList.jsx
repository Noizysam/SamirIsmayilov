import React, { Component } from 'react'
import ProductItem from './ProductItem';

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
      const productList = React.Children.toArray (this.state.productsInfo.map(productInfo => (((this.props.currentCategory === 'all') || 
      (this.props.currentCategory === productInfo.category)) && (<ProductItem key={productInfo.id} product={productInfo} 
      currentCurrency={this.props.currentCurrency} getData={this.props.getData} getBoughtItem = {this.props.getBoughtItem} />))))

      return (
      <div className='products-list'>
         {productList}
      </div>
      )
   }
}

export default ProductsList

