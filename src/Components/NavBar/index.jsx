import React, {Component} from 'react';
//import {render} from 'react-dom';

import {NavLink} from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <div>
                <NavLink to='/'>Главная</NavLink>
                <NavLink to='/test'>Тестовая стр.</NavLink>
            </div>
        );
    }
}
