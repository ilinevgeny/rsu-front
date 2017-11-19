import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph'
import GraphLegend from './GraphLegend';

export default class GraphWrap extends Component {
    static propTypes = {
        actual: PropTypes.string,
        curMonth: PropTypes.string,
        curYear: PropTypes.string,
        graph: PropTypes.object
    };

    modifiers = {
        debit: ' -color_orange',
        credit: ' -color_green',
        saldo: ' -color_blue'
    }

    constructor(props) {
        super(props);
        this.state = {};
        props.graph.legend.forEach((item) => (this.state[item.get('id')] = true));
    }

    toggle = (name) => (e) => {
        const state = {};
        state[name] = !this.state[name];
        this.setState(state);
    }

    render() {
        return (
            <div className="house-stat_graph-wrap">
                <Graph graph={this.props.graph} curMonth={this.props.curMonth} curYear={this.props.curYear} modifiers={this.modifiers} toggleObj={this.state} />
                <GraphLegend list={this.props.graph.legend} toggleObj={this.state} toggle={this.toggle} modifiers={this.modifiers} actual={this.props.actual} />
            </div>
        );
    }
}

