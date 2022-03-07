import React, { Component } from 'react'
import Cart from '../images/cart.png';
import CartProductItem from './CartProductItem';
import { Link } from 'react-router-dom';

export class CartOverlay extends Component {
   constructor() {
      super();
      this.state = {
         cartDropdownActive: false,
         total: {},
         totalQuantity: {},
         totalQuantityValue: 0,
      }
      this.box = React.createRef()
   }

   componentDidMount () {
      document.addEventListener('click', this.handleOutsideClick)

   }

   /* Handle outside click to close cart overlay on click outside */
   handleOutsideClick = (event) => {
      if (this.box && !this.box.current.contains(event.target)) {
         this.setState({cartDropdownActive: false})
         this.props.getIfCartOverlayActive(false)
      }
   }

   /* Open overlay */
   openOverlay = () => {
      if (this.state.cartDropdownActive) {
         this.setState({cartDropdownActive: false})
         this.props.getIfCartOverlayActive(false)
      } else {
         this.setState({cartDropdownActive: true})
         this.props.getIfCartOverlayActive(true)
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

   /* When we press 'view bag' button, then we close cart overlay and removing darkness */
   viewBag = () => {
      this.setState({cartDropdownActive: false})
      this.props.getIfCartOverlayActive(false)
   }

   render() {
      /* Total amount of money */
      let val = 0
      /* Total amount of quantity */
      let quantityVal = 0
      /* Bought items list on cart overlay */
      const CartOverlayItems = React.Children.toArray (this.props.boughtItems.map(item => {
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
               getPriceForTotal = {this.getPriceForTotal} getAmount = {this.getAmount} />
            </>
         )
      }))

      return (
         <div className="cart-overlay" ref={this.box}>
            <button className="cart-overlay-btn" onClick={this.openOverlay}>
               <img src={Cart} alt="" />
               <div className="cart-overlay-btn-amount-info">{Object.keys(this.props.totalQuantity).map(key => {
                  quantityVal+= this.props.totalQuantity[key]
                  return null
               })}{quantityVal}</div>
            </button>
            <div  className="card-overlay-view" style={{display: (this.state.cartDropdownActive) ? 'block' : 'none'}}>
               <div className='card-overlay-view-content'>
                  <p>My bag, {this.props.boughtItems.length} items</p>
                  {CartOverlayItems}
                  <div className="card-overlay-view-content-totalprice">Total: {Object.keys(this.props.totalPrice).map(key => {
                     val+= this.props.totalPrice[key]
                     val = Math.round(val * 100) / 100
                     return null})}{this.props.currentCurrency}{val}</div>
                  <div className="card-overlay-view-content-buttons">
                        <Link onClick={this.viewBag} className='card-overlay-view-content-buttons-viewbag-link' to='/cart'>
                           <div className="card-overlay-view-content-buttons-viewbag">
                              View bag
                           </div>
                        </Link>
                        <Link onClick={() => this.setState({cartDropdownActive: false})} 
                        className='card-overlay-view-content-buttons-checkout-link' to='/checkout'>
                           <div className="card-overlay-view-content-buttons-checkout">
                              Check out
                           </div>
                        </Link>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default CartOverlay