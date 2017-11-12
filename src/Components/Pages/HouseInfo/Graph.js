import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import {numberFormat} from "../../../Utils/helper";

export default class Graph extends Component {
    static propTypes = {
        graph: PropTypes.object,
        curMonth: PropTypes.string,
        curYear: PropTypes.string,
        modifiers: PropTypes.object,
        toggleObj: PropTypes.object.isRequired,
    };


    getX(point, xScale) {


        return numberFormat(parseFloat(point) * xScale, 2, '.') + '%';
    }

    getY(point, yScale) {
        let y = Math.abs(parseFloat(point) * yScale - 99);
        return numberFormat(  y > 1 ? y : 1 , 2, '.') + '%';
    }

    renderLines() {
        const {curYear, curMonth, graph:{sums, points:{saldo, credit, debit}}, toggleObj} = this.props

        const daysInMouth = moment(`${curYear}-${curMonth}`, 'YYYY-MM').daysInMonth();

        const xScale = 100 / daysInMouth;
        const yScale = 100 / sums.max();

        console.log(sums, sums.max(), xScale, yScale);

        return <g>
            {toggleObj.saldo ? <g className="grid-line -sep -blue">{this.renderLine(saldo, xScale, yScale)}</g> : ''}
            {toggleObj.credit ? <g className="grid-line -sep -green">{this.renderLine(credit, xScale, yScale)}</g> : ''}
            {toggleObj.debit ? <g className="grid-line -sep -orange">{this.renderLine(debit, xScale, yScale)}</g> : ''}
        </g>
    }

    renderLine(mapList, xScale, yScale) {
        let lastX = null, lastY = null;

        return mapList.map((sum, day) => {
            let line = null;
            if (lastX !== null) {
                line = <line key={sum + day} x1={this.getX(lastX, xScale)} x2={this.getX(day, xScale)} y1={this.getY(lastY, yScale)} y2={this.getY(sum, yScale)} />
                lastX = day; lastY = sum;
                return line;
            }
            lastX = day; lastY = sum;
            return line;
        }).valueSeq().toArray();
    }

    render() {
        return (
            <div className="graph">
                <svg className="grid" >
                    <g className="grid-line">
                        <line x1="0" x2="0" y1="0" y2="100%" />
                    </g>
                    <g className="grid-line">
                        <line x1="0" x2="100%" y1="100%" y2="100%" />
                    </g>
                    <g className="grid-line">
                        <line x1="100%" x2="100%" y1="0" y2="100%" />
                    </g>

                    <g className="grid-line -sep">
                        <line x1="33.33%" x2="33.33%" y1="0" y2="100%" />
                    </g>

                    <g className="grid-line -sep">
                        <line x1="66.66%" x2="66.66%" y1="0" y2="100%" />
                    </g>
                    {this.renderLines()}
                </svg>
            </div>
        );
    }
}
