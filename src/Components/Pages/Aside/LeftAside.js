import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {listLoader} from "../../../Reducers/Requests/housesRequest";

class LeftAside extends Component {
    _onClick = (e) => {
        this.props.listLoader({search: ''});
    }

    render() {
        return (
            <aside className="left-aside">
                {this.props.location.location.pathname === '/' ? '' : <Link to='/' onClick={this._onClick}><div className="pointer-back" /></Link>}
                <Link to='/' onClick={this._onClick} className="logo_wrap">
                    <img className="logo" src="/img/logo.png" alt="RSU" />
                </Link>
                <div className="contacts -gothic-text">
                    <div>+7 (499) 709-70-90</div>
                    <div>rsu@rsu-7.com</div>
                </div>
            </aside>
        );
    }
}

export default connect(
    null,
    {listLoader}
)( LeftAside );
