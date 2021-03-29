// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import App from '../components/App'
import {createStore, applyMiddleware, compose} from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import rootReducer from "../components/reducers/rootReducer"
import {Provider} from 'react-redux'
import sudokuStore from '../store'
import thunk from 'redux-thunk'
import * as InputUtility from '../components/functional/InputUtility'



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store = {sudokuStore}>
      <Router>
        <Route path="/" component={App}/>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
