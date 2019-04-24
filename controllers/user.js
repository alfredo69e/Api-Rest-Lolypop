'use strict'

const User = require('../models/user');
const service = require('../services/token');
const mysql = require('../services/connect');
const bcrypt = require('bcrypt-nodejs');

function signUp(req, res) {

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName
    });

    user.save((err) => {
        if(err) {
            console.log(err);
            return res.status(500).send({message: `error al salvar la bases de datos`});
        }

        res.status(200).send({ token: service.createToken(user) });
    })
}

function signIn(req, res) {
    console.log(req.body);

    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) {
            console.log(err);
            return res.status(500).send({message: `error al realizar la peticion`});  
        }

        let hash = bcrypt.hashSync(req.body.password);

        console.log(hash);
        
        bcrypt.compareSync(req.body.password, hash);

        console.log(bcrypt.compareSync(req.body.password, hash));
        

        res.status(200).send({
            message: `te has logueado correctamente`,
            token: service.createToken(user)
        });
       
    });


    /*

    const connect = mysql.connection();

    connect.connect();

    connect.query('SELECT * FROM users WHERE username = "'+ req.body.username +'" OR email = "'+ req.body.username +'" ', function (err, user, fields) {
        if (err) {
            return res.status(500).send({message: `error al buscar en la bases datos`});   
        }

        if(user.length == 0) {
            return res.status(404).send({message: `usuario o contraseña no coinciden`});  
        }

       
        bcrypt.compare(req.body.password, user[0].password, function(err, res) {
            console.log(res);

            paso = res;

        });

        if(!paso) {
            return res.status(404).send({message: `usuario o contraseña no coinciden`});  
        }

        res.status(200).send({
            message: `te has logueado correctamente`,
            token: service.createToken(user[0])
        });
    });
*/
}


function changePassword(req, res) {
    console.log(req.body);

    const connect = mysql.connection();

    connect.connect();

    connect.query('SELECT password, username FROM users WHERE username = "'+ req.body.username +'" OR email = "'+ req.body.username +'" ', function (err, user, fields) {
        if (err) {
            return res.status(500).send({message: `error al buscar en la bases datos`});   
        }

        if(user.length == 0) {
            return res.status(404).send({message: `usuario o contraseña no coinciden`});  
        }

        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                return res.status(500).send({message: `error al realizar cambio de contraseña`}); 
            }
    
        bcrypt.hash(req.body.password, salt, null, (err, hash) => {
            if(err) {
                return res.status(500).send({message: `error al realizar cambio de contraseña`});
            } 
    
            console.log(hash);
            

            connect.query('UPDATE users SET password = "'+ hash +'" WHERE username = "'+ user[0].username +'" ', 
            function (err, update, fields) {
                if (err) {
                    return res.status(500).send({message: `error al guardar en la bases datos`});   
                }

                console.log(update);
                
                mysql.close();

                res.status(200).send({
                    message: `contraseña cambiada`,
                });
                
                });
    
            });
        });
    });

}
    


    /*

    User.find({ email: req.body.email }, (err, user) => {
        if(err) {
            console.log(err);
            return res.status(500).send({message: `Error a realizar la peticion`});  
        }

        console.log(user);

        if(user.length == 0) {
            return res.status(404).send({message: `No Existe el usuario`})
        }

        req.user = user;

        res.status(200).send({
            message: `te has logueado correctamente`,
            token: service.createToken(user)
        });

    });

    */



module.exports = {
    signUp,
    signIn,
    changePassword
}