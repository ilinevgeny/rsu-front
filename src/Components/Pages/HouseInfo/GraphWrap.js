import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapToArr } from '../../../Utils/helper';
import { LegendRecord } from '../../../Reducers/Entities';
import GraphLegend from './GraphLegend';


class GraphWrap extends Component {
    static propTypes = {
        legendList: PropTypes.array.isRequired,
    };

    modifiers = {
        debit: ' -color_green ',
        credit: ' -color_orange',
        saldo: ' -color_blue'
    }

    constructor(props) {
        super(props);
        this.state = {};
        props.legendList.forEach((item) => (this.state[item.id] = true));
    }

    toggle = (name) => (e) => {
        const state = {};
        state[name] = !this.state[name];
        this.setState(state);
    }

    render() {
        return (
            <div className="house-stat_graph-wrap">
                <div className="graph" />
                <GraphLegend list={this.props.legendList} toggleObj={this.state} toggle={this.toggle} modifiers={this.modifiers}/>
            </div>
        );
    }
}

export default connect(
    (s) => ({
        legendList: mapToArr(s.houseInfo.get('legendList'), LegendRecord)
    })
)(GraphWrap);
