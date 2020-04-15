import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const server = http.createServer();

server.on('request', (request, response) => {
    let requestPath = request.url.substr(1);
    let filePath = path.join('public', requestPath);
    fs.readFile(filePath, {flag: 'r'}, (error, data) => {
        console.log('filePath');
        console.log(filePath);
        if (error && error.errno === -2) {
            fs.readFile('404.html', {flag: 'r'}, (error, data) => {
                response.end(data.toString());
                return;
            })
        } else {
            response.end(data.toString());
        }
    })
});

server.listen(8888);