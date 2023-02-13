const http = require("http");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // home route
    if (url === '/') {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head>");
        res.write("<title>Welcome User</title>");
        res.write("</head>");
        res.write("<body>");
        res.write("<h1>Welcome User</h1>");
        res.write("<body>");
        res.write("</html>");
        return res.end();
    }

    // user route
    if (url === '/users') {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head>");
        res.write("<title>List of Some Users</title>");
        res.write("</head>");
        res.write("<body>");
        res.write("<ul>");
        res.write("<h1>Some Users</h1>");
        res.write("<li>Hi Max</li>");
        res.write("<li>Hi Ali</li>");
        res.write("<li>Hi Jane</li>");
        res.write("<li>Hi Yousha</li>");
        res.write("<li>Hi Manu</li>");
        res.write("<li>Hi Stephen</li>");
        res.write("</ul>");
        res.write("<body>");
        res.write("</html>");
        return res.end();
    }

    // create a user
    if (url === '/create-user') {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head>");
        res.write("<title>Create A User</title>");
        res.write("</head>");
        res.write("<body>");
        res.write("<form action='/message' method='POST' >");
        res.write("<label>Username</label>");
        res.write("<input type='text'  name=message />");
        res.write("<button type='submit' >Send</button>");
        res.write("</form>");
        res.write("<body>");
        res.write("</html>");
        return res.end();
    }

    // parse data
    if (url === '/message' && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const data = parsedBody.split("=")[1].replaceAll("+", " ");
            console.log(data);

            res.statusCode = 302;
            res.setHeader('Location', "/");
            return res.end();
        });
    }

})

server.listen(3001);