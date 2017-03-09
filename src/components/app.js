import React, { Component } from 'react';
import CustomDropdown from './custom_dropdown';
require("./../scss/main.scss");
require("./../scss/app.scss");
// create component
export default class App extends Component {
  render() {
    var items= [
         { value: 'three', label: 'Three' },
         { value: 'four', label: 'Four' }
       ]
    return (
      <div className='example'>
      	<h1> React Hello World </h1>
        <CustomDropdown options={items}  placeholder="Select an option" />
        <div className='hello'> hello sulo u got it </div>
      </div>
    );
  }
}
