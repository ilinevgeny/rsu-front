import React from 'react';
import {connect} from 'react-redux';
import PageComponent from '../../App/PageComponent';
import PageLayout  from '../../Decorators/PageLayout';
import LeftAside from '../Aside/LeftAside';
import RightAside from '../Aside/RightAside';


class Home extends PageComponent {
    render() {
        return (
            <section className="content">
                <h1 className="title -content-padding">Узнайте все о состоянии счета вашего дома</h1>
                <div className="-content-padding">
                    <form className="search-form">
                        <input className="input -light-focus -right-padding" type="text" name="query" placeholder="введите адрес" />
                        <input className="search-submit" type="submit" value="" />
                    </form>
                </div>
                <div className="info -content-padding -gothic-text -color_grey">Мы открываем для каждого дома отдельный расчетный счет в банке. Как будто у дома есть своя карточка. Все средства от жителей приходят на этот счет, и все платежи поставщикам уходят также с него. Средства, собранные на счет вашего дома, не могут быть направлены на нужды другого.</div>
                <div className="gallery">
                    <div className="gallery-item">
                        <div className="gallery-item_img" />
                        <div className="gallery-item_text -gothic-text">Московский пр-т, 57, корп. 1</div>
                    </div>
                    <div className="gallery-item">
                        <div className="gallery-item_img" />
                        <div className="gallery-item_text -gothic-text">Московский пр-т, 57, корп. 1</div>
                    </div>
                    <div className="gallery-item">
                        <div className="gallery-item_img" />
                        <div className="gallery-item_text -gothic-text">Московский пр-т, 57, корп. 1</div>
                    </div>
                    <div className="gallery-item">
                        <div className="gallery-item_img" />
                        <div className="gallery-item_text -gothic-text">Московский пр-т, 57, корп. 1</div>
                    </div>
                    <div className="gallery-item">
                        <div className="gallery-item_img" />
                        <div className="gallery-item_text -gothic-text">Московский пр-т, 57, корп. 1</div>
                    </div>
                    <div className="gallery-item">
                        <div className="gallery-item_img" />
                        <div className="gallery-item_text -gothic-text">Московский пр-т, 57, корп. 1</div>
                    </div>
                </div>
            </section>
        );
    }
}

export default PageLayout(LeftAside, Home, RightAside);

// export default connect(
//     s => ({
//         users: s.users.get('list')
//     })
// )(Test);
