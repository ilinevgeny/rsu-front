import React, { Component } from 'react';

export default class RightAside extends Component {
    render() {
        return (
            <aside className="right-aside">
                <div className="invite-button">
                    Пригласить РСУ к себе в дом
                </div>
                <form className="invite-form">
                    <input className="input -light-focus" type="text" name="name" placeholder="имя" />
                    <input className="input -light-focus" type="text" name="phone" placeholder="телефон" />
                    <input className="input -light-focus" type="text" name="address" placeholder="адрес дома" />
                    <div className="submit-wrap">
                        <input className="button" type="submit" value="Пригласить" />
                    </div>
                </form>
            </aside>
        );
    }
}
