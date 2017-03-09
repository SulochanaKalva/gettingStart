import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
// create component
export default class CustomDropdown extends Dropdown {
  componentDidMount(){
    super.componentDidMount();
    this.rootNode = document.getElementsByClassName('Dropdown-control ')[0];
    this.rootNode.tabIndex =0;
    this.rootNode.addEventListener('blur',function(event){
      console.log(this.optionsElements);
    })
    this.rootNode.addEventListener('keydown', function(event){
      if(event.keyCode ==13){
        this.handleMouseDown(event);
        if(this.state.isOpen){
          this.optionsElements = document.getElementsByClassName('Dropdown-option');
          for(var i=0; i<this.optionsElements.length;i++){
            this.optionsElements[i].tabIndex=-1;
            this.optionsElements[i].addEventListener("keydown",event=>this.handleArrowKeys(event));
            this.optionsElements[i].addEventListener('blur',event=>this.onOptionsBlur(event));
          }
        }
      }
      else if(event.keyCode==40 || event.keyCode ==38){
        if(this.state.isOpen){
          if(event.keyCode==40){
            if(document.activeElement == this.rootNode){
              this.optionsElements[0].focus();
            }
          }
          else{
            if(document.activeElement == this.rootNode){
              this.optionsElements[this.optionsElements.length-1].focus();
            }
          }
        }
      }
      else if(event.keyCode==9){
        if(this.state.isOpen){
          this.setState({isOpen:false})
        }
      }
    }.bind(this));
  }
  handleArrowKeys(event){
    if(event.keyCode==40){
      if(document.activeElement != this.optionsElements[this.optionsElements.length-1])
        document.activeElement.nextElementSibling.focus();
      else
        this.optionsElements[0].focus();
    }else if(event.keyCode==38){
      if(document.activeElement != this.optionsElements[0])
        document.activeElement.previousElementSibling.focus();
      else
        this.optionsElements[this.optionsElements.length-1].focus();
    }
    else if(event.keyCode==9){
      this.rootNode.tabIndex=-1;
      this.setState({isOpen:false});
    }
    this.rootNode.tabIndex=0;
  }
}
