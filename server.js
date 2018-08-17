var express = require('express')
var app = express()
var port = process.env.PORT || 3000

var mongojs = require('mongojs')
var db = mongojs('localhost:27017/survey', ['ankete',"users"])
const jwt_secret = 'WU5CjF8fHxG40S2t7oyk';
const jwt_admin = 'SJwt25Wq62SFfjiw92sR';
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var body_parser = require('body-parser')
app.use(body_parser.json())

var urlencodedParser = body_parser.urlencoded({
  extended: false
})

app.use(express.static(__dirname + '/static'))

app.use('/survey/',function(request,response,next){
  jwt.verify(request.get('JWT'), jwt_secret, function(error, decoded) {      
    if (error) {
      response.status(401).send('Unauthorized access');    
    } else {
      db.collection("users").findOne({'_id': new MongoId(decoded._id)}, function(error, user) {
        if (error){
          throw error;
        }else{
          if(user){
            next();
          }else{
            response.status(401).send('Credentials are wrong.');
          }
        }
      });
    }
  });  
})

app.use('/admin/',function(request,response,next){
    jwt.verify(request.get('JWT'), jwt_admin, function(error, decoded) {     
      if (error) {
        response.status(401).send('Unauthorized access'); 
        console.log(error);   
      } else {
        db.collection("users").findOne({'_id': new MongoId(decoded._id)}, function(error, users) {
          if (error){
            throw error;
          }else{
            if(users){
              next();
            }else{
              response.status(401).send('Credentials are wrong.');
            }
          }
        });
      }
    });  
  })

app.post('/login', function(req, res) {
    var user = req.body;
    db.collection('users').findOne({
        'email': user.email,
    }, function(error, users) {
        if (error) {
            throw error;
        } 
        if(users) {
            bcrypt.compare(user.password, users.password, function(err, resp){
                if(resp === true){
                    if(users.type == "admin"){
                        var token = jwt.sign(users, jwt_admin, {
                            expiresIn: 60*60*24
                        });
                        res.send({
                            success: true,
                            message: 'Admin Authenticated',
                            token: token,
                            type : 'admin'
                        })
                        console.log("Admin authentication passed.");
                    }
                    else if(users.type == "user"){
                      users.password=null; 
                      var token = jwt.sign(users, jwt_secret, {
                            expiresIn: 60*60*24
                        });
                        res.send({
                            success: true,
                            message: 'Authenticated',
                            token: token,
                            type: "user"
                        })
                        console.log("Authentication passed.");
                    }
                }
                else {
                    res.send({
                        user : false
                    })
                }
            })
        }
    });
});

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


app.post('/register', function(req, res, next) {
  req.body.type = "user";
  req.body._id = null;
  var user = req.body;
  var find = req.body.email;
  console.log(find);
  bcrypt.hash(user.password, 10, function(err, hash) {
      user.password = hash;
      db.collection('users').find({
        email : find
      }).toArray(function (err,result){
        if(err) throw err;

        console.log(result);

        if(result.length > 0){
          res.sendStatus(204);
        } else {
          db.collection('users').insert(user, function(err, data) {
              if (err) return console.log(err);
              res.setHeader('Content-Type', 'application/json');
              res.send(user);
          })
        }
      })

  })
});

app.listen(port, function () {
  console.log('Node app is running on port', port)
})

