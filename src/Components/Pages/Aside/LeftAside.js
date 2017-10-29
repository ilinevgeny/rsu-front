import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LeftAside extends Component {
    render() {
        return (
            <aside className="left-aside">
                <Link to='/'><div className="pointer-back" /></Link>
                <div className="logo_wrap">
                    <img className="logo" src="/img/logo.png" alt="RSU" />
                </div>
                <div className="contacts -gothic-text">
                    <div>+7 (343) 384-00-61</div>
                    <div>info@ukliga.tu</div>
                </div>
            </aside>
        );
    }
}
