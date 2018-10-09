const axios = require('axios').default;

const GROUP =  process.cwd();
const DEBUG = true;
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
        axios.post('/api/logs', {
            version: 1,
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

process.stdin.on('end', () => {
    //process.stdout.write('end\n');
});

console.log('Mirroring logs at localhost:10005');
