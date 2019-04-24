'use strict'

const service = require('../services/token');

function isAuth(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: `No tiene Autorizacion` });
    }

    const token = req.headers.authorization.split(" ")[1];
    
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