import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App.jsx'
import beerReducer from './reducers/beerReducer.js'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({beerReducer: beerReducer}),
  composeEnhancer(applyMiddleware(thunk)),
)

const rendering = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(rendering);
rendering();