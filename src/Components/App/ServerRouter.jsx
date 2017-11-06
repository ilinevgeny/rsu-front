import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Layout from '../../layout';
import routes from './routes';
import rootReducer from '../../rootReducer';
import { prepareParams } from '../../Utils/helper'

const router = express.Router();

router.get('*', (req, res) => {
    const store = createStore(rootReducer, applyMiddleware(thunk));

    Layout.setStore(store);

    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({route:{fetchData}, match:{params}, match}) => {
        return fetchData instanceof Function ? store.dispatch(fetchData(prepareParams(params))) : Promise.resolve(null)
    });

    Promise.all(promises).then((data) => {
        let context = {pageTitleSetter: (title) => { Layout.setTitle(title) }, setNotFound: () => { res.status(404) }};
        let content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    {renderRoutes(routes)}
                </StaticRouter>
            </Provider>
        );
        res.end(Layout.render( content ));
    });
});

export default router;
