import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {inviteRsu} from '../../../Reducers/Requests/housesRequest'
import {hideInvitationAlert} from '../../../Reducers/AC/housesAC'
import Loader from '../../Partials/Loader'


class Invite extends Component {
    static propTypes = {
        inviteRsu: PropTypes.func.isRequired
    };

    state = {
        open: false,
        name: '',
        phone: '',
        address: ''
    };

    toggle = (e) => {
        this.state.open && this.props.hideInvitationAlert();
        this.setState({
            open: !this.state.open,

        })
    };

    clear = () => {
        this.setState({
            open: false,
            name: '',
            phone: '',
            address: ''})
    }

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

    renderInputs() {
        const {errors} = this.props;

        return [{name: 'name', placeholder: 'имя'}, {name: 'phone', placeholder: 'телефон'}, {name:'address', placeholder: 'адрес дома'}].map((item) => {
            const {name, placeholder} = item;
            return <div key={name}>
                <input className={this.setClass(name)} type="text" name={name} placeholder={placeholder} value={this.state[name]} onChange={this._onChange} />
                {errors[name] ? <div className="input-error-text">{errors[name]}</div> : ''}
            </div>
        })
    }

    renderForm() {
        if (!this.state.open) {
            return null;
        }
        return (
            <form className="invite-form" onSubmit={this._onSubmit}>
                {this.renderInputs()}
                <div className="submit-wrap">
                    {this.props.sending ? <Loader /> : ''}
                    <input className="button" type="submit" value="Пригласить" disabled={this.props.sending}/>
                </div>
            </form>
        );
    }

    render() {
        const shadowModifier = `invite-block ${this.state.open || this.props.alert ? '-with-shadow' : ''}`;

        if (this.props.alert) {
            return <div className={`${shadowModifier} -alert`}>{this.props.alert}</div>
        }

        return (
            <div className={shadowModifier}>
                <div className="invite-button" onClick={this.toggle}>
                    Пригласить РСУ к себе в дом
                </div>
                <div className="invite-form_wrap">
                    {this.renderForm()}
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        const {clear} = this
        if (nextProps.alert) {
            setTimeout(() => {
                clear();
                nextProps.hideInvitationAlert()
            }, 3000)
        }
    }
}

export default connect(
    s => ({
        sending: s.invitation.get('sending'),
        fail: s.invitation.get('fail'),
        errors: s.invitation.get('errors'),
        alert: s.invitation.get('alert'),
    }),
    {inviteRsu, hideInvitationAlert}
)(Invite)
