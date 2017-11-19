import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { numberFormat } from '../../../Utils/helper';
import { LegendRecord } from '../../../Reducers/Entities';

export default class GraphLegend extends Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
        toggleObj: PropTypes.object.isRequired,
        toggle: PropTypes.func.isRequired,
        modifiers: PropTypes.object.isRequired,
        actual: PropTypes.string
    };

    renderItem(item) {
        const {toggleObj, toggle, modifiers} = this.props;
        const modifier = modifiers[item.id] || '';
        const radioId = `legend_${item.id}`;

        return <li key={item.id} className="graph-legend_item -color_grey">
                <label>
                    <input className="hidden-box" id={radioId} type="radio" checked={toggleObj[item.id]} onClick={toggle(item.id)} onChange={() => (null)} />
                    <div className="radio-box"/>
                </label>
                <label className="graph-legend_item-title" htmlFor={radioId}>{item.title}</label>
                <label className={`graph-legend_item-sum ${modifier}`} htmlFor={radioId} >{numberFormat(item.sum, 0, '', ' ')}</label>
        </li>
    }

    render() {
        return (
            <ul className="graph-legend" data-update={`Актуально на ${this.props.actual}`}>
                {this.props.list.map((item) => this.renderItem(new LegendRecord(item))).valueSeq().toArray()}
            </ul>
        );
    }
}
