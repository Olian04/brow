# [brow](https://www.npmjs.com/package/@olian/brow)
CLI tool for real-time log monitoring in your browser

```
$ node helloworld.js | brow foobar
Mirroring logs at localhost:10005/?foobar
```

Navigate to `localhost:10005` and select "foobar" from the list and you will start seeing the logs from the `node index.js` process.

_(You dont have to provide your own group name, in the example above it was "foobar". If you dont provide one, the top most directory will be used as the group name. Everything piped under the same groupname will be treated as the same log as far as brow is concerned)_

## How to

1. Install brow: `npm i -g @olian/brow`
2. Spin up the brow server by running: `brow-server`, this will create a `.brow` directory in your home directory, this is where your brow config and database will live.
3. Use brow by piping anything into it: `echo Hello World | brow`

## Why

I started developing brow because I needed a tool that allowed me to collect logs from my home server in a single easy to reach place.
