import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../scss/CustomDropDown.scss';

class CustomDropDown extends Component{
  constructor(props){
    super(props);
    this.state ={
      isOpen :false,
      selectedValue : (this.props.placeholder !== undefined ? {label : this.props.placeholder , value:''} : (this.props.value !== undefined ?this.props.value : this.props.options[0]))
    }
    this.focusedItem = null;
    this.selectedItem = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);

  }
  componentDidMount(){
     document.addEventListener("click",this.documentClickHandler);
     if(this.state.selectedValue.value === ""){
       this.selectedItem = null;
       this.focusedItem = null;
     }
     else{
       this.selectedItem = this.focusedItem = this.refs.list.childNodes[this.selectedIndex];
     }
     console.log(this.selectedItem);
     console.log(this.focusedItem);
  }
  componentDidUpdate(){
    if(this.state.selectedValue.value === ""){
      this.selectedItem = null;
      this.focusedItem = null;
    }
    else{
      this.selectedItem = this.focusedItem = this.refs.list.childNodes[this.selectedIndex];
    }
  }
  documentClickHandler(){
    if(!ReactDOM.findDOMNode(this.refs.dropDown).contains(event.target)){
      if(this.state.isOpen){
        this.closeDropDown();
        this.handleBlur();
      }
    }
  }
  handleBlur(){
    console.log("Call Blur");
  }
  renderOptions(){
      this.options = this.props.options.map((item,index) => {
        if(this.state.selectedValue.value === item.value){
          this.selectedIndex = index;
          if(item.disable){
             return(<li role="option" aria-selected="true" aria-label={item.label} aria-disabled="true" className="dropdown-option dropdown-option-selected dropdown-option-disabled"  tabIndex={-1} onClick={event => this.itemClickHandler(event)} onKeyDown={event => this.itemKeyDownHandler(event)} data-label={item.label} data-value={item.value} key={index}>{item.label} </li>)
          }
          else{
            return(<li role="option" aria-selected="true" aria-label={item.label} aria-disabled="false" className="dropdown-option dropdown-option-selected"  tabIndex={-1} onClick={event => this.itemClickHandler(event)} onKeyDown={event => this.itemKeyDownHandler(event)} data-label={item.label} data-value={item.value} key={index}>{item.label} </li>)
          }
        }
        else{
          if(item.disable){
             return(<li role="option" aria-selected="fale" aria-label={item.label} aria-disabled="true" className="dropdown-option dropdown-option-disabled"  tabIndex={-1} onClick={event => this.itemClickHandler(event)} onKeyDown={event => this.itemKeyDownHandler(event)} data-label={item.label} data-value={item.value} key={index}>{item.label} </li>)
          }
          else{
            return(<li role="option" aria-selected="false" aria-label={item.label} aria-disabled="false" className="dropdown-option"  tabIndex={-1} onClick={event => this.itemClickHandler(event)} onKeyDown={event => this.itemKeyDownHandler(event)} data-label={item.label} data-value={item.value} key={index}>{item.label} </li>);
          }
        }
      });
      return this.options;
  }
  handleClick(event){
      if(this.state.isOpen)
          this.closeDropDown();
      else
        this.openDropDown();
  }
  handleKeyDown(event){
      if(event.key === "Enter" || event.key === " "){
        this.handleClick()
      }
      else if(event.key === "Tab" ){
        this.closeDropDown();
        this.handleBlur();
      }
      else if(event.key === "ArrowDown"){
        if(this.state.isOpen){
          if(this.selectedItem === null){
              this.focusedItem = this.refs.list.childNodes[0];
          }
          this.focusedItem.classList.add("dropdown-option-focused");
          this.focusedItem.setAttribute("tabIndex",0);
          this.focusedItem.focus();
        }
      }
      if(event.key === "Escape"){
        if(this.state.isOpen){
          this.closeDropDown();
        }
      }
  }
  closeDropDown(){
    if(this.focusedItem !== null) {
      this.focusedItem.classList.remove("dropdown-option-focused");
      this.focusedItem.setAttribute("tabIndex",-1);
    }
    this.setState({isOpen:false});
    this.refs.focusNode.focus();
  }
  openDropDown(){
    if(this.selectedItem !== null)    {
      this.focusedItem = this.selectedItem;
      this.focusedItem.setAttribute("tabIndex",0);
      this.focusedItem.classList.add("dropdown-option-focused");
    }
    this.setState({isOpen:true})
  }
  itemClickHandler(event){
    if(!event.target.classList.contains("dropdown-option-disabled")){
        this.selectedItem = event.target;
        this.selectedItem.classList.add("dropdown-option-selected");
        var selectedValue = {
          label : this.selectedItem.getAttribute("data-label"),
          value : this.selectedItem.getAttribute("data-value")
        }
        this.setState({selectedValue : selectedValue});
        this.closeDropDown();
        this.refs.focusNode.focus();
        console.log("u call on change from here");
    }
  }
  itemKeyDownHandler(event){
      if(event.key === "Enter"){
        this.itemClickHandler(event);
      }
      else if(event.key === "ArrowUp"){
        if(this.focusedItem !== null && this.focusedItem.previousElementSibling !== null){
          this.focusedItem.classList.remove("dropdown-option-focused");
          this.focusedItem.setAttribute("tabIndex",-1);
          this.focusedItem = this.focusedItem.previousElementSibling;
          this.focusedItem.classList.add("dropdown-option-focused");
          this.focusedItem.setAttribute("tabIndex",0);
        }
        this.focusedItem.focus();
      }
      else if(event.key === "ArrowDown"){
        if(this.focusedItem !== null && this.focusedItem.nextElementSibling !== null){
          this.focusedItem.classList.remove("dropdown-option-focused");
          this.focusedItem.setAttribute("tabIndex",-1);
          this.focusedItem = this.focusedItem.nextElementSibling;
          this.focusedItem.classList.add("dropdown-option-focused");
          this.focusedItem.setAttribute("tabIndex",0);
        }
        this.focusedItem.focus();
      }
      else if(event.key === "Tab"){
        this.closeDropDown();
        this.handleBlur();
      }
      else if(event.key === "Escape"){
        this.closeDropDown();
      }
  }
  render(){
    return(
      <div ref="dropDown" className="dropDown">
          <div
              ref="focusNode"
              role="combobox"
              aria-expanded={this.state.isOpen}
              aria-disabled={this.props.disable ? true : false}
              aria-readonly={this.props.readonly ? true :false }
              className="widget"
              onClick={this.handleClick}
              tabIndex={0}
              onKeyDown={this.handleKeyDown}>
              <div className="dropdown-selected">{this.state.selectedValue.label}</div>
              <span className="dropdown-arrow">{this.state.isOpen ? "d" : "u"}</span>
          </div>
          <div className={(this.state.isOpen ? "dropdown-content-show" : "dropdown-content-hide")+" dropdown-content"}>
            <ul className="dropdown-list" role="listbox" ref="list">
                {this.renderOptions()}
            </ul>
          </div>
      </div>
    )
  }
}

export default CustomDropDown;
