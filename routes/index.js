'use strict'

const express = require('express');
const productCtrl = require('../controllers/product');


const api = express.Router();

api.get('/product/', productCtrl.getProducts );

api.post('/product', productCtrl.saveProduct );

api.get('/product/:id', productCtrl.getProduct );

api.delete('/product/:id', productCtrl.deleteProduct );

api.put('/product/:id', productCtrl.updateProduct );

module.exports = api;