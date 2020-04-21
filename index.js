const http = require('http');
const fs = require('fs');
const p = require('path');

module.exports.start = (path, port) => {
    if(!fs.existsSync(path)) {
        console.log(`指定路径：${path} 不存在`)
        return
    }
    port = parseInt(port);
    if(isNaN(port) || port < 1024 || port > 65535) {
        console.log(`端口必须在 1024~65535 之间`)
        return
    }
    const server = http.createServer();

    server.on('error', (error) => {
        if(error && error.code === 'EADDRINUSE') {
            console.log(`端口：${port} 被占用`)
        }
    })

    server.on('request', (request, response) => {
        let requestPath = request.url.substr(1);
        let filePath = p.join(path, requestPath);
        console.log('filePath')
        console.log(filePath)
        fs.readFile(filePath, {flag: 'r'}, (error, data) => {
            if (error && error.code === 'ENOENT') {
                fs.readFile(p.join(__dirname, '404.html'), {flag: 'r'}, (error, data) => {
                    response.end(data.toString());
                    return;
                })
            } else {
                response.end(data.toString());
            }
        })
    });

    server.listen(port, () => {
        console.log('启动成功');
    });
};