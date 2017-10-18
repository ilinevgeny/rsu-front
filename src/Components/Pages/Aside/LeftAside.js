import React, { Component } from 'react';

export default class LeftAside extends Component {
    render() {
        return (
            <aside className="left-aside">
                <div className="logo_wrap">
                    <img src="/img/logo.png" alt="RSU" />
                </div>
                <div className="contacts -gothic-text">
                    <div>+7 (343) 384-00-61</div>
                    <div>info@ukliga.tu</div>
                </div>
            </aside>
        );
    }
}
