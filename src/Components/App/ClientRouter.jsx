import React from 'react';
import {fromJSON} from 'transit-immutable-js';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import NavBar from '../NavBar';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from '../../rootReducer';
import routes from './routes';

 const store = createStore(
     rootReducer, fromJSON(window.__INITIAL_STATE__), applyMiddleware(thunk)
 );

export default () => {
    return (
        <Provider store={store}>
            <BrowserRouter >
                <div>
                <NavBar/>
                {renderRoutes(routes)}
                </div>
            </BrowserRouter>
        </Provider>
    )
}
