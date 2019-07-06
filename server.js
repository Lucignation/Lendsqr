const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/Lendsqr';

const userRoute = require('./routes/user');
const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    if (!req.token) {
      return next();
    }
    User.findById(req.token.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });


app.use(userRoute);

const PORT = 8080;

Mongoose.connect(MONGODB_URI, {useNewUrlParser:true})
app.listen(PORT);