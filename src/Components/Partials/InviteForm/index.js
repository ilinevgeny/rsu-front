import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {inviteRsu} from '../../../Reducers/Requests/housesRequest'
import Loader from '../../Partials/Loader'


class Invite extends Component {
    static propTypes = {
        toggleable: PropTypes.bool,
        inviteRsu: PropTypes.func.isRequired
    };

    state = {
        open: false
    };

    toggle = (e) => {
        this.setState({
            open: !this.state.open,
            name: '',
            phone: '',
            address: ''
        })
    };

    _onSubmit = (e) => {
        e.preventDefault()
        this.props.inviteRsu(this.state);
    }

    _onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    setClass = (name) => {
        const {errors, fail} = this.props

        return `input -light-focus ${fail && errors[name] ? '-error' : ''}`;
    }

    renderErrors() {
        let list = [];

        for (let i in this.props.errors) {
            list.push(<li key={i}>{this.props.errors[i]}</li>);
        }

        return list.length ? <ul>{list}</ul> : ''
    }

    renderForm() {
        if (!this.state.open) {
            return null;
        }
        return (
            <form className="invite-form" onSubmit={this._onSubmit}>
                {this.renderErrors()}
                <input className={this.setClass('name')} type="text" name="name" placeholder="имя" value={this.state.name} onChange={this._onChange} />
                <input className={this.setClass('phone')} type="text" name="phone" placeholder="телефон" value={this.state.phone} onChange={this._onChange} />
                <input className={this.setClass('address')} type="text" name="address" placeholder="адрес дома" value={this.state.address} onChange={this._onChange} />
                <div className="submit-wrap">
                    {this.props.sending ? <Loader /> : ''}
                    <input className="button" type="submit" value="Пригласить" disabled={this.props.sending}/>
                </div>
            </form>
        );
    }



    render() {
        const modifier = `invite-form_wrap ${this.props.toggleable ? '-overflow' : ''}`;

        return (
            <div>
                <div className="invite-button" onClick={this.toggle}>
                    Пригласить РСУ к себе в дом
                </div>
                <div className={modifier}>
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}

export default connect(
    s => ({
        sending: s.invitation.get('sending'),
        fail: s.invitation.get('fail'),
        errors: s.invitation.get('errors')
    }),
    {inviteRsu}
)(Invite)
