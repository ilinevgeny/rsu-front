import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { numberFormat } from '../../../Utils/helper';

export default class BillsTable extends Component {
    static propTypes = {
        billsList: PropTypes.array.isRequired,
        debitDiagram: PropTypes.object,
        creditDiagram: PropTypes.object
    };

    tabs = [
        {id: 'all', title: 'Все операции'},
        {id: 'in', title: 'Поступления'},
        {id: 'out', title: 'Расходы'},
    ].reverse();

    state = {
        toggle: 'all',
    }

    toggle = (name) => (e) => {
        this.setState({toggle: name})
    }

    percent(sum, max) {
        return sum * 100 / (max || sum);
    }

    diagramToArr(diagram, max) {
        return diagram.map((sum, category) => ({category, sum, percent: this.percent(sum, max)})).valueSeq().toArray();
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
            { this.props.billsList.map((item) => this.renderAllContentItems(item)) }
        </div>
    }

    renderAllContentItems(item) {
        const sumModifier = `bills-list_item -sum -sum-font ${item.type === 'debit' ? '-debit -color_orange' : '-credit -color_green'}`;
        return <div key={item.id} className="bills-list_row">
                <div className="bills-list_item -date">{moment(item.datetime).format('DD.MM.YY')}</div>
                <div className={sumModifier}>{numberFormat(item.sum, 0, '', ' ')}</div>
                <div className="bills-list_item -cont">{item.category}</div>
                <div className="bills-list_item -desc">{item.purpose}</div>
            </div>
    }

    renderInContent() {
        if (this.state.toggle !== 'in' || !this.props.creditDiagram) {
            return '';
        }

        const max = this.props.creditDiagram.max();

        return <div className="diagram">
            {this.diagramToArr(this.props.creditDiagram, max).map(item => this.renderInOutItem(item, '-background-color_green'))}
        </div>
    }

    renderOutContent() {
        if (this.state.toggle !== 'out'  || !this.props.debitDiagram) {
            return '';
        }
        const max = this.props.debitDiagram.max();

        return <div className="diagram">
            {this.diagramToArr(this.props.debitDiagram, max).map(item => this.renderInOutItem(item, '-background-color_orange'))}
        </div>
    }

    renderInOutItem(item, modifier) {
        return <div key={item.category} className="diagram_item">
            <div className="diagram_item-title">{item.category}</div>
            <div className="diagram_item-data">
                <div className={`diagram_item-progress-bar ${modifier}`} style={{width: numberFormat(item.percent, 2, '.') + '%'}} />
                <div className="diagram_item-sum -sum-font">{numberFormat(item.sum, 0, '', ' ')}</div>
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
