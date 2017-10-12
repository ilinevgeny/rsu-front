import React, { Component } from 'react';

export default class PageComponent extends Component {
    constructor(props) {
        super(props);
        props.staticContext && props.staticContext.pageTitleSetter(props.route.title || '');
        this.title = props.route.title || '';
    }

    setTitle(title) {
        this.title = title;
    }

    appendTitle(title) {
        this.title += ' | ' + title;
    }

    componentWillMount()
    {
        if (typeof document !== 'undefined' && this.title) {
            document.title = this.title;
        }
    }
}
