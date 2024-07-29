// var https = require('https');
// var fs = require('fs');

// const next = require('next')
// const port = parseInt(3001, 10) || config.getPort()
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev, dir: __dirname })
// const handle = app.getRequestHandler()


// var options = {
//     key: fs.readFileSync('ssl.key'),
//     cert: fs.readFileSync('ssl.crt'),
//     ca: [fs.readFileSync('root.crt')]
// };

// app.prepare().then(() => {
//     https.createServer(options, (req, res) => {
//         // handle ....
//     }).listen(port, err => {
//         if (err) throw err
//         console.log(`> Ready on localhost:${port}`)
//     })
// })


const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
        app.render(req, res, '/b', query)
      } else {
        handle(req, res, parsedUrl)
      }
    }).listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })