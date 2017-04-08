import React, { Component } from 'react'
import { connect } from 'react-redux'
import { element,loadImages } from './../actions/addElement'

class Trail extends Component {
   render() {
     const { dispatch, elements } = this.props;
      return (
         <div>
         <button onClick={() => dispatch(loadImages())}> trail </button>
          hello

         </div>
      )
   }
}

function select(state) {
  console.log(state);
   return {
      elements: state.newElements
   }
}

export default connect(select)(Trail)
