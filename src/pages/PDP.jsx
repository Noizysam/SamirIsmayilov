import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class PDP extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chosenImg: this.props.productInfo.gallery[0],
         chosenAttributes: {},
         addToCartAllowed: false,
         boughtItem: {},
         showNotification: false,
         load: false

      }
   }

   changeChosenImg = (e) => {
      this.setState({chosenImg: e.currentTarget.value})
   }

   onClick = () => {
      const boughtItem = {}
      boughtItem.productInfo = this.props.productInfo
      boughtItem.chosenAttributes = this.state.chosenAttributes
      boughtItem.amount = 1
      this.setState({boughtItem: boughtItem})
      this.props.getData(boughtItem)
      this.setState({showNotification: true})
      setTimeout(() => this.setState({showNotification: false}), 3000)
   }

   componentDidMount(){
      if (window.localStorage.getItem('first'))
         return;
      window.localStorage.setItem('first', true);
      setTimeout(() => {
         this.setState({
            load: true
         })
      }, 4000)
   }


   render() {
      return (
         <div className='container'>
            <div className="back-button">
                  <Link to='/' className='back-to-menu-link'>&lt;Back to main page</Link>
               </div>
            <div className="product-page">
               <div className="product-page-gallery">
                  <div className="product-page-gallery-images">
                     {this.props.productInfo.gallery.map(image => (<button href="#" value={image} onClick={this.changeChosenImg}><img src={image} key={image} alt=''></img></button>))}
                  </div>
                  <div className="product-page-gallery-chosen">
                     <img src={this.state.chosenImg} alt="" />
                  </div>
               </div>
               <div className="product-page-infoo">
               <div className="product-page-info">
                  <div className="product-page-brand">
                     <p>{this.props.productInfo.brand}</p>
                  </div>
                  <div className="product-page-name">
                     <p>{this.props.productInfo.name}</p>
                  </div>
                  <div className="product-page-attributes">
                     {this.props.productInfo.attributes.length > 0 && this.props.productInfo.attributes.map((attribute) => {
                     return (<div key={attribute.name} className='product-page-attribute'>
                        <div key={attribute.name} className="product-page-attribute-name">
                           {attribute.name.toUpperCase()}:
                        </div>
                        <div key={attribute} className='product-page-attribute-values'>
                           {
                           attribute.items.map(value => {
                              let val = value.value
                              
                              return (attribute.name === 'Color' ? (<button key={value.value} value={val} onClick={(e) => {
                                 let currentValue = e.currentTarget.value
                                 this.setState(prevState => ({chosenAttributes: {...prevState.chosenAttributes, [`${attribute.name}`]:currentValue}}))}} className={(value.value === this.state.chosenAttributes[attribute.name]) ? 'product-page-attribute-values-color active-color' : 'product-page-attribute-values-color'} style={{backgroundColor: `${val}` }}></button>) : (<button key={value.value} value={val} onClick={(e) => {
                                    let currentValue = e.currentTarget.value
                                    this.setState(prevState => ({chosenAttributes: {...prevState.chosenAttributes, [`${attribute.name}`]:currentValue}}))}} className={(value.value === this.state.chosenAttributes[attribute.name]) ? 'product-page-attribute-values-noncolor active' : 'product-page-attribute-values-noncolor'} style={{}}>{val}</button>))
                           })}
                        </div>
                     </div>)})
                     } 
                  </div>
                  <div className="product-page-price">
                     <p className='product-page-price-text'>PRICE:</p>
                     {this.props.productInfo.prices.map(currencyInfo => {
                           if (currencyInfo.currency.symbol === this.props.currentCurrency) {
                              return (
                                 <p className="product-page-price-value" key={currencyInfo.currency.symbol}>{currencyInfo.currency.symbol}{currencyInfo.amount}</p>
                              )
                           }
                        return ''}) }
                  </div>
                  <div className="product-page-add-button">
                     <button disabled={(Object.keys(this.state.chosenAttributes).length !== this.props.productInfo.attributes.length) || (!this.props.productInfo.inStock) ? true : false} onClick={this.onClick} style={{opacity: (Object.keys(this.state.chosenAttributes).length !== this.props.productInfo.attributes.length)  || (!this.props.productInfo.inStock) ? '50%' : '100%'}}>ADD TO CART</button>
                  </div>
                  <div className="product-page-notification" style={{display: (this.state.showNotification) ? 'block' : 'none'}}>
                     <p className='product-page-notification-text'>Item added to your cart!</p>
                  </div>
                  <div className="product-page-description">
                     <div>{this.props.productInfo.description.includes('<') ? (<div dangerouslySetInnerHTML={{ __html: this.props.productInfo.description }}></div>) : <div>{this.props.productInfo.description}</div>}</div>
                  </div>
               </div>
            </div>
            </div>
         </div>
      )
   }
}

export default PDP

/* className={`product-page-attribute-${attribute.name.toLowerCase()}`} */