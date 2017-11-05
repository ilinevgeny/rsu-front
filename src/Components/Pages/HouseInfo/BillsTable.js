import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { numberFormat, mapToArr } from '../../../Utils/helper';


export default class BillsTable extends Component {
    static propTypes = {
        billsList: PropTypes.array.isRequired,
    };

    tabs = [
        {id: 'all', title: 'Все операции'},
        {id: 'in', title: 'Поступления'},
        {id: 'out', title: 'Расходы'},
    ].reverse();

    items = [
        {id: 0, 'date': 'DD.MM.YY', type: 'debit', sum: 1000, counterparty: 'Name Name', purpose: 'Purpose of payment'},
        {id: 1, 'date': 'DD.MM.YY', type: 'credit', sum: 1000000, counterparty: 'Name Name', purpose: 'Purpose of payment'},
        {id: 2, 'date': 'DD.MM.YY', type: 'debit', sum: 100000000, counterparty: 'Name Name', purpose: 'Purpose of payment'},
        {id: 3, 'date': 'DD.MM.YY', type: 'credit', sum: 1000, counterparty: 'Name Name', purpose: 'Purpose of payment'}
    ]

    state = {
        toggle: 'all',
    }

    toggle = (name) => (e) => {
        this.setState({toggle: name})
    }

    renderTabs(item) {
        const classes = `tabs_item-wrap ${item.id === this.state.toggle ? '-active' : ''}`;

        return <li key={item.id} className={classes} onClick={this.toggle(item.id)}><div className="tabs_item">{item.title}</div></li>
    }

    renderAllContent() {
        if (this.state.toggle !== 'all') {
            return '';
        }
        return <div>
            <div className="bills-list_header">
                <div className="bills-list_item -date">Дата</div>
                <div className="bills-list_item -sum">Сумма</div>
                <div className="bills-list_item -cont">Контрагент</div>
                <div className="bills-list_item -desc">Назначение платежа</div>
            </div>
            { this.items.map((item) => this.renderAllContentItems(item)) }
        </div>
    }

    renderAllContentItems(item) {
        const sumModifier = `bills-list_item -sum -sum-font ${item.type === 'debit' ? '-debit -color_green' : '-credit -color_orange'}`;

        return <div key={item.id} className="bills-list_row">
                <div className="bills-list_item -date">{item.date}</div>
                <div className={sumModifier}>{numberFormat(item.sum, 0, '', ' ')}</div>
                <div className="bills-list_item -cont">{item.counterparty}</div>
                <div className="bills-list_item -desc">{item.purpose}</div>
            </div>
    }

    renderInContent() {
        if (this.state.toggle !== 'in') {
            return '';
        }
        return <div className="diagram">
            <div className="diagram_item">
                <div className="diagram_item-title">Содержание придомовой территории</div>
                <div className="diagram_item-data">
                    <div className="diagram_item-progress-bar -background-color_green" style={{width: '100%'}} />
                    <div className="diagram_item-sum -sum-font">{numberFormat(100000, 0, '', ' ')}</div>
                </div>
            </div>
            <div className="diagram_item">
                <div className="diagram_item-title">Гвс</div>
                <div className="diagram_item-data">
                    <div className="diagram_item-progress-bar -background-color_green" style={{width: '10%'}} />
                    <div className="diagram_item-sum -sum-font">{numberFormat(10000, 0, '', ' ')}</div>
                </div>
            </div>
            <div className="diagram_item">
                <div className="diagram_item-title">Другое</div>
                <div className="diagram_item-data">
                    <div className="diagram_item-progress-bar -background-color_green" style={{width: '33%'}} />
                    <div className="diagram_item-sum -sum-font">{numberFormat(33000, 0, '', ' ')}</div>
                </div>
            </div>
        </div>
    }

    renderOutContent() {
        if (this.state.toggle !== 'out') {
            return '';
        }
        return <div className="diagram">
            <div className="diagram_item">
                <div className="diagram_item-title">Содержание придомовой территории</div>
                <div className="diagram_item-data">
                    <div className="diagram_item-progress-bar -background-color_orange" style={{width: '100%'}} />
                    <div className="diagram_item-sum -sum-font">{numberFormat(100000, 0, '', ' ')}</div>
                </div>
            </div>
            <div className="diagram_item">
                <div className="diagram_item-title">Гвс</div>
                <div className="diagram_item-data">
                    <div className="diagram_item-progress-bar -background-color_orange" style={{width: '44%'}} />
                    <div className="diagram_item-sum -sum-font">{numberFormat(44000, 0, '', ' ')}</div>
                </div>
            </div>
            <div className="diagram_item">
                <div className="diagram_item-title">Другое</div>
                <div className="diagram_item-data">
                    <div className="diagram_item-progress-bar -background-color_orange" style={{width: '22%'}} />
                    <div className="diagram_item-sum -sum-font">{numberFormat(22000, 0, '', ' ')}</div>
                </div>
            </div>
        </div>
    }

    render() {
        return (
            <div className="bills-table_wrap">
                <ul className="bills-table_tabs">
                    { this.tabs.map((item) => this.renderTabs(item)) }
                </ul>
                <div className="bills-table_content">
                    {this.renderAllContent()}
                    {this.renderInContent()}
                    {this.renderOutContent()}
                </div>
            </div>
        );
    }
}
