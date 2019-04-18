'use strict'


const Product = require('../models/products');

function saveProduct(req, res) {
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

    });
}

function getProduct (id) {
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
}

function getProducts (req, res) {
    Product.find({}, (err, product) => {
        if (err) {
            return res.status(500).send({message: `error al realizar la peticion`})
        }

        if (!product) {
            return res.status(404).send({message: `El producto no existe`})
        }
    
        res.status(200).send(product);
    });
}

function deleteProduct (id) {
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
}

function updateProduct () {
    let productId = req.params.id;
    let update = req.body;

    Product.findOneAndUpdate(productId, update, (err, product) => {
        if (err) {
            return res.status(500).send({message: `error al realizar la peticion`})
        }
        res.status(200).send({message: `El producto a sido Actualizado`});
    
    });
}



module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    deleteProduct,
    updateProduct

}