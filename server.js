// server.js
// where your node app starts

// init project
var express = require('express')
var app = express()
var path = require('path')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api/timestamp/:date_string?', function (req, res) {
  const DATE_STRING = req.params.date_string
  // console.log(DATE_STRING)
  let myDate
  if (DATE_STRING) {
    myDate = new Date(DATE_STRING)
  } else {
    myDate = new Date()
  }
  if (myDate === 'Invalid Date') {
    res.json({ error: myDate })
  } else {
    res.json({ unix: myDate.getTime(), utc: `${myDate.toUTCString()}` })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
