import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {LoaderGrey} from '../../Partials/Loader';
import {sendQuestion} from '../../../Reducers/Requests/housesRequest'

export default class BillQuestionForm extends Component {
    static propTypes = {
        transactionId: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    state = {
        name: '',
        email: '',
        q: '',
        errors: {},
        loading: false,
        alt: null
    };

    _onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    _onSubmit = (e) => {
        e.preventDefault()
        this.setState({loading: true});
        sendQuestion(this.props.transactionId, this.state.name, this.state.email, this.state.q).then((q) => {
            if (q.code === '499') {
                this.setState({errors: q.result, loading: false});
            } else {
                this.setState({alt: q.result, loading: false});
                setTimeout(() => {
                    this.props.onClose();
                }, 3000)
            }
        });
    }

    render() {
        const {errors, loading, alt} = this.state;

        if (alt) {
            return <div className="bills_list_question">{alt}</div>
        }

        return (
            <form className="bills_list_question" onSubmit={this._onSubmit}>
                {[
                    {name: 'name', placeholder: 'имя', modifier: '-name', type: 'text'},
                    {name: 'email', placeholder: 'E-mail', modifier: '-email', type: 'email'},
                    {name: 'q', placeholder: 'Ваш вопрос', modifier: '-question', type: 'text'}
                ].map((item) => {
                    const {name, placeholder, modifier, type} = item;
                    return <div key={name} className={`bills_list_question-item ${modifier}`}>
                        <input className={`input -light-focus ${errors[name] ? '-error' : ''}`} type={type} name={name} placeholder={placeholder} value={this.state[name]} onChange={this._onChange} />
                        {errors[name] ? <div className="input-error-text">{errors[name]}</div> : ''}
                    </div>
                })}
                <div className="bills_list_question-item -button">
                    {loading ? <LoaderGrey /> : ''}
                    <input type="submit" className="button" value="Отправить вопрос" />
                </div>
            </form>
        );
    }
}
