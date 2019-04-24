'use strict'

const express = require('express');
// const productCtrl = require('../controllers/product');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

const api = express.Router();


/*
api.get('/product', auth, productCtrl.getProducts );
api.post('/product', auth, productCtrl.saveProduct );
api.get('/product/:id', productCtrl.getProduct );
api.delete('/product/:id', productCtrl.deleteProduct );
api.put('/product/:id', productCtrl.updateProduct );
*/
// users
api.post('/signUp' , userCtrl.signUp );
api.post('/signIn' , userCtrl.signIn );
api.post('/changePass' , userCtrl.changePassword );

module.exports = api;