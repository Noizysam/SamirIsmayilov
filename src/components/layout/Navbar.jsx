import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import  Logo  from '../images/logo.png'
import  Arrow  from '../images/arrowDown.png'
import  Cart  from '../images/cart.png'
import CartProductItem from '../products/CartProductItem'

const CURRENCIES_QUERY = `
{
   currencies {
      label
      symbol
   }
   category {
      products {
         prices {
            amount
            currency {
               symbol
            }
         }
      }
   }
}
`

export class Navbar extends Component {
   constructor() {
      super();
      this.state = {
         symbols: [],
         labels: [],
         currentCurrency: '$',
         cartDropdownActive: false,
         total: {},
         totalValue: 0
      }
   }
   


   /* Fetching data with currencies' attributes, and setting them into our states */
   componentDidMount() {
      fetch("http://localhost:4000/", {
         method: "POST",
         headers: { "Content-Type": "application/json"},
         body: JSON.stringify({ query: CURRENCIES_QUERY})
      })
      .then((response) => response.json())
      .then(currenciesObject => {
         this.setState({symbols: currenciesObject.data.currencies.map(obj => obj["symbol"] ), labels: currenciesObject.data.currencies.map(obj => obj["label"])})
      })

      
   }


   /* onClick function for cart overlay */
   openOverlay = () => {
      if (this.state.cartDropdownActive) {
         this.setState({cartDropdownActive: false})
      } else {
         this.setState({cartDropdownActive: true})
      }

   }

   setNewCurrencie = (e) => {
      localStorage.setItem('currentCurrency', e.target.value)
      this.setState({currentCurrency: localStorage.getItem('currentCurrency')})
      this.props.sendData(localStorage.getItem('currentCurrency'))

         
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
      <nav className='navbar'>
         <div className="container">
            <div className="content">
               <div className="category-of-people">
                  <Link to='/'>
                     Women
                  </Link>
                  <Link to='/'>
                     Men
                  </Link>
                  <Link to='/'>
                     Kids
                  </Link>
               </div>
               <div className="logo">
                  <img src={Logo} alt="" />
               </div>
               <div className="currency-switcher">
                  <button  className="currency-swithcer-btn">
                     {this.state.currentCurrency} <img src={Arrow} alt="" />
                  </button>
                  <div className="currency-switcher-dropdown">
                     {this.state.symbols.map ((item, idx) => {
         return (
            <div key={idx} style={{backgroundColor: (this.state.currentCurrency === this.state.symbols[idx]) && '#d3d3d3'}} className="currency-switcher-dropdown-button">
               <button onClick={this.setNewCurrencie} href='#'  value={this.state.symbols[idx]} >{this.state.symbols[idx]} {this.state.labels[idx]}</button>
            </div>
            
         )
      })}
                  </div>
               </div>
               <div className="cart-overlay">
                  <button className="cart-overlay-btn" onClick={this.openOverlay}>
                     <img src={Cart} alt="" />
                     <div className="cart-overlay-btn-amount-info">{this.props.boughtItems.length}</div>

                  </button>
                  <div className="card-overlay-view" style={{display: this.state.cartDropdownActive ? 'block' : 'none'}}>
                     <div className='card-overlay-view-content'>
                        <p>My bag, {this.props.boughtItems.length} items</p>
                        {this.props.boughtItems.map(item => {
                           return (
                              <>
                              <div className='card-overlay-view-content-delete'>
                                 <button onClick={() => this.props.getDeletedItem(item)}>Remove Item</button>
                              </div>
                              <CartProductItem key={item} item = {item} currentCurrency = {this.state.currentCurrency} getPriceForTotal = {this.getPriceForTotal} />
                              </>
                           )
                        })}
                        <div className="card-overlay-view-content-totalprice">Total: {Object.keys(this.state.total).map(key => {
                           val+= this.state.total[key]
                           val = Math.round(val * 100) / 100
                           return null})}{this.state.currentCurrency}{val}</div>
                        <div className="card-overlay-view-content-buttons">
                              <Link onClick={() => this.setState({cartDropdownActive: false})} className='card-overlay-view-content-buttons-viewbag-link' to='/cart'>
                                 <div className="card-overlay-view-content-buttons-viewbag">
                                    View bag
                                 </div>
                              </Link>
                              <Link onClick={() => this.setState({cartDropdownActive: false})} className='card-overlay-view-content-buttons-checkout-link' to='/checkout'>
                                 <div className="card-overlay-view-content-buttons-checkout">
                                    Check out
                                 </div>
                              </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </nav>
      )
   }
}

export default Navbar