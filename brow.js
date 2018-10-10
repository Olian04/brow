#!/usr/bin/env node
const axios = require('axios').default;

const DEBUG = false;
try {
    const GROUP = process.argv[2] || process.cwd().split('/').reverse()[0];
    const SHOULD_ECHO = true;
    const forEachLine = (stream, cb) => {
        const chunk = stream.read();
        if (chunk !== null) {
            chunk.toString()
                .split('\n')
                .filter(v => v.length > 0)
                .forEach(cb);
        }
    }
    process.stdin.on('readable', () => {
        forEachLine(process.stdin, v => {
            if (SHOULD_ECHO) {
                process.stdout.write(v + '\n'); // Echo
            }
            axios.post(`/api/logs`, {
                version: 1,
                group: GROUP,
                logs: [v]
            }, {
                baseURL: 'http://localhost:10005'
            }).catch(e => {
                if (DEBUG) {
                    console.error(e);
                }
            });
        });
    });

    console.log(`Mirroring logs at localhost:10005/?${GROUP}`);
} catch (e) {
    if (DEBUG) {
        throw e;
    }
}
