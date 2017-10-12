import React from 'react';
import {render} from 'react-dom';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import NavBar from '../NavBar';

//import { createStore, applyMiddleware } from 'redux';
//import { Provider } from 'react-redux';
//import thunk from 'redux-thunk';

import routes from './routes';

// const store = createStore(
//     reducers, window.__INITIAL_STATE__, applyMiddleware(thunk)
// );

export default () => {
    return (
        <BrowserRouter context={{'egeg': 334}}>
            <div>
            <NavBar/>
            {renderRoutes(routes)}
            </div>
        </BrowserRouter>
    )
}
