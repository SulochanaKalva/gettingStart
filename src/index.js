import React from 'react';
import ReactDOM from 'react-dom';

//Create a new component. Component always produce some HTML
import App from './components/app';

//Place the component on the index.html page
ReactDOM.render( <App />, document.querySelector('.container'));