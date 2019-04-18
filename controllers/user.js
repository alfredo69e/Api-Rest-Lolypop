'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services')

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName
    });

    user.save((err) => {
        if(err) {
            return res.status(500).send({message: `error al salvar la bases de datos`});
            console.log(err);
        }

        res.status(200).send({ token: service.createToken(user) });
    })
   
}

function signIn(req, res) {
    User.find({ email: req.body.email }, (err, user) => {
        if(err) {
            return res.status(500).send({message: `Error a realizar la peticion`});
            console.log(err);
        }

        if(!user) {
            return res.status(500).send({message: `No Existe el usuario`})
        }

        req.user = user;

        res.status(200).send({
            message: `te has logueado correcvtamente`,
            token: service.createToken(user)
        })

    })
}


module.exports = {
    signUp,
    signIn
}