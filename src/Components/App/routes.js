import Home from '../Pages/Home';
import Test from '../Test';
import Error from './Error';

export default  [
    {
        path: '/',
        exact: true,
        component: Home,
        title: 'Главная страница',
    },
    {
        path: '/house/:id',
        component: Test,
        title: 'Инфо о доме',
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    },
];
