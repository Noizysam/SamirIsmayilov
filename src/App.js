import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import PLP from './pages/PLP';
import PDP from './pages/PDP';
import Cart from './pages/Cart';


class App extends React.Component {
  constructor() {
    super();
    this.getDataFromChild = this.getDataFromChild.bind(this)
    this.getDataFromChild2 = this.getDataFromChild2.bind(this)
    this.getDeletedItem = this.getDeletedItem.bind(this)
    this.state = {
      currentCurrency: '$',
      productInfo: [],
      boughtItems: [],
      deletedItem: null,
      boughtItemsClone: [],
      currentCategory: 'all',
      amountFromCart: 0,
      isCartOverlayActive: false
    };
  }

  /* Getting current currency from child component */
  getDataFromChild = val => {
    this.setState({currentCurrency: val})
  }

  /* Getting item that we chose in PLP */
  getDataFromChild2 = val => {
    this.setState({productInfo: JSON.parse(localStorage.getItem('chosenItem'))})
  }

  /* Getting bought items */ 
  getDataFromChild3 = val => {
    if (this.state.boughtItems.some (e => e.chosenAttributes === val.chosenAttributes)) {
    } else {
      this.setState(prevState => ({boughtItems: [...prevState.boughtItems, val]}))
    }

  }
  


  /* Getting items that we want to delete */
  getDeletedItem = val => {
    this.setState({deletedItem: val})
    this.setState({boughtItemsClone: this.state.boughtItems.filter(function(item) {return item !== val} )})
    this.setState({boughtItems: this.state.boughtItems.filter(function(item) {return item !== val} )})
  }


  /* Getting a category that we chose */
  getCurrentCategory = category => {
    this.setState({currentCategory: category})
  }


  /* To get info about cart overlay status. If it is active, then everything except navbar and cart overlay
   become dark */
  getIfCartOverlayActive = boolean => {
    this.setState({isCartOverlayActive: boolean})
  }



  render() {
    return (
    <div className="App">
      <Router>
        <div>
          <Navbar sendData = {this.getDataFromChild} boughtItems = {this.state.boughtItems} getDeletedItem = {this.getDeletedItem.bind(this)} 
          getCurrentCategory = {this.getCurrentCategory} getIfCartOverlayActive = {this.getIfCartOverlayActive} />
          <main style={{backgroundColor: (this.state.isCartOverlayActive) && 'rgba(57, 55, 72, 0.22)', 
          filter: (this.state.isCartOverlayActive) && 'brightness(82%)'} }>
            <Routes>
              <Route path='/' element={<PLP currentCurrency={this.state.currentCurrency} getData = {this.getDataFromChild2} 
              currentCategory={this.state.currentCategory} getBoughtItem = {this.getDataFromChild3} />} />
              <Route path='/product/:id' element={<PDP currentCurrency={this.state.currentCurrency} productInfo={this.state.productInfo} 
              getData = {this.getDataFromChild3} />} />
              <Route path='/cart' element={<Cart currentCurrency={this.state.currentCurrency} boughtItems = {this.state.boughtItems} 
              getDeletedItem={this.getDeletedItem.bind(this)} />}  />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
    )};
}

export default App;
