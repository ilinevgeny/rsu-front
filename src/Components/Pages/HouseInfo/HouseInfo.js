import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageComponent from '../../App/PageComponent';
import PageLayout from "../../Decorators/PageLayout";
import LeftAside from '../Aside/LeftAside';
import InviteForm from '../../Partials/InviteForm';
import GraphWrap from './GraphWrap';
import BillsTable from './BillsTable';
import {houseLoader} from '../../../Reducers/Requests/housesRequest'

class HouseInfo extends PageComponent {
    static propTypes = {
        curYear: PropTypes.string,
        curMonth: PropTypes.string,
        transactions: PropTypes.array,
        debitDiagram: PropTypes.object,
        creditDiagram: PropTypes.object
        // loading: PropTypes.bool.isRequired,
        // loaded: PropTypes.bool.isRequired,
        // listLoader: PropTypes.func.isRequired,
        // search: PropTypes.string,
    };

    setHouseTitle(props) {
        if (props.info) {
            this.setTitle(props.route.title + ' | ' + props.info.address);
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
        const {curMonth, curYear, transactions, info, creditDiagram, debitDiagram} = this.props
        if (info === null) {
            return '';
        }

        return (
            <section className="content">
                <div className="header">
                    <h1 className="title -content-padding">Узнайте все о состоянии счета вашего дома</h1>
                    <div className="invite-wrap">
                        <InviteForm toggleable={true} />
                    </div>
                </div>
                <div className="house-info-wrap">
                    <div className="house-info">
                        <div className="house-info_text -gothic-text">{this.props.info.address}</div>
                        <div className="house-info_image"><img width='100%' src={this.props.info.img.front} /></div>
                    </div>
                    <div className="house-stat">
                        <div className="house-stat_select-bar">
                            <select className="input -select -inline">
                                <option value="1">Январь</option>
                                <option value="2">Февраль</option>
                                <option value="3">Март</option>
                                <option value="4">Апрель</option>
                            </select>
                            <select className="input -select -inline">
                                <option value="2017">2017&nbsp;&nbsp;</option>
                                <option value="2016">2016&nbsp;&nbsp;</option>
                                <option value="2015">2015&nbsp;&nbsp;</option>
                                <option value="2014">2014&nbsp;&nbsp;</option>
                                <option value="2013">2013&nbsp;&nbsp;</option>
                            </select>
                        </div>
                        <div className="house-stat_notice -color_grey">
                            Поступления и расходы отобразятся за выбранный месяц
                        </div>
                        <GraphWrap />
                    </div>
                </div>
                <BillsTable billsList={transactions} creditDiagram={creditDiagram} debitDiagram={debitDiagram}/>
            </section>
        );
    }
}

function stateToProps(s, {match}) {
    let curYear = null;
    let curMonth = null;
    let transactions = [];
    let debitDiagram = null;
    let creditDiagram = null;

    const id = match.params.id
    const info = s.houses.getIn(['infoDict', id]) || null;

    if (info) {
        curYear = info.curYear;
        curMonth = info.curMonth;
        transactions = info.bills.getIn([curYear, curMonth, 'transactions']) || []
        debitDiagram = info.bills.getIn([curYear, curMonth, 'debitDiagram'])
        creditDiagram = info.bills.getIn([curYear, curMonth, 'creditDiagram'])
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
    }
}

export default connect(
    stateToProps,
    {houseLoader}
)( PageLayout(LeftAside, HouseInfo) );
