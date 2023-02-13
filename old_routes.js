const fs = require('fs'); // file server for storing and doing file manipulations

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Submit form </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send Form</button></form></body>'); // name for inputs are must to access data in server.
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk)=> {
            console.log('chunk is', chunk);
            body.push(chunk);
        });
        return req.on('end', () => { // done when parsing req // if not returned it leads to error with line 45 and 39
            const parsedObj = Buffer.concat(body).toString(); // buffer is used to handle the chunks of request
            console.log('parsedBody', parsedObj);
            const message = parsedObj.split('=')[1];
            // fs.writeFileSync('message.txt', message); // this line block the next lines of code till its done as its a synchronous operation.
            fs.writeFile('message.txt', message, (error) => { // error can be null if no errors occur - it also gives asynchronous nature of nodejs to hadnle data without blocking any other requests.
                res.statusCode = 302; // only return once its task is done
                res.setHeader('Location', '/');
                return res.end();
            });
    
            // res.statusCode = 302; // for redirection code
            // res.setHeader('Location', '/');
            // return res.end();
        });
         
    }
    // process.exit() // to exit the request listening of server === shutting down the program
    res.setHeader('Content-Type', 'text/html');
    
    //default way to send response:
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my nodejs server</body>');
    res.write('</html>');
    res.end(); // tell that response has been written by server
}

// module.exports = requestHandler;

// module.exports.handler = requestHandler;

// exports.handler = requestHandler;

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
}