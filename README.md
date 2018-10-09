# [brow](https://www.npmjs.com/package/@olian/brow)
CLI tool for mirroring logs from the terminal in the browser.

```
$ node helloworld.js | brow foobar
Mirroring logs at localhost:10005/#foobar
```

Navigate to `localhost:10005` and select "foobar" from the list and you will start seeing the logs from the `node index.js` process.

_(You dont have to provide your own group name, in the example above it was "foobar". If you dont provide one, the top most directory will be used as the group name)_

## How to

1. Install brow: `npm i -g @olian/brow`
2. Spin up the brow server by running: `brow-server <path_to_store_database>` but replace `<path_to_store_database>` with a path relative to your current directory. Ex: `brow-server .` will create a `brow.db.json` file in the current directory.
3. Use brow by piping anything into it: `echo Hello World | brow`
