// Create web server
//
// Usage:
//   var app = require('./comments.js');
//   app.listen(3000);
//
// API:
//   GET /comments
//   POST /comments
//   PUT /comments/:id
//   DELETE /comments/:id
//

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var comments = [
  { id: 1, author: "Pete Hunt", text: "This is one comment" },
  { id: 2, author: "Jordan Walke", text: "This is *another* comment" }
];

// GET /comments
app.get('/comments', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

// POST /comments
app.post('/comments', function(req, res) {
  var comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comment));
});

// PUT /comments/:id
app.put('/comments/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var comment = req.body;

  comments.forEach(function(c) {
    if (c.id === id) {
      c.author = comment.author;
      c.text = comment.text;
    }
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comment));
});

// DELETE /comments/:id
app.delete('/comments/:id', function(req, res) {
  var id = parseInt(req.params.id);

  comments = comments.filter(function(c) {
    return c.id !== id;
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

module.exports = app;