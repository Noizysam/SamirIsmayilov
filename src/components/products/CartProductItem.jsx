import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class CartProductItem extends Component {
   constructor() {
      super();
      this.state = {
         amount: 1,
         currentCurrencyValue: 0,
         totalValue: 0,
         id: '',
         photoIndex: 0
      }
   }

   componentDidMount () {
      this.setState({id: this.props.item.productInfo.id})
      this.props.item.productInfo.prices.map(currency => {
         if (currency.currency.symbol === this.props.currentCurrency) {
            this.setState({currentCurrencyValue: currency.amount})
            this.setState({totalValue: this.state.amount * currency.amount})
            this.props.getPriceForTotal ({amount : this.state.amount * currency.amount, 
               id : [`${this.props.item.productInfo.id}${this.props.item.chosenAttributes[Object.keys(this.props.item.chosenAttributes)[0]]}`]})
            this.props.getAmount ({amount: this.state.amount, 
               id: [`${this.props.item.productInfo.id}${this.props.item.chosenAttributes[Object.keys(this.props.item.chosenAttributes)[0]]}`]})
         }
      return ''}
         )
   }

   /* Get previous photo */
   previousPhoto = () => {
      this.setState({photoIndex: this.state.photoIndex - 1})
   }

   /* Get next photo */
   nextPhoto = () => {
      this.setState({photoIndex: this.state.photoIndex + 1})
   }

   /* Increase amount of item */
   increaseButton = () => {
      this.setState({amount: this.state.amount + 1})
      this.setState({totalValue: (this.state.amount + 1) * this.state.currentCurrencyValue})
      this.props.getPriceForTotal ({amount : (this.state.amount + 1) * this.state.currentCurrencyValue, 
         id : [`${this.props.item.productInfo.id}${this.props.item.chosenAttributes[Object.keys(this.props.item.chosenAttributes)[0]]}`]})
      this.props.getAmount ({amount: (this.state.amount + 1), 
         id: [`${this.props.item.productInfo.id}${this.props.item.chosenAttributes[Object.keys(this.props.item.chosenAttributes)[0]]}`]})
      }

   /* Decrease amount of item */
   decreaseButton = () => {
      this.setState({amount: this.state.amount - 1})
      this.setState({totalValue: (this.state.amount - 1) * this.state.currentCurrencyValue})
      this.props.getPriceForTotal ({amount : (this.state.amount - 1) * this.state.currentCurrencyValue, 
         id : [`${this.props.item.productInfo.id}${this.props.item.chosenAttributes[Object.keys(this.props.item.chosenAttributes)[0]]}`]})
      this.props.getAmount ({amount: (this.state.amount - 1), 
         id: [`${this.props.item.productInfo.id}${this.props.item.chosenAttributes[Object.keys(this.props.item.chosenAttributes)[0]]}`]})
      }


   render() {
      /* Get the current currency value */
      const productPrice = React.Children.toArray (this.props.item.productInfo.prices.map(currencies => {
         if (currencies.currency.symbol === this.props.currentCurrency) {
            return (<div key={currencies}  
               className='card-overlay-view-content-item-info-price-value'><p>
                  {currencies.currency.symbol}{this.state.currentCurrencyValue}</p></div>)
         }
         return null}))
      
      /* Attribute values */
      const productAttributes = React.Children.toArray (Object.keys(this.props.item.chosenAttributes).map(key => (<div key={key} 
         className='card-overlay-view-content-item-info-attribute'>
            <div className="card-overlay-view-content-item-info-attribute-name"><p>{key}</p></div>
            {key === 'Color' ? (<div className='card-overlay-view-content-item-info-attribute-value-color' 
            style={{backgroundColor: this.props.item.chosenAttributes[`${key}`]}}></div>) : 
            (<div className="card-overlay-view-content-item-info-attribute-value">
               {(this.props.item.chosenAttributes[`${key}`])}</div>)}
         </div>)))
      

      return (
         <div className='card-overlay-view-content-item'>
            <div className="card-overlay-view-content-item-info">
               <Link className='card-overlay-view-content-item-info-link' to={`/product/${this.state.id}`}>
               <div className="card-overlay-view-content-item-info-brand">
                  <p>{this.props.item.productInfo.brand}</p>
               </div>
               <div className="card-overlay-view-content-item-info-name">
                  <p>{this.props.item.productInfo.name}</p>
               </div>
               <div className="card-overlay-view-content-item-info-price">
                  {productPrice}
               </div>
               <div className="card-overlay-view-content-item-info-attributes">
                  {productAttributes}
               </div>
               </Link>
            </div>
            <div className="card-overlay-view-content-item-amount">
                  <button onClick={this.increaseButton}><div className="card-overlay-view-content-item-amount-increase">+</div></button>
               <div className="card-overlay-view-content-item-amount-value">
                  <p>{this.state.amount}</p>
               </div>
                  <button disabled={(this.state.amount === 1) && true} 
                  style={{opacity: (this.state.amount === 1) && '50%', cursor: (this.state.amount === 1) && 'default'}} onClick={this.decreaseButton}><div className="card-overlay-view-content-item-amount-decrease">-</div>
                     </button>
            </div>
            <div className="card-overlay-view-content-item-gallery">
               <div className="card-overlay-view-content-item-gallery-photo">
                  <div className="card-overlay-view-content-item-gallery-photo-buttons">
                     <div className="card-overlay-view-content-item-gallery-photo-buttons-back">
                        <button disabled={(this.state.photoIndex === 0) ? true : false } onClick={this.previousPhoto}>&lt;</button>
                     </div>
                     <div className="card-overlay-view-content-item-gallery-photo-buttons-forward">
                        <button disabled={((this.props.item.productInfo.gallery.length - 1) === (this.state.photoIndex)) ? true : false } 
                        onClick={this.nextPhoto}>&gt;</button>
                     </div>
                  </div>
                  
                  <img src={this.props.item.productInfo.gallery[this.state.photoIndex]} alt="" />
               </div>
            </div>
         </div>
      )
   }
}

export default CartProductItem