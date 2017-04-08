require("babel-polyfill");
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { watchForLoadImages } from './sagas/sagas'

import App from './components/app'
import todoApp from './reducers/reducer'
const sagaMiddleware = createSagaMiddleware()
let store = createStore(todoApp,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchForLoadImages);

let rootElement = document.getElementById('hello')

render(

   <Provider store = {store}>
      <App />
   </Provider>,

   rootElement
)
