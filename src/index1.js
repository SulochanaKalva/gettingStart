import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropDown from './components/dropDown';
import "./scss/dropdDown.scss"
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      value:""
    }
  }

   render() {
     var options =[
       {label :"First Element", value:"1"},
       {label :"Second Element", value:"2"},
       {label :"Third Element", value:"3"},
       {label :"Fourth Element", value:"4"},
       {label :"Fifth Element", value:"5"}
     ]
      return (
          <div>
              <DropDown options={options}/>
          </div>
      )
   }
}

ReactDOM.render(<App />, document.getElementById('app'));
