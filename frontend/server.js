var https = require('https');
var fs = require('fs');

const next = require('next')
const port = parseInt(3001, 10) || config.getPort()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()


var options = {
    key: fs.readFileSync('ssl.key'),
    cert: fs.readFileSync('ssl.crt'),
    ca: [fs.readFileSync('root.crt')]
};

app.prepare().then(() => {
    https.createServer(options, (req, res) => {
        // handle ....
    }).listen(port, err => {
        if (err) throw err
        console.log(`> Ready on localhost:${port}`)
    })
})