// include express framework:
var express = require('express');
var app = express();

// serve an html file from the public folder (default name: index.html):
app.use(express.static('public'));

// server listens to port 3000 (the anonymous callback symbol is =>):
app.listen(3000, () => console.log('Listening at port 3000'));
