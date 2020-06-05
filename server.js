const http = require('http');
const app = require('./index');
console.log('APPPPP');
const cors = require('cors');
let server = http.createServer(app);

server.listen(6061, function () {
	console.log('Server started at 6061');
});
