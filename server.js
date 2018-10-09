require('better-logging')(console);
const express = require('express');

const api = express();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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
        lines.push({ group: req.body.group, log });
    });
    io.emit(`log`, { group: req.body.group, logs: req.body.logs });
    res.sendStatus(200);
});
api.get('/logs', (req, res) => {
    res.contentType('json').json(lines);
});
api.get('/groups', (req, res) => {
    res.contentType('json').json(
        Object.keys(lines.reduce((res, v) => 
            ({...res, [v.group]: true}),{})
        )
    );
});

http.listen(10005, function(){
    console.info('Listening on localhost:10005');
  });