import React, { Component } from 'react'
import CartProductItem from '../components/products/CartProductItem'
import { Link } from 'react-router-dom'

export class Cart extends Component {
   constructor() {
      super();
      this.state = {
         total: []
      }
   }

   getPriceForTotal = price => {
      this.setState(prevState => ({total: {...prevState.total, [`${price.id}`]: price.amount}}))
      Object.keys(this.state.total).map(key => {
         this.setState({totalValue: 0 + this.state.total[key]})
         return null
      })
   }



   render() {
      let val = 0
      return (
         <div className='cart-page'>
            <div className="container">
               <div className="back-button">
                  <Link to='/' className='back-to-menu-link'>&lt;Back to main page</Link>
               </div>
               <div className="cart-page-header">
                  <h1>Cart</h1>
               </div>
               <div className="cart-page-items">
               {this.props.boughtItems.map(item => {
                  return (
                     <>
                     <div className='card-overlay-view-content-delete'>
                        <button onClick={() => this.props.getDeletedItem(item)}>Remove Item</button>
                     </div>
                     <CartProductItem item = {item} currentCurrency = {this.props.currentCurrency} getPriceForTotal = {this.getPriceForTotal}  />
                     </>
                  )
               })}
               </div>
               <div className="card-overlay-view-content-totalprice">Total: {Object.keys(this.state.total).map(key => {
                           val+= this.state.total[key]
                           val = Math.round(val * 100) / 100
                           return null})}{this.state.currentCurrency}{val}</div>
               <Link onClick={() => this.setState({cartDropdownActive: false})} className='card-overlay-view-content-buttons-checkout-link' to='/checkout'><div className="card-overlay-view-content-buttons-checkout">Check out</div></Link>
            </div>
         </div>
      )
   }
}

export default Cart