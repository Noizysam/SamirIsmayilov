import React, { Component } from 'react'
import  Logo  from '../images/logo.png'
import  Arrow  from '../images/arrowDown.png'
import Currency from '../currencies/Currency'
import CartOverlay from '../products/CartOverlay'

const CURRENCIES_QUERY = `
{
   categories {
      name
   }
   currencies {
      label
      symbol
   }
}
`

export class Navbar extends Component {
   constructor() {
      super();
      this.state = {
         symbols: [],
         labels: [],
         categoriesList: [],
         chosenCategory: 'all',
         currentCurrency: '$',
         isCurrencyHighlighted: false,
         isCurrencyDropdownActive: false,
      }
      this.box = React.createRef()
   }
   


   /* Fetching data with currencies' attributes, and setting them into our states */
   componentDidMount() {
      fetch("http://localhost:4000/", {
         method: "POST",
         headers: { "Content-Type": "application/json"},
         body: JSON.stringify({ query: CURRENCIES_QUERY})
      })
      .then((response) => response.json())
      .then(infoObject => {
         this.setState({symbols: infoObject.data.currencies.map(obj => obj["symbol"] ), 
         labels: infoObject.data.currencies.map(obj => obj["label"]), 
         categoriesList: infoObject.data.categories.map(category => category.name)})
      })

   }


   /* Set new currencie */
   setNewCurrencie = (e) => {
      localStorage.setItem('currentCurrency', e.target.value)
      this.setState({currentCurrency: localStorage.getItem('currentCurrency')})
      this.props.sendData(localStorage.getItem('currentCurrency'))
   }


   /* Change category */
   changeCategory = (e) => {
      this.setState({chosenCategory: e.target.value})
      this.props.getCurrentCategory(e.target.value)
   }

   /* Activate currency dropdown */
   activateCurrencyDropdown = () => {
      this.setState({isCurrencyDropdownActive: true})
   }

   /* Close currency dropdown */
   deactivateCurrencyDropdown = () => {
      this.setState({isCurrencyDropdownActive: false})
   }



   render() {
      /* Currency switcher dropdown */
      const currencySwitcherDropdown =  this.state.symbols.map ((item, idx) => {
         return (
            <Currency key = {item} idx = {idx} currentCurrency = {this.state.currentCurrency} symbols = {this.state.symbols} 
            labels = {this.state.labels} setNewCurrencie = {this.setNewCurrencie} />
            )
         })
      /* Categories on navigation bar */
      const categories = this.state.categoriesList.map (category => {
         return (
            <div key={category} className='category'>
               <button style = {{color: (this.state.chosenCategory === category) && '#5ECE7B', 
               borderBottom: ((this.state.chosenCategory === category)) && '2px solid #5ECE7B'}} 
               value = {category} onClick = {this.changeCategory} className='category-button'>{category}</button>
            </div>
         )
      })
      
      return (
      <nav className='navbar'>
         <div className="container">
            <div className="content">
               <div className="category-of-people">
                  {categories}
               </div>
               <div className="logo">
                  <img src={Logo} alt="" />
               </div>
               <div className="currency-switcher" onMouseEnter={this.activateCurrencyDropdown} 
               onMouseLeave={this.deactivateCurrencyDropdown}>
                  <button  className="currency-swithcer-btn">
                     {this.state.currentCurrency} <img src={Arrow} alt="" />
                  </button>
                  <div onClick={() => this.setState({isCurrencyDropdownActive: false})} className="currency-switcher-dropdown" 
                  style={{display: (this.state.isCurrencyDropdownActive) ? 'block' : 'none'}}>
                     {currencySwitcherDropdown}
                  </div>
               </div>
               <div ref={this.box}>
                  <CartOverlay getTotalQuantity={this.props.getTotalQuantity}  
                  totalQuantity = {this.props.totalQuantity} boughtItems = {this.props.boughtItems} 
                  getDeletedItem = {this.props.getDeletedItem} currentCurrency = {this.state.currentCurrency} 
                  getIfCartOverlayActive = {this.props.getIfCartOverlayActive} isClickedOutside = {this.state.isClickedOutside} 
                  getTotalPrice={this.props.getTotalPrice} totalPrice={this.props.totalPrice} />
               </div>
            </div>
         </div>
      </nav>
      )
   }
}

export default Navbar