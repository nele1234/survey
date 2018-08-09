var express = require('express')
var app = express()
var port = process.env.PORT || 3000

var mongojs = require('mongojs')
var db = mongojs('localhost:27017/survey', ['anketa'])

var body_parser = require('body-parser')
app.use(body_parser.json())

app.use(express.static(__dirname + '/static'))

app.get('/anketa', function (req, res) {
  db.tour.find(function (err, docs) {
    res.json(docs)
  })
})

app.listen(port, function () {
  console.log('Node app is running on port', port)
}}
