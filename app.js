
var express = require('express');
var path = require('path');
var app = express();
const fs = require('fs');
const ejs = require('ejs');

//const connectHistoryApiFallback =require('connect-history-api-fallback');

//app.use('/', connectHistoryApiFallback())
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html',ejs.__express);
app.set('view engine', 'html');


app.listen(process.env.PORT || 5050,function(){
  console.log('okok,5050')
})

module.exports = app;
