# brow
CLI tool for redirecting logs from the terminal into the browser.

```
$ node helloworld.js | brow
Redirecting stdout & stderr to localhost:10005
```

Navigate to `localhost:10005` and there will be a tab containing the logs from the `node index.js` process.

## Options

### --silent / -s

Prevents the info message from printing _("Mirroring stdout & stderr to localhost:10005")_. <br>
Usefull when piping the logs to another program after brow.

```
$ node index.js | brow --silent
```

### --echo / -e

Brow will echo anything recieved on stdin & stderr to the terminal as well as the browser.

```
$ node index.js | brow --echo
Redirecting stdout & stderr to localhost:10005
Hello World!
```

### --group \<id\>

Anything piped to the same group will show up in the same log tab.

```
$ echo Hello | brow --group 1
$ echo Hi | brow --group 2
$ echo World | brow --group 1
```
The example above whould result in `Hello World` in dummy process 1 and `Hi` in dummy process 2.
