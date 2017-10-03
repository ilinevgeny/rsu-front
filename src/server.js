import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3001;

// @todo для нашего конкретного случая вытаскивать IP из заголовков.
// @todo отправлять логи в файл.
app.use(morgan('combined'));

app.use(express.static('public'));
app.use((req, res) => {
    res.end('<p>Hello World!</p>');
});
app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});
