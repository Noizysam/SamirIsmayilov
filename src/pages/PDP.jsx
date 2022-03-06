import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DOMPurify from "dompurify";


export class PDP extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chosenImg: '',
         chosenAttributes: {},
         addToCartAllowed: false,
         boughtItem: {},
         showNotification: false,
         load: false,
         render: false,
         productInfo: JSON.parse(localStorage.getItem('chosenItem'))

      }
   }

   changeChosenImg = (e) => {
      this.setState({chosenImg: e.currentTarget.value})
   }

   /* Add item to cart list and show notification about succesful operation */
   buyItem = () => {
      const boughtItem = {}
      boughtItem.productInfo = this.state.productInfo
      boughtItem.chosenAttributes = this.state.chosenAttributes
      boughtItem.amount = 1
      this.setState({boughtItem: boughtItem})
      this.props.getData(boughtItem)
      this.setState({showNotification: true})
      setTimeout(() => this.setState({showNotification: false}), 3000)
   }

   componentDidMount(){
      this.setState({chosenImg: this.state.productInfo.gallery[0]})
   }


   render() {
      /* List of images */
      const galleryImages = React.Children.toArray (this.state.productInfo.gallery.map(image => 
         (<button href="#" value={image} onClick={this.changeChosenImg}><img src={image}  alt=''></img></button>)))

      /* Show all attributes */
      const productPageAttributes = React.Children.toArray (this.state.productInfo.attributes.length > 0 && 
         React.Children.toArray (this.state.productInfo.attributes.map((attribute) => {
      return (<div  className='product-page-attribute'>
         <div className="product-page-attribute-name">
            {attribute.name.toUpperCase()}:
         </div>
         <div className='product-page-attribute-values'>
            {
            attribute.items.map(value => {
               let val = value.value
               return (attribute.name === 'Color' ? (<button key={val} value={val} 
                  onClick={(e) => {
                  let currentValue = e.currentTarget.value
                  this.setState(prevState => ({
                     chosenAttributes: {...prevState.chosenAttributes, [`${attribute.name}`]:currentValue}}))}} 
                  className={(value.value === this.state.chosenAttributes[attribute.name]) ? 
                     'product-page-attribute-values-color active-color' : 'product-page-attribute-values-color'} 
                     style={{backgroundColor: `${val}` }}></button>) : (<button key={value.value} value={val} onClick={(e) => {
                     let currentValue = e.currentTarget.value
                     this.setState(prevState => ({chosenAttributes: {...prevState.chosenAttributes, [`${attribute.name}`]:currentValue}}))}} 
                     className={(value.value === this.state.chosenAttributes[attribute.name]) ? 
                        'product-page-attribute-values-noncolor active' : 'product-page-attribute-values-noncolor'} style={{}}>{val}</button>))
            })}
         </div>
      </div>)})))

      /* Show actual price of chosen currency */
      const productPagePrice = React.Children.toArray (this.state.productInfo.prices.map(currencyInfo => {
         if (currencyInfo.currency.symbol === this.props.currentCurrency) {
            return (
               <p className="product-page-price-value" 
               key={currencyInfo.currency.symbol}>{currencyInfo.currency.symbol}{currencyInfo.amount}</p>
            )
         }
      return ''}))

      return (
         <div className='container'>
            <div className="back-button" key={this.state.productInfo.id}>
               <Link to='/' className='back-to-menu-link'>&lt;Back to main page</Link>
            </div>
            <div className="product-page">
               <div className="product-page-gallery">
                  <div className="product-page-gallery-images">
                     {galleryImages}
                  </div>
                  <div className="product-page-gallery-chosen" style={{opacity: !this.state.productInfo.inStock && "50%"}}>
                     <div className="product-info-out-of-stock">
                        {!this.state.productInfo.inStock && (<p className='product-info-out-of-stock'>OUT OF STOCK</p>)}
                     </div>
                     <img src={this.state.chosenImg} alt="" />
                  </div>
               </div>
               <div className="product-page-infoo">
                  <div className="product-page-info">
                     <div className="product-page-brand">
                        <p>{this.state.productInfo.brand}</p>
                     </div>
                     <div className="product-page-name">
                        <p>{this.state.productInfo.name}</p>
                     </div>
                     <div className="product-page-attributes">
                        {productPageAttributes} 
                     </div>
                     <div className="product-page-price">
                        <p className='product-page-price-text'>PRICE:</p>
                        {productPagePrice}
                     </div>
                     <div className="product-page-add-button">
                        <button disabled={(Object.keys(this.state.chosenAttributes).length !== this.state.productInfo.attributes.length) || 
                           (!this.state.productInfo.inStock) ? true : false} onClick={this.buyItem} 
                           style={{opacity: (Object.keys(this.state.chosenAttributes).length !== this.state.productInfo.attributes.length)  ||
                           (!this.state.productInfo.inStock) ? '50%' : '100%'}}>ADD TO CART</button>
                     </div>
                     <div className="product-page-notification" style={{display: (this.state.showNotification) ? 'block' : 'none'}}>
                        <p className='product-page-notification-text'>Item added to your cart!</p>
                     </div>
                     <div className="product-page-description">
                        <div>{this.state.productInfo.description.includes('<') ? 
                        (<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.productInfo.description) }}></div>) : 
                        <div>{this.state.productInfo.description}</div>}</div>
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