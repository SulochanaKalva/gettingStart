import React, { Component } from 'react';

class CustomInput extends Component {
   render() {
      return (
      <div>
         <div>
            <input type={this.props.type ? this.props.type :"text"}
                   placeholder={this.props.placeholder ? this.props.placeholder: "Enter the text"}
                   onChange={event => this.handleOnchange(event)}
                   onBlur={event =>this.handleblur(event)}/>
         </div>
         <div ref="_error" className="hide">
            <span ref='_errorMessage'></span>
         </div>
      </div>
      )
   }
   handleOnchange(event){
     if(this.state){
       this.validateInput(event.target.value);
     }
   }
   handleblur(event){
     this.validateInput(event.target.value);
   }
   validateInput(value){
     this.state = true;
     if(value.trim() != ""){
         var isValid = this.props.regEx.test(value);
         if(!isValid){
           this.refs._errorMessage.innerHTML = this.props.invalidMessage;
           this.refs._error.classList.remove('hide');
         }
         else{
           this.refs._errorMessage.innerHTML = "";
           this.refs._error.classList.add('hide');
         }
     }else{
       this.refs._errorMessage.innerHTML = this.props.emptyMessage;
       this.refs._error.classList.remove('hide');
     }
   }
}

export default CustomInput;
