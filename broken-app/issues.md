# Broken App Issues

-   The original version of the app did not have app.js, routes.js and server.js split up into separate files, which makes debugging and testing more challenging.
-   I don't think JSON.stringify is the correct method to use with the return value from a route
-   Variable scoping was inconsistent - most variables here can be declared with const

Original code:

```
const express = require('express');
let axios = require('axios');
var app = express();

app.post('/', function(req, res, next) {
  try {
    let results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch {
    next(err);
  }
});

app.listen(3000);
```
