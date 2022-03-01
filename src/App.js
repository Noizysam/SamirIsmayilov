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
      boughtItemsClone: []
    };
  }


  getDataFromChild = val => {
    this.setState({currentCurrency: val})
  }

  getDataFromChild2 = val => {
    this.setState({productInfo: val})
  }

  getDataFromChild3 = val => {
    if (this.state.boughtItems.some (e => e.chosenAttributes === val.chosenAttributes)) {
    } else {
      this.setState(prevState => ({boughtItems: [...prevState.boughtItems, val]}))
    }

  }

  getDeletedItem = val => {
    this.setState({deletedItem: val})
    this.setState({boughtItemsClone: this.state.boughtItems.filter(function(item) {return item !== val} )})
    this.setState({boughtItems: this.state.boughtItems.filter(function(item) {return item !== val} )})
  }

  render() {
    return (
    <div className="App">
      <Router>
        <div>
          <Navbar sendData = {this.getDataFromChild} boughtItems = {this.state.boughtItems} getDeletedItem={this.getDeletedItem.bind(this)} />
          <main>
            <Routes>
              <Route path='/' element={<PLP currentCurrency={this.state.currentCurrency} getData = {this.getDataFromChild2} />} />
              <Route path='/product/:id' element={<PDP currentCurrency={this.state.currentCurrency} productInfo={this.state.productInfo} getData = {this.getDataFromChild3} />} />
              <Route path='/cart' element={<Cart currentCurrency={this.state.currentCurrency} boughtItems = {this.state.boughtItems} getDeletedItem={this.getDeletedItem.bind(this)} />}  />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
    )};
}

export default App;
