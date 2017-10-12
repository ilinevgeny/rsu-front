import React from 'react';
import PageComponent from './App/PageComponent';
import PropTypes from 'prop-types';

class Test extends PageComponent {
    render() {
        return (
            <div className='App'>
                This is test!
            </div>
        );
    }
}

export default Test;
