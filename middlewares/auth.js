'use strict'

const service = require('../services');

function isAuth(req, res, next) {
    if(!req.headers.autorization) {
        return res.status(403).send({ message: `No tiene Autorizacion` });
    }

    const token = req.headers.autorization.split(" ")[1];
    
    service.decodeToken(token)
    .then((res) => {
        req.user = res;
        next();
    })
    .catch((err) => {
       return res.status(err.status).send(err.message)
    })

}

module.exports = isAuth;