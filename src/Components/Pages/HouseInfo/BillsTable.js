import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapToArr } from '../../../Utils/helper';
import { LegendRecord } from '../../../Reducers/Entities';


export default class BillsTable extends Component {
    static propTypes = {
        billsList: PropTypes.array.isRequired,
    };

    items = [
        {id: 'out', title: 'Расходы'},
        {id: 'in', title: 'Поступления'},
        {id: 'all', title: 'Все операции'},
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
        return <div>all operation</div>
    }

    renderInContent() {
        if (this.state.toggle !== 'in') {
            return '';
        }
        return <div>Поступления</div>
    }

    renderOutContent() {
        if (this.state.toggle !== 'out') {
            return '';
        }
        return <div>Расходы</div>
    }

    render() {
        return (
            <div className="bills-table_wrap">
                <ul className="bills-table_tabs">
                    { this.items.map((item) => this.renderTabs(item))}
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
