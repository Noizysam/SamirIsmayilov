import React, { Component } from 'react'
import ProductsList from '../components/products/ProductsList'

const CATEGORIES_QUERY = `
{
   categories {
      name
   }
}`

export class Category extends Component {
   constructor() {
      super();
      this.chooseCategory = this.chooseCategory.bind(this)
      this.state = {
         categoriesList: [],
         chosenCategory: 'all'
      }
   }

   componentDidMount() {
      fetch("http://localhost:4000/", {
         method: "POST",
         headers: { "Content-Type": "application/json"},
         body: JSON.stringify({ query: CATEGORIES_QUERY})
      })
      .then((response) => response.json())
      .then(categoriesObj => {
         this.setState({categoriesList: categoriesObj.data.categories.map(category => category.name)})

      })


   }

   chooseCategory(e) {
      this.setState({chosenCategory: e.target.value})
   }

   render() {
      return (
      <div>
         <div className="container">
            <div className="categories">
               <div className="categories-header">
                  <h1>Category name</h1>
               </div>
               <div className="categories-buttons">
                  {this.state.categoriesList.map(category => (
                     <button key={category} className={this.state.chosenCategory === category && 'active'} onClick={this.chooseCategory} value={category}>{category.toUpperCase()}</button>
                  ))}
               </div>
            </div>
            <div className="item-list">
               <ProductsList currentCurrency={this.props.currentCurrency} chosenCategory={this.state.chosenCategory} getData = {this.props.getData} />
            </div>
         </div>
      </div>
      )
   }
}

export default Category