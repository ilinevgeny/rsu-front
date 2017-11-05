import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { numberFormat } from '../../../Utils/helper';

export default class GraphLegend extends Component {
    // static propTypes = {
    //     list: PropTypes.array.isRequired,
    //     toggleObj: PropTypes.object.isRequired,
    //     toggle: PropTypes.func.isRequired,
    //     modifiers: PropTypes.object.isRequired,
    // };

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


                    <g className="grid-line -sep -blue">
                        <line x1="0" x2="20%" y1="30%" y2="40%" />
                    </g>

                    <g className="grid-line -sep -blue">
                        <line x1="20%" x2="40%" y1="40%" y2="30%" />
                    </g>
                </svg>
            </div>
        );
    }
}
