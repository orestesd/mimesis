var connect = require('connect'),
    http = require('http'),
    directory = 'app/';

var port = process.env.PORT || 9000;
connect()
    .use(connect.static(directory))
    .listen(port);

console.log('listening on %d', port);