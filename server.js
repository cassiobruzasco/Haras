var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/scripts', express.static(__dirname + '/../node_modules'));
app.use('/bundle', express.static(__dirname + '/bundle'));
app.use('/app', express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/haras');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

//Models
var Customer = require('./server/models/customer.js');

// check for DB errors
db.on('error', console.error.bind(console, 'connection error:'));

// check DB connection
db.once('open', function () {
  console.log('Connected to MongoDB');

  // select all
  app.get('/customers', function (req, res) {
    Customer.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });

  // create
  app.post('/customers', function (req, res) {
    var obj = new Customer(req.body);
    obj.save(function (err, obj) {
      if (err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find by name
  app.get('/customers/:id', function (req, res) {
    Customer.findOne({ _id: req.params.id }, function (err, obj) {
      if (err) return console.error(err);
      res.json(obj);
    })
  });

  // update by id
  app.put('/customers/:id', function (req, res) {
    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/customers/:id', function (req, res) {
    Customer.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    });
  });

  // all other routes are handled by Angular
  app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
  });

  app.listen(app.get('port'), function () {
    console.log('MEAN app listening on port ' + app.get('port'));
  });

});