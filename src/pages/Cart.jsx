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

   /* Getting price for total from CartProductItem child */
   getPriceForTotal = price => {
      this.setState(prevState => ({total: {...prevState.total, [`${price.id}`]: price.amount}}))
      setTimeout(() => {
         this.props.getTotalPrice(this.state.total)
         }, 1)
   }

   /* Getting amount for total amount from CartProductItem child */
   getAmount = quantity => {
      this.setState(prevState => ({totalQuantity: {...prevState.totalQuantity, [`${quantity.id}`]: quantity.amount}}))
      setTimeout(() => {
         this.props.getTotalQuantity(this.state.totalQuantity)
         }, 1)
   }

   render() {
      /* Total price */
      let val = 0
      /* Bought items list on Cart page */
      const cartPageItems = React.Children.toArray (this.props.boughtItems.map(item => {
         return (
            <>
            <div className='card-overlay-view-content-delete'>
               <button onClick={() => {
                  this.props.getDeletedItem(item)
                  let totalQuantityObj = this.state.totalQuantity
                  let totalMoneyObj = this.state.total
                  delete totalMoneyObj[`${item.productInfo.id}${item.chosenAttributes[Object.keys(item.chosenAttributes)[0]]}`]
                  delete totalQuantityObj[`${item.productInfo.id}${item.chosenAttributes[Object.keys(item.chosenAttributes)[0]]}`]
                  this.setState({totalQuantity: totalQuantityObj})
                  this.props.getTotalQuantity(totalQuantityObj)
                  }}>Remove Item</button>
            </div>
            <CartProductItem key={item} item = {item} currentCurrency = {this.props.currentCurrency} 
            getPriceForTotal = {this.getPriceForTotal} getAmount={this.getAmount} />
            </>
         )
      }))

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
               {cartPageItems}
               </div>
               <div className="card-overlay-view-content-totalprice">Total: {Object.keys(this.props.totalPrice).map(key => {
                           val+= this.props.totalPrice[key]
                           val = Math.round(val * 100) / 100
                           return null})}{this.state.currentCurrency}{val}</div>
               <Link onClick={() => this.setState({cartDropdownActive: false})} 
               className='card-overlay-view-content-buttons-checkout-link' to='/checkout'><div 
               className="card-overlay-view-content-buttons-checkout">Check out</div></Link>
            </div>
         </div>
      )
   }
}

export default Cart