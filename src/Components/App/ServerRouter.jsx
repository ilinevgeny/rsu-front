import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Layout from '../../layout';
import NavBar from '../NavBar';
import routes from './routes';
import rootReducer from '../../rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));
// redux test
store.dispatch({
    type: 'USER',
    payload: [{name: 'pp', email: 'eg'}, {name: 'p2', email: 'ergre'}],
});


const router = express.Router();

Layout.setStore(store);

router.get('*', (req, res) => {
    let context = {pageTitleSetter: (title) => { Layout.setTitle(title) }, setNotFound: () => { res.status(404) }};
    let content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <div>
                    <NavBar/>
                    {renderRoutes(routes)}
                </div>
            </StaticRouter>
        </Provider>
    );
    res.end(Layout.render( content ));
});

export default router;
