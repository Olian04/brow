let i = 0;
const lines = [
    'a',
    'bb',
    'ccc',
    'dddd',
    'eeeee',
    'ffffff',
    'ggggggg'
];

setInterval(() => {
    console.log(lines[i++ % lines.length]);
}, 1000);