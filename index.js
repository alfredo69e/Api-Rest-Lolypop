'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Product = require('./models/products');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/hola', (req, res) => {
    res.send({ message: 'Hola mundo' });
});


app.get('/api/product/', (req, res) => {

    Product.find({}, (err, product) => {
        if (err) {
            return res.status(500).send({message: `error al realizar la peticion`})
        }

        if (!product) {
            return res.status(404).send({message: `El producto no existe`})
        }
    
        res.status(200).send(product);
    });
});


app.post('/api/product', (req, res) => {
    console.log('POST /api/product');
    console.log(req.body);
    
    let product = new Product();

    product.name = req.body.name,
    product.picture = req.body.picture,
    product.price = req.body.price,
    product.category = req.body.category,
    product.description = req.body.description
    
    product.save((err, productStore) => {
        if (err) {
           return res.status(500).send({message: `error al salvar la bases de datos`})
            console.log(err);
            
        }

        res.status(200).send({product: productStore});

    })
    
});

app.get('/api/product/:id', (req, res) => {
    let productId = req.params.id;

    Product.findById(productId, (err, product) => {
        if (err) {
            return res.status(500).send({message: `error al realizar la peticion`})
        }

        if (!product) {
            return res.status(404).send({message: `El producto no existe`})
        }
    
        res.status(200).send(product);
    });

});

app.delete('/api/product/:id', (req, res) => {
    let productId = req.params.id;

    Product.findById(productId, (err, product) => {
        if (err) {
            return res.status(500).send({message: `error al realizar la peticion`})
        }

        if (!product) {
            return res.status(404).send({message: `El producto no existe`})
        }

        product.remove((err) => {
            if (err) {
                return res.status(500).send({message: `error al realizar la peticion`})
            }
            res.status(200).send({message: `El producto a sido eliminado`});
        })
    
    });

});

app.put('/api/product/:id', (req, res) => {
    let productId = req.params.id;
    let update = req.body;

    Product.findOneAndUpdate(productId, update, (err, product) => {
        if (err) {
            return res.status(500).send({message: `error al realizar la peticion`})
        }
        res.status(200).send({message: `El producto a sido Actualizado`});
    
    });

});


mongoose.connect('mongodb://localhost/shop', (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la bases de datos ${err}`);
    } 
    console.log('Conexion a la base de datos');

    app.listen(port, () => {
        console.log(`api res corriendo en el puerto: ${port}`);
        
    })
    
});

