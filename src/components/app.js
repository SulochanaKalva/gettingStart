import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from './../actions/addElement';
import Trail from './trail'

class App extends Component {
   render() {
      const { dispatch, visibleTodos } = this.props;

      return (
         <div>
         <button onClick={() => dispatch(addTodo("hello"))}> add </button>
          hello
          <Trail/>
         </div>
      )
   }
}

function select(state) {
   return {
      visibleTodos: state.elemts
   }
}

export default connect(select)(App)
