// app.js
// where your node app starts

// init project
const express = require('express')
const app = express()
// const path = require('path')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
/* app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
}) */

app.get('/api/timestamp/:date_string?', function (req, res) {
  const dateString = req.params.date_string
  // console.log(DATE_STRING)
  let myDate
  if (dateString) {
    myDate = new Date(dateString)
  } else {
    myDate = new Date()
  }
  console.log(myDate.getTime())
  if (isNaN(myDate.getTime())) {
    res.json({ error: 'Invalid Date' })
  } else {
    res.json({ unix: myDate.getTime(), utc: `${myDate.toUTCString()}` })
  }
})

module.exports = app
