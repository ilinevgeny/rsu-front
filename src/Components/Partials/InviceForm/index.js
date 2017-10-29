import React, { Component } from 'react';

export default class Invite extends Component {
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
        return (
            <div>
                <div className="invite-button" onClick={this.toggle}>
                    Пригласить РСУ к себе в дом
                </div>
                <div className="invite-form_wrap">
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}
