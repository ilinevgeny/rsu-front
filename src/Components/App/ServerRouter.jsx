import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import Layout from '../../layout';
import NavBar from '../NavBar';

//import thunk from 'redux-thunk';

import routes from './routes';

const router = express.Router();

router.get('*', (req, res) => {
    let context = {pageTitleSetter: (title) => { Layout.setTitle(title) }, setNotFound: () => { res.status(404) }};
    let content = renderToString(
        <StaticRouter location={req.url} context={context}>
            <div>
                <NavBar/>
                {renderRoutes(routes)}
            </div>
        </StaticRouter>
    );
    res.end(Layout.render( content ));
});

export default router;
