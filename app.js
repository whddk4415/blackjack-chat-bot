const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const request = require('./routes/request');
const callback = require('./routes/callback');

const app = express();

// mongoDB connect
mongoose.connect('mongodb://localhost/chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true)
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('Connected to mongod server');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/request', request);
app.use('/callback', callback);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ err });
});

app.listen(process.env.PORT || 3000, () =>
  console.log('ChatBot app listening on port 3000!'),
);

module.exports = app;
