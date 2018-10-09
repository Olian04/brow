require('better-logging')(console);
const express = require('express');

const api = express();
const app = express();

// TODO: Add groups
// TODO: Use xterm for visuals

const DARK = method => console.color.Dark_Gray + method + console.color.RESET;
app.use(express.json());
app.use((req, res, next) => {
    console.info(DARK(req.method), req.url, 
        Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '');
    next();
});
app.get('/', express.static('public'));
app.use('/api', api);

const lines = [];
api.post('/logs', (req, res) => {
    if (req.body.version !== 1) {
        res.status(400).send('Bad Request: Unsupported version.');
    }
    req.body.logs.forEach(log => {
        lines.push(log);
    });
});
api.get('/logs', (req, res) => {
    res.contentType('json').json(lines);
});

console.info('Listening on localhost:10005');
app.listen(10005);