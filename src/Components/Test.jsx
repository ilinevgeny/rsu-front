import React from 'react';
import PageComponent from './App/PageComponent';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Test extends PageComponent {
    render() {
        console.log(this.props.users);
        return (
            <div className='App'>
                This is test!,
                {this.props.users.map((item) => <div key={item.name}>{item.name} | {item.email}</div>)}
            </div>
        );
    }
}

export default connect(
    s => ({
        users: s.users.get('list')
    })
)(Test);
