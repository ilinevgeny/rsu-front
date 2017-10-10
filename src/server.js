import express  from 'express';
import compress from 'compression';
import morgan   from 'morgan';
import React    from 'react';
import ReactDom from 'react-dom/server';
import App      from './Components/App';
import manifest from '../public/assets/manifest';
import Layout   from './layout';

const app = express();
const mode = (process.env.NODE_ENV && process.env.NODE_ENV.replace(/[^A-Z]/ig, '')) || 'production';
const PORT = process.env.PORT || (mode === 'production' ? 3333 : 3003);

const Template = new Layout(manifest, mode === 'production');

// @todo для нашего конкретного случая вытаскивать IP из заголовков.
// @todo отправлять логи в файл.
app.use(morgan('combined'));

// Сжимаем файлы
app.use(compress());

// Настраиваем путь для статичных файлов:
app.use(express.static('public', {
    maxage: '1Y'
}));

app.use( (req, res) => res.end(Template.render( ReactDom.renderToString(<App />) )) );

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
