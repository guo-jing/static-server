const http = require('http');
const fs = require('fs');
const p = require('path');

module.exports.start = (path) => {
    console.log('path');
    console.log(path);
    console.log('fs.existsSync(path)');
    console.log(fs.existsSync(path));
    const server = http.createServer();

    server.on('request', (request, response) => {
        let requestPath = request.url.substr(1);
        let filePath = p.join(path, requestPath);
        fs.readFile(filePath, {flag: 'r'}, (error, data) => {
            if (error && error.code === 'ENOENT') {
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
};