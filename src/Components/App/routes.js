import Home from '../Pages/Home';
import HouseInfo from '../Pages/HouseInfo';
import Error from './Error';
import { listLoader } from '../../Reducers/Requests/housesRequest'

export default  [
    {
        path: '/',
        exact: true,
        component: Home,
        title: 'Главная страница',
        fetchData: listLoader
    },
    {
        path: '/?search=',
        exact: true,
        component: Home,
        title: 'Главная страница',
        fetchData: listLoader
    },
    {
        path: '/?search=:search',
        exact: true,
        component: Home,
        title: 'Главная страница',
        fetchData: listLoader
    },
    {
        path: '/house/:id?/:year?/:month?',
        component: HouseInfo,
        title: 'Инфо о доме',
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    },
];
