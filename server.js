#!/usr/bin/env node
require('better-logging')(console);
const path = require('path');
const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Setup database
const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = low(adapter);
db.defaults({ logs: [] })
  .write();

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

api.post('/logs', (req, res) => {
    if (req.body.version !== 1) {
        res.status(400).send('Bad Request: Unsupported version.');
    }
    req.body.logs.forEach(log => {
        db.get('logs')
            .push({ group: req.body.group, log })
            .write();
    });
    io.emit(`log`, { group: req.body.group, logs: req.body.logs });
    res.sendStatus(200);
});
api.get('/logs', (req, res) => {
    //TODO: Rewrite this so that it takes group into account
    const data = db
        .get('logs')
        .value();
    res.contentType('json').json(data);
});
api.get('/groups', (req, res) => {
    const data = db
        .get('logs')
        .value();
    res.contentType('json').json(
        Object.keys(data.reduce((res, v) => 
            ({...res, [v.group]: true}),{})
        )
    );
});

http.listen(10005, function(){
    console.info('Listening on localhost:10005');
  });