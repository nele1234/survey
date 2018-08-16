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
app.delete('/deleteSurvey/:id', function (req, res) {
  var id = req.params.id
  console.log(id)
  db.ankete.remove({
    _id: mongojs.ObjectId(id)
  }, function (err, doc) {
    console.log('Survey removed')
    res.json(doc)
  })
})
app.get('/ankete/:id', urlencodedParser, function (req, res) {
  var id = req.params.id
  console.log(id)
  db.ankete.findOne({
    _id: mongojs.ObjectId(id)
  }, function (err, doc) {
    console.log('selected')
    res.json(doc)
  })
})

app.put('/ankete/:id', function (req, res) {
  var id = req.params.id
  console.log(req.body)
  db.ankete.findAndModify({
    query: {
      _id: mongojs.ObjectId(id)
    },
    update: {
      $set: {
        name: req.body.name,
        question1: req.body.question1,
        answer11: req.body.answer11,
        answer12: req.body.answer12,
        answer13: req.body.answer13,
        answer14:req.body.answer14,
        question2:req.body.question2,
        answer21:req.body.answer21,
        answer22:req.body.answer22,
        answer23:req.body.answer23,
        answer24:req.body.answer24
      }
    },
    new: true
   },
   function (err, doc) {
    console.log('updated')
    res.json(doc)
  } )
})


app.post('/registracija', urlencodedParser, function (req, res, next) {
  console.log(req.body)

  db.registration.insert(req.body, function (err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.listen(port, function () {
  console.log('Node app is running on port', port)
})

