const http = require('http');
const URL = require('url').URL;
const basket = ['milk', 'bread', 'eggs', 'flour'];
http.createServer((require, response) => {
    const url = new URL(require.url, 'http://localhost');
    const parameters = url.searchParams;
    const site = parseInt(parameters.get('itemNum'))
    response.writeHead(200, {
        'Content-Type' : 'text/plain'
    });
    response.end(`Here is your data: ${basket[site]}`);


}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');