import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class DropDown extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen:false,
      selectedValue :{label :"Please Select", value:"0"}
    }
    this.itemClickHandler = this.itemClickHandler.bind(this);
    this.itemKeyupHandler = this.itemKeyupHandler.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
  }
   render() {
      return (

      <div ref='_dropDown' className="dropdown-main-container">
          <div className="dropdown-container" ref="_dropDownContainer" tabIndex={0} onKeyDown={event => this.keyDownHandler(event)} onClick={event =>this.clickHandler(event)}>
            <div  className='dropdown-selected'>{this.state.selectedValue.label}</div>
            <span className='dropdown-arrow'>{this.state.isOpen ? "d" : "u" }</span>
          </div>
          <ul ref="_dropDownContent" className={(this.state.isOpen ? "dropdown-content-show" : "dropdown-content-hide") +" dropdown-content"}>
              {this.optionElements}
          </ul>
      </div>

      )
   }
   clickHandler(event){
     this.setState({isOpen : !this.state.isOpen});
   }
   keyDownHandler(event){
     if(event.keyCode == 13){
       this.setState({isOpen : !this.state.isOpen});
     }
     else if(event.keyCode == 40){
       if(this.state.isOpen){
           this.optionsDomElements[0].focus();
        }
    }
    else if(event.keyCode ==9){
      this.blurHandler(event);
    }
   }

   blurHandler(event){
     this.setState({isOpen : false});
     console.log(this.state.selectedValue);
   }
   documentClickHandler(event){
     if(!ReactDOM.findDOMNode(this.refs._dropDown).contains(event.target)){
       if(this.state.isOpen){
         this.blurHandler();
       }
     }
   }
   componentDidMount(){
     if(this.optionsLength>0){
         this.optionsDomElements = document.getElementsByClassName("dropdown-element");
         for(var i=0; i<this.optionsDomElements.length;i++){
           this.optionsDomElements[i].addEventListener("click",this.itemClickHandler);
           this.optionsDomElements[i].addEventListener("keydown",this.itemKeyupHandler);
         }
     }

     document.addEventListener("click",this.documentClickHandler);
   }
   componentWillMount(){
       if(this.props.options.length >0){
         this.options = this.props.options;
         this.optionsLength = this.props.options.length;
         this.optionElements = this.options.map((item, index) =>{
           return(<li className="dropdown-element"  tabIndex={-1} data-label={item.label} data-value={item.value} key={index}>{item.label} </li>);
         })
       }
   }
   itemClickHandler(event){
     var selctedItem ={
       label:event.target.getAttribute("data-label"),
       value:event.target.getAttribute("data-value")
     }
     this.setState({selectedValue:selctedItem , isOpen :false});
     this.refs._dropDownContainer.focus();
   }
   itemKeyupHandler(event){
     if(event.keyCode==13){
       this.itemClickHandler(event);
     }
     else if(event.keyCode == 40 || event.keyCode==38){
       event.target.setAttribute("tabIndex",'-1');
          if(event.keyCode == 40){
            if(event.target.nextElementSibling != null){
              event.target.nextElementSibling.setAttribute("tabIndex","0");
              event.target.nextElementSibling.focus();
            }
            else{
              this.optionsDomElements[0].setAttribute("tabIndex","0");
              this.optionsDomElements[0].focus();
            }
          }
          else{
            if(event.target.previousElementSibling != null){
              event.target.previousElementSibling.setAttribute("tabIndex","0");
              event.target.previousElementSibling.focus();
            }
            else{
              this.optionsDomElements[this.optionsLength-1].setAttribute("tabIndex","0");
              this.optionsDomElements[this.optionsLength-1].focus();
            }
          }
     }
     else if(event.keyCode == 9){
       this.blurHandler(event);

     }
   }

 }

export default DropDown;
