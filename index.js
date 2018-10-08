const app = require('express')();
const lines = [];
app.get('/', (req, res) => {
    res.json(lines);
});

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
        lines.push(v);
        process.stdout.write('data: ' + v + '\n')
    });
});

process.stdin.on('end', () => {
    //process.stdout.write('end\n');
});

console.log('Mirroring logs at localhost:10005');
app.listen(10005);