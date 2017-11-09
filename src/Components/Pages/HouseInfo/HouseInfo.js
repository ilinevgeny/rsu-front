import React from 'react';
import { connect } from 'react-redux';
import PageComponent from '../../App/PageComponent';
import PageLayout from "../../Decorators/PageLayout";
import LeftAside from '../Aside/LeftAside';
import InviteForm from '../../Partials/InviteForm';
import GraphWrap from './GraphWrap';
import BillsTable from './BillsTable';
import {houseLoader} from '../../../Reducers/Requests/housesRequest'

class HouseInfo extends PageComponent {
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
        if (this.props.info === null) {
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
                <BillsTable billsList={[]}/>    
            </section>
        );
    }
}

export default connect(
    (s, {match}) => ({
            id: match.params.id,
            info: s.houses.getIn(['infoDict', match.params.id]) || null,
            loading: s.houses.get('loading')
    }),
    {houseLoader}
)( PageLayout(LeftAside, HouseInfo) );
