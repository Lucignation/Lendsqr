const express = require('express');

const route = express.Router();

const isAuth = require('../middleware/auth');

const userController = require('../controllers/user');


route.get('/signup', userController.getSignup);
route.post('/signup', userController.postSignup);
route.get('/', userController.getLogin);
route.post('/', userController.postLogin);
route.get('/user', isAuth, userController.getAvailableLoans);
route.get('/loans', isAuth, userController.getLoans);
route.post('/loans', isAuth, userController.postLoans);


module.exports = route;