import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class CartProductItem extends Component {
   constructor() {
      super();
      this.state = {
         amount: 1,
         currentCurrencyValue: 0,
         totalValue: 0,
         id: ''
      }
   }

   componentDidMount () {
      this.setState({id: this.props.item.productInfo.id})
      console.log('LOX')
      this.props.item.productInfo.prices.map(currency => {
         if (currency.currency.symbol === this.props.currentCurrency) {
            this.setState({currentCurrencyValue: currency.amount})
            this.setState({totalValue: this.state.amount * currency.amount})
            this.props.getPriceForTotal ({amount : this.state.amount * currency.amount, id : [`${this.props.item.productInfo.id}${this.props.item.chosenAttributes[Object.keys(this.props.item.chosenAttributes)[0]]}`]})
         }
      return ''}
         )
   }




   render() {
      return (
         <div className='card-overlay-view-content-item'>
            <div className="card-overlay-view-content-item"></div>
            <div className="card-overlay-view-content-item-info">
               <Link className='card-overlay-view-content-item-info-link' to={`/product/${this.state.id}`}>
               <div className="card-overlay-view-content-item-info-brand">
                  <p>{this.props.item.productInfo.brand}</p>
               </div>
               <div className="card-overlay-view-content-item-info-name">
                  <p>{this.props.item.productInfo.name}</p>
               </div>
               <div className="card-overlay-view-content-item-info-price">
                  {this.props.item.productInfo.prices.map(currencies => {
                     if (currencies.currency.symbol === this.props.currentCurrency) {
                        return (<div key={currencies} className={currencies.currency} className='card-overlay-view-content-item-info-price-value'><p>{currencies.currency.symbol}{this.state.totalValue}</p></div>)
                     }
                     return null})}
               </div>
               <div className="card-overlay-view-content-item-info-attributes">
                  { Object.keys(this.props.item.chosenAttributes).map(key => (<div key={key} className='card-overlay-view-content-item-info-attribute'>
                     <div className="card-overlay-view-content-item-info-attribute-name"><p>{key}</p></div>
                     {key === 'Color' ? (<div className='card-overlay-view-content-item-info-attribute-value-color' style={{backgroundColor: this.props.item.chosenAttributes[`${key}`]}}></div>) : (<div className="card-overlay-view-content-item-info-attribute-value">{(this.props.item.chosenAttributes[`${key}`])}</div>)}
                  </div>))  }
               </div>
               </Link>
            </div>
            <div className="card-overlay-view-content-item-amount">
                  <button onClick={() => {
                     this.setState({amount: this.state.amount + 1})
                     this.setState({totalValue: (this.state.amount + 1) * this.state.currentCurrencyValue})
                     this.props.getPriceForTotal ({amount : (this.state.amount + 1) * this.state.currentCurrencyValue, id : [`${this.props.item.productInfo.id}${this.props.item.chosenAttributes[Object.keys(this.props.item.chosenAttributes)[0]]}`]})
                     }}><div className="card-overlay-view-content-item-amount-increase">+</div></button>
               <div className="card-overlay-view-content-item-amount-value">
                  <p>{this.state.amount}</p>
               </div>
                  <button disabled={(this.state.amount === 1) && true} style={{opacity: (this.state.amount === 1) && '50%', cursor: (this.state.amount === 1) && 'default'}} onClick={() => {
                     this.setState({amount: this.state.amount - 1})
                     this.setState({totalValue: (this.state.amount - 1) * this.state.currentCurrencyValue})
                     this.props.getPriceForTotal ({amount : (this.state.amount - 1) * this.state.currentCurrencyValue, id : [`${this.props.item.productInfo.id}${this.props.item.chosenAttributes[Object.keys(this.props.item.chosenAttributes)[0]]}`]})
                     }}><div className="card-overlay-view-content-item-amount-decrease">-</div>
                     </button>
            </div>
            <div className="card-overlay-view-content-item-gallery">
               <div className="card-overlay-view-content-item-gallery-photo">
                  <img src={this.props.item.productInfo.gallery[0]} alt="" />
               </div>
            </div>
         </div>
      )
   }
}

export default CartProductItem