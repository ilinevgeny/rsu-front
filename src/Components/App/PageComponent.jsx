import React, { Component } from 'react';

export default class PageComponent extends Component {

    constructor(props) {
        super(props);
        props.staticContext && props.staticContext.pageTitleSetter(props.route.title || '');
        this.title = props.route.title || '';
        if (typeof document !== 'undefined') {
            let history = require('history');
            this.history = history.createBrowserHistory();
        }
    }

    isBrowser() {
        return typeof document !== 'undefined';
    }

    setTitle(title) {
        this.title = title;
    }

    appendTitle(title) {
        this.title += ' | ' + title;
    }

    componentWillMount()
    {
        if (this.isBrowser() && this.title) {
            document.title = this.title;
        }
    }
}
