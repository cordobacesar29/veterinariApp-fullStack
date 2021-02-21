const http = require('http');
const requestHandler = require('./request-handler');
const server = http.createServer(requestHandler);

server.listen(5000, () => {
    console.log('el servidor está funcionando');
});