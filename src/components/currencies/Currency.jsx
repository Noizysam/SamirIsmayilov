import React, { Component } from 'react'

export class Currency extends Component {
   constructor() {
      super();
      this.state = {
         isCurrencyHighlighted: false
      }
   }


   /* Highlight currency on hover */
   highlightCurrency = () => {
      this.setState({isCurrencyHighlighted: true})
   }

   /* Remove highlight currency when we move away our cursor */
   unHighlightCurrency = () => {
      this.setState({isCurrencyHighlighted: false})
   }

   render() {
      return (
         <div key={this.props.idx} style={{backgroundColor: (this.props.currentCurrency === this.props.symbols[this.props.idx]) 
         || (this.state.isCurrencyHighlighted) ? '#d3d3d3' : '#fff'}} className="currency-switcher-dropdown-button">
            <button onMouseEnter={this.highlightCurrency} onMouseLeave={this.unHighlightCurrency} onClick={this.props.setNewCurrencie} 
            href='#'  value={this.props.symbols[this.props.idx]} >{this.props.symbols[this.props.idx]} 
            {this.props.labels[this.props.idx]}</button>
         </div>
      )
   }
}

export default Currency