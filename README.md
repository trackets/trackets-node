# Trackets-Node

**WARNING: This is pre-release and still not ready for production use.**

Trackets.com client library for Node

## Installation

```sh
npm install trackets --save
```

## Usage

```javascript
var trackets = require('trackets')('private-api-key');

var err = new Error('Something went wrong');
trackets.notify(err);
```

### Express 4.x

To use Trackets error handling middleware, after all of your routes, add

```javascript
app.use(trackets.expressHandler());
```
