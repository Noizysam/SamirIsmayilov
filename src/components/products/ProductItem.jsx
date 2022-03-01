import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cart from '../images/cart.png'

export class ProductItem extends Component {
   constructor() {
      super()
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this)
      this.state = {
         hover: false,
         isItemWindowOpened: false
      }
   }

   handleMouseEnter () {
      this.setState({hover: true})
      console.log('mouse enter')
   }

   handleMouseLeave () {
      this.setState({hover: false})
      console.log('mouse leave')
   }

   render() {
      return (
      <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className='product' style={{opacity: !this.props.product.inStock && "50%"}}>
         <div className="container">
            <Link to={`/product/${this.props.product.id}`} style={{ textDecoration: 'none' }} onClick={() => this.props.getData(this.props.product)}>
               <div className="product-info">
                  <div className="product-info-img">
                     <button disabled={!this.props.product.inStock ? true : false} style={{display: (this.state.hover) ? 'block' : 'none'}} className="product-info-img-button">
                        <div className='product-info-img-button-logo'>
                           <img src={Cart} alt="" />
                        </div>
                     </button>
                     <img src={this.props.product.gallery[0]} alt="" />
                     <div className="product-info-out-of-stock">
                        {!this.props.product.inStock && (<p className='product-info-out-of-stock'>OUT OF STOCK</p>)}
                     </div>
                  </div>
                  <div className="product-info-name">
                     <p>{this.props.product.name}</p>
                  </div>
                  <div className="product-price">
                     {this.props.product.prices.map(currencyInfo => {
                        if (currencyInfo.currency.symbol === this.props.currentCurrency) {
                           console.log(this.props.product)
                           return (
                              <p key ={currencyInfo}>{currencyInfo.currency.symbol}{currencyInfo.amount}</p>
                           )
                        }
                        return null
                     }) }
                  </div>
               </div>
            </Link>
         </div>
      </div>
      )
   }
}

export default ProductItem