const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Extract parameters from the query string
    const operation = pathname.slice(1); // Remove leading '/'
    const a = parseFloat(query.a);
    const b = parseFloat(query.b);

    let result;
    switch (operation) {
        case 'add':
            result = a + b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        case 'divide':
            result = a / b;
            break;
        default:
            result = 'Operation not supported';
    }

    // the result
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ operation, a, b, result }));
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
