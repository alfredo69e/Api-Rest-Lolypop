'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');

function signUp(req, res) {
    const user = new User({
        emial: req.body.email,
        displayName: req.body.displayName
    });

    user.save((err) => {
        if(err) {
            return res.status(500).send({message: `error al salvar la bases de datos`})
            console.log(err);
        }

        res.status(200).send({product: productStore});
    })
   
}

function signIn(req, res) {

}


module.exports = {
    signUp,
    signIn
}