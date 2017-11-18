import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageComponent from '../../App/PageComponent';
import {Loader} from '../../Partials/Loader'
import PageLayout  from '../../Decorators/PageLayout';
import LeftAside from '../Aside/LeftAside';
import RightAside from '../Aside/RightAside';
import {listLoader} from '../../../Reducers/Requests/housesRequest'
import {getParameterByName} from '../../../Utils/helper'

class Home extends PageComponent {
    static propTypes = {
        housesList: PropTypes.array,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        listLoader: PropTypes.func.isRequired,
        search: PropTypes.string,
    };

    state = {};

    constructor(props) {
        super(props);
        this.state.search = props.search;
        if (this.isBrowser()) {
            let search = getParameterByName('search');

            if (search !== props.search) {
                this.state.search = search || '';
            }
        }
    }

    _onSubmit = (e) => {
        e.preventDefault();
        this.history.replace({search: 'search=' + this.state.search});

        this.props.listLoader({search: this.state.search});
    }

    _onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentWillReceiveProps(nextProps) {
        this.state.search = nextProps.search;
    }

    componentWillMount() {
        super.componentWillMount();
        const {listLoader, loading, loaded} =  this.props;
        if (!loading && !loaded) {
            listLoader({search: this.state.search});
        }
    }

    renderList() {
        if (this.props.loading || !this.props.loaded ) {
            return <div className="gallery_loader"><Loader /></div>
        }
        if (!this.props.housesList || this.props.housesList.length === 0) {
            return <div className="gallery_not-found">По вашему запросу "{this.props.search}" не найдено ни одного дома.</div>
        }

        return <div className="gallery">
            { this.props.housesList.map((item) => (
                <Link className="gallery-item_wrap" key={item.id} to={`/house/${item.id}`}><div className="gallery-item">
                    <div className="gallery-item_img"><img width='100%' src={item.imgs.front} /></div>
                    <div className="gallery-item_text -gothic-text">{item.short_address}</div>
                </div></Link>
            ))}
        </div>;
    }

    render() {
        return (
            <section className="content">
                <h1 className="title -content-padding">Узнайте все о состоянии счета вашего дома</h1>
                <div className="-content-padding">
                    <form className="search-form" onSubmit={this._onSubmit}>
                        <input className="input -light-focus -right-padding" type="text" value={this.state.search} name="search" placeholder="введите адрес" onChange={this._onChange}/>
                        <input className="search-submit" type="submit" value="" />
                    </form>
                </div>
                <div className="info -content-padding -gothic-text -color_grey">Мы открываем для каждого дома отдельный расчетный счет в банке. Как будто у дома есть своя карточка. Все средства от жителей приходят на этот счет, и все платежи поставщикам уходят также с него. Средства, собранные на счет вашего дома, не могут быть направлены на нужды другого.</div>
                <div className="gallery_wrap">{this.renderList()}</div>
            </section>
        );
    }
}


export default connect(
    (s, location) => ({
         housesList: s.houses.get('list'),
         loading: s.houses.get('loading'),
         loaded: s.houses.get('loaded'),
         search: s.houses.get('search'),
         location
     }),
    {listLoader}
 )( PageLayout(LeftAside, Home, RightAside) );
