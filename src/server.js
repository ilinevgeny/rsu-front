import express  from 'express';
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

// Настраиваем путь для статичных файлов:
app.use(express.static('public'));

// @todo для нашего конкретного случая вытаскивать IP из заголовков.
// @todo отправлять логи в файл.
app.use(morgan('combined'));

app.use((req, res) => {
    const componentHTML = ReactDom.renderToString(<App />);

    return res.end(Template.render(componentHTML));
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
