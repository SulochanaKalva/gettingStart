import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class DropDown extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen:false,
      selectedValue : this.props.placeholder ? {label : this.props.placeholder , value:"0"} : this.props.value
    }
    this.itemClickHandler = this.itemClickHandler.bind(this);
    this.itemKeyupHandler = this.itemKeyupHandler.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
  }
   render() {
      return (

      <div ref='_dropDown' className="dropdown-main-container">
          <div className={(this.props.disable ? "dropdown-disabled" : "")+" dropdown-container"} ref="_dropDownContainer" tabIndex={this.props.disable ? -1 : 0} onKeyDown={event => this.onKeyDownHandler(event)} onClick={event =>this.onClickHandler(event)}>
            <div  className='dropdown-selected'>{this.state.selectedValue.label}</div>
            <span className='dropdown-arrow'>{this.state.isOpen ? "d" : "u" }</span>
          </div>
          <div className={(this.state.isOpen ? "dropdown-content-show" : "dropdown-content-hide") +" dropdown-content"}>
              <ul ref="_dropDownContent" className="dropdown-list">
                  {this.renderOptions()}
              </ul>
          </div>
      </div>

      )
   }
   onClickHandler(event){
     if(this.state.isOpen){
       this.closeDropDown();
     }
     else{
       this.openDropDown();
     }
   }
   closeDropDown(){
     this.setState({isOpen:false});
     for(var i=0 ;i<this.optionsLength;i++){
       this.optionsDomElements[i].classList.remove("dropdown-element-focused");
     }
     this.refs._dropDownContainer.focus();
   }
   openDropDown(){
     this.setState({isOpen:true});
   }
   onKeyDownHandler(event){
     if(event.key === "Enter" ){
       this.clickHandler();
     }
     else if(event.key === "ArrowDown"){
       if(this.state.isOpen){
           this.optionsDomElements[0].focus();
           this.optionsDomElements[0].classList.add("dropdown-element-focused");
        }
    }
    else if(event.key ==='Tab'){
      this.blurHandler(event);
    }
    else if(event.key === "Escape"){
      if(this.state.isOpen){
        this.closeDropDown();
        this.refs._dropDownContainer.focus();
      }
    }
   }

   blurHandler(event){
     this.closeDropDown();
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
        }

     document.addEventListener("click",this.documentClickHandler);
   }
   renderOptions(){
     if(this.props.options.length >0){
       this.options = this.props.options;
       this.optionsLength = this.props.options.length;
       this.optionElements = this.options.map((item, index) =>{
         if(this.state.selectedValue.value === item.value){
           if(item.disable){
              return(<li className="dropdown-element dropdown-element-selected disaable"  tabIndex={-1} onClick={event => this.itemClickHandler(event)} onKeyDown={event => this.itemKeyupHandler(event)} data-label={item.label} data-value={item.value} key={index}>{item.label} </li>)
           }
           else{
             return(<li className="dropdown-element dropdown-element-selected"  tabIndex={-1} onClick={event => this.itemClickHandler(event)} onKeyDown={event => this.itemKeyupHandler(event)} data-label={item.label} data-value={item.value} key={index}>{item.label} </li>)
           }
         }
         else{
           if(item.disable){
              return(<li className="dropdown-element disable"  tabIndex={-1} onClick={event => this.itemClickHandler(event)} onKeyDown={event => this.itemKeyupHandler(event)} data-label={item.label} data-value={item.value} key={index}>{item.label} </li>)
           }
           else{
             return(<li className="dropdown-element"  tabIndex={-1} onClick={event => this.itemClickHandler(event)} onKeyDown={event => this.itemKeyupHandler(event)} data-label={item.label} data-value={item.value} key={index}>{item.label} </li>);
           }
         }
       })
       return this.optionElements;
     }
   }
   itemClickHandler(event){
     var selctedItem={}
     if(!event.target.classList.contains("disable")){
      selctedItem  ={
         label:event.target.getAttribute("data-label"),
         value:event.target.getAttribute("data-value")
       }
     }
     else{
       selctedItem = this.state.selectedValue;
     }
     this.setState({selectedValue:selctedItem});
     this.closeDropDown();
   }
   itemKeyupHandler(event){
     if(event.key==="Enter"){
       this.itemClickHandler(event);
     }
     else if(event.key === "ArrowDown" || event.key ==="ArrowUp"){
       event.target.setAttribute("tabIndex",'-1');
       event.target.classList.remove('dropdown-element-focused');
          if(event.key === "ArrowDown"){
            if(event.target.nextElementSibling != null){
              event.target.nextElementSibling.setAttribute("tabIndex","0");
              event.target.nextElementSibling.classList.add("dropdown-element-focused");
              event.target.nextElementSibling.focus();
            }
            else{
              this.optionsDomElements[0].setAttribute("tabIndex","0");
              this.optionsDomElements[0].classList.add("dropdown-element-focused");
              this.optionsDomElements[0].focus();
            }
          }
          else{
            if(event.target.previousElementSibling != null){
              event.target.previousElementSibling.setAttribute("tabIndex","0");
              event.target.previousElementSibling.classList.add("dropdown-element-focused");
              event.target.previousElementSibling.focus();
            }
            else{
              this.optionsDomElements[this.optionsLength-1].setAttribute("tabIndex","0");
              this.optionsDomElements[this.optionsLength-1].classList.add("dropdown-element-focused");
              this.optionsDomElements[this.optionsLength-1].focus();
            }
          }
     }
     else if(event.key === "Tab"){
       this.blurHandler(event);
     }
     else if(event.key === "Escape"){
       this.closeDropDown();
     }
   }

 }

export default DropDown;
