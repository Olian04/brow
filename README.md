# brow
CLI tool for redirecting logs from the terminal into the browser.

```
$ node helloworld.js | brow foobar
Redirecting stdout & stderr to localhost:10005/#foobar
```

Navigate to `localhost:10005` and select "foobar" from the list and you will start seeing the logs from the `node index.js` process.

_(You dont have to provide your own group name, in the example above it was "foobar". If you dont provide one, the top most folder will be selected for the group)_
