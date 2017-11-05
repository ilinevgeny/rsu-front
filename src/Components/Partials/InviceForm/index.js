import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Invite extends Component {
    static propTypes = {
        toggleable: PropTypes.bool,
    };

    state = {
        open: false
    };

    toggle = (e) => {
        this.setState({
            open: !this.state.open
        })
    };

    renderForm() {
        if (!this.state.open) {
            return null;
        }
        return (
            <form className="invite-form">
                <input className="input -light-focus" type="text" name="name" placeholder="имя" />
                <input className="input -light-focus" type="text" name="phone" placeholder="телефон" />
                <input className="input -light-focus" type="text" name="address" placeholder="адрес дома" />
                <div className="submit-wrap">
                    <input className="button" type="submit" value="Пригласить" />
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
