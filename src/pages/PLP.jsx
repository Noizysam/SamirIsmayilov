import React, { Component } from 'react'
import ProductsList from '../components/products/ProductsList'


export class Category extends Component {
   constructor() {
      super();
      this.chooseCategory = this.chooseCategory.bind(this)
      this.state = {
         categoriesList: [],
         chosenCategory: 'all'
      }
   }


   /* Getting chosen category value */
   chooseCategory(e) {
      this.setState({chosenCategory: e.target.value})
   }

   render() {
      return (
      <div>
         <div className="container">
            <div className="categories">
               <div className="categories-header">
                  <h1 style={{textTransform: 'uppercase', fontWeight: '400'}}>{this.props.currentCategory}</h1>
               </div>
            </div>
            <div className="item-list">
               <ProductsList currentCurrency={this.props.currentCurrency} 
               currentCategory={this.props.currentCategory} getData = {this.props.getData} getBoughtItem = {this.props.getBoughtItem} />
            </div>
         </div>
      </div>
      )
   }
}

export default Category