import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cart from '../images/cart.png'

export class ProductItem extends Component {
   constructor() {
      super()
      this.handleMouseEnter = this.handleMouseEnter.bind(this)
      this.handleMouseLeave = this.handleMouseLeave.bind(this)
      this.addProductWithoutAttributes = this.addProductWithoutAttributes.bind(this)
      this.state = {
         hover: false,
         isItemWindowOpened: false
      }
   }

   componentDidMount () {
      this.props.getData(this.props.product)
   }


   /* Is cursor on product item element */
   handleMouseEnter () {
      this.setState({hover: true})
   }

   /* Is cursor on product item element */
   handleMouseLeave () {
      this.setState({hover: false})
   }
   
   addProductWithoutAttributes () {
      if (this.props.product.attributes.length === 0) {
         const boughtItem = {}
         boughtItem.productInfo = this.props.product
         boughtItem.chosenAttributes = {}
         boughtItem.amount = 1
         this.setState({boughtItem: boughtItem})
         this.props.getBoughtItem(boughtItem)
         alert('Item was added to your cart succesfully!')
         
      }
   }


   render() {
      /* Getting symbol and value of chosen currency */
      const productPrice = React.Children.toArray (this.props.product.prices.map(currencyInfo => {
         if (currencyInfo.currency.symbol === this.props.currentCurrency) {
            return (
               <p>{currencyInfo.currency.symbol}{currencyInfo.amount}</p>
            )
         }
         return null
      }))

      return (
      <div className='product' style={{opacity: !this.props.product.inStock && "50%"}}>
         <div onClick={this.addProductWithoutAttributes} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} 
         style={{display: (this.state.hover) ? 'block' : 'none'}} className='product-info-img-button-logo'>
            <img src={Cart} alt="" />
         </div>

         <div className="container">
            <Link to={`/product/${this.props.product.id}`} style={{ textDecoration: 'none' }} onClick={() => {
               this.props.getData(this.props.product)
               localStorage.setItem('chosenItem', JSON.stringify(this.props.product))}}>
               <div className="product-info" style={{boxShadow: (this.state.hover) && 'rgba(0, 0, 0, 0.35) 0px 3px 6px'}} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                  <div className="product-info-img">
                     <button disabled={!this.props.product.inStock ? true : false} 
                     style={{display: (this.state.hover) ? 'block' : 'none'}} className="product-info-img-button">
                     </button>
                     <img src={this.props.product.gallery[0]} alt="" />
                     <div className="product-info-out-of-stock">
                        {!this.props.product.inStock && (<p className='product-info-out-of-stock'>OUT OF STOCK</p>)}
                     </div>
                  </div>
                  <div className="product-info-name">
                     <p>{this.props.product.brand}</p>
                     <p>{this.props.product.name}</p>
                  </div>
                  <div className="product-price">
                     {productPrice}
                  </div>
               </div>
            </Link>
         </div>
      </div>
      )
   }
}

export default ProductItem