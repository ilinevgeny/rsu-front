import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import PageComponent from '../../App/PageComponent';
import PageLayout from "../../Decorators/PageLayout";
import LeftAside from '../Aside/LeftAside';
import InviteForm from '../../Partials/InviteForm';
import GraphWrap from './GraphWrap';
import BillsTable from './BillsTable';
import {houseLoader, loadMonth} from '../../../Reducers/Requests/housesRequest'

class HouseInfo extends PageComponent {
    static propTypes = {
        id: PropTypes.string,
        curYear: PropTypes.string,
        curMonth: PropTypes.string,
        transactions: PropTypes.array,
        debitDiagram: PropTypes.object,
        creditDiagram: PropTypes.object,
        graph: PropTypes.object
    };

    yearChange = (e) => {
        const selectedYear = e.target.value;
        let selectedMonth = this.props.curMonth;

        if (!this.props.info.getIn(['bills', selectedYear, selectedMonth])) {
            selectedMonth = this.props.info.getIn(['bills', selectedYear]).keySeq().toArray()[0];
        }
        this.props.loadMonth(this.props.id, selectedYear, selectedMonth);
    }

    monthChange = (e) => {
        this.props.loadMonth(this.props.id, this.props.curYear, e.target.value);
    }

    setHouseTitle(props) {
        if (props.info) {
            this.setTitle(props.route.title + ' | ' + props.info.get('address'));
        }
    }

    componentWillMount() {
        super.componentWillMount();
        this.setHouseTitle(this.props);
        if (!this.props.loading && this.props.info === null) {
            this.props.houseLoader({id: this.props.id});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setHouseTitle(nextProps);
    }

    render() {
        const {curMonth, curYear, transactions, info, creditDiagram, debitDiagram, graph} = this.props
        if (info === null) {
            return '';
        }

        return (
            <section className="content">
                <div className="header">
                    <h1 className="title -content-padding">Узнайте все о состоянии счета вашего дома</h1>
                    <div className="invite-wrap">
                        <InviteForm />
                    </div>
                </div>
                <div className="house-info-wrap">
                    <div className="house-info">
                        <div className="house-info_text -gothic-text">{this.props.info.get('address')}</div>
                        <div className="house-info_image"><img width='100%' src={this.props.info.get('img').front} /></div>
                    </div>
                    <div className="house-stat">
                        <div className="house-stat_select-bar">
                            <select className="input -select -inline" name="month" onChange={this.monthChange}>
                                {info.getIn(['bills', curYear]).keySeq().toArray().map(value => <option key={value} value={value}>{moment(value, "MM").locale("ru_RU").format("MMMM")}</option>)}
                            </select>
                            <select className="input -select -inline" name="year" onChange={this.yearChange}>
                                {info.get('bills').keySeq().toArray().map(value => <option key={value} value={value}>{value}&nbsp;&nbsp;</option>)}
                            </select>
                        </div>
                        <div className="house-stat_notice -color_grey">
                            Поступления и расходы отобразятся за выбранный месяц
                        </div>
                        <GraphWrap graph={graph} curMonth={curMonth} curYear={curYear}/>
                    </div>
                </div>
                <BillsTable billsList={transactions} creditDiagram={creditDiagram} debitDiagram={debitDiagram}/>
            </section>
        );
    }
}

function stateToProps(s, location) {
    let curYear = null;
    let curMonth = null;
    let transactions = [];
    let debitDiagram = null;
    let creditDiagram = null;
    let points = null;
    let graph = null;

    const id = location.match.params.id
    const info = s.houses.getIn(['infoDict', id]) || null;

    if (info) {
        curYear = info.get('curYear');
        curMonth = info.get('curMonth');

        transactions = info.getIn(['bills', curYear, curMonth, 'transactions']) || []
        debitDiagram = info.getIn(['bills', curYear, curMonth, 'debitDiagram'])
        creditDiagram = info.getIn(['bills', curYear, curMonth, 'creditDiagram'])
        graph = info.getIn(['bills', curYear, curMonth, 'graph'])
    }

    return {
        id,
        info,
        loading: s.houses.get('loading'),
        curYear,
        curMonth,
        transactions,
        debitDiagram,
        creditDiagram,
        points,
        graph,
        location
    }
}

export default connect(
    stateToProps,
    {houseLoader, loadMonth}
)( PageLayout(LeftAside, HouseInfo) );
