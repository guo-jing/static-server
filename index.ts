import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const server = http.createServer();

server.on('request', (request, response) => {
    let requestPath = request.url.substr(1);
    let filePath = path.join('public', requestPath);
    fs.readFile(filePath, {flag: 'a+'}, (error, data) => {
        response.end(data.toString());
    })
});

server.listen(8888);