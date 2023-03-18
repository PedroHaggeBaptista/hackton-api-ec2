const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authFront = (req, res, next) => {
    //Recebe o token inserido pela aplicação
    const authToken = req.headers.frontend;

    //Valida se o token está preenchido
    if (!authToken) {
        res.status(403).json({
            message: "ACCESS DENIED"
        })
        return
    }

    //Valida se o token é válido
    try {
        //Verifica o Token
        const { id } = jwt.verify(authToken, process.env.JWT_TOKEN_VALIDATION_FRONT)

        // if (id !== "testeDoVitin") {
        //     res.status(403).json({
        //         message: "ACCESS DENIED"
        //     })
        //     return
        // }

        //Recupera infos do usuário
        return next();
    } catch(err) {
        //Retorna o erro caso o token não seja válido
        res.status(403).json({
            message: "ACCESS DENIED"
        })
        return
    }
}


//Exporta como um MIDDLEWARE
module.exports = {
    authFront
}