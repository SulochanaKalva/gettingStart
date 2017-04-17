import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import CustomDropDown from './components/CustomDropDown';
import './scss/dropdDown.scss';
class App extends Component{

  render(){
    var options =[
      {label :"First Element", value:"1" ,disable:true},
      {label :"Second Element", value:"2"},
      {label :"Third Element", value:"3"},
      {label :"Fourth Element", value:"4"},
      {label :"Fifth Element", value:"5"}
    ]

    return(
      <div>
      <CustomDropDown options={options} placeholder="please Select" />     </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
