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
        path: '/test',
        component: Test,
        title: 'Тестовая страница',
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    },
];
