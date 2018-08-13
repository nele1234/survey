var express = require('express')
var app = express()
var port = process.env.PORT || 3000

var mongojs = require('mongojs')
var db = mongojs('localhost:27017/survey', ['ankete'])

var body_parser = require('body-parser')
app.use(body_parser.json())

var urlencodedParser = body_parser.urlencoded({
  extended: false
})

app.use(express.static(__dirname + '/static'))

app.get('/anketa', function (req, res) {
  db.ankete.find(function (err, docs) {
    res.json(docs)
  })
})

app.post('/anketa', urlencodedParser, function (req, res, next) {
  console.log(req.body)

  db.ankete.insert(req.body, function (err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.listen(port, function () {
  console.log('Node app is running on port', port)
})
