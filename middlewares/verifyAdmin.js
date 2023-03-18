require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    //Recebe o token inserido pela aplicação
    const authToken = req.headers.authorization;

    //Valida se o token está preenchido
    if (!authToken) {
        res.status(401).send('ACCESS DENIED')
        return
    }

    //Desestrutura o header "Bearer 'token'"
    [, token] = authToken.split(" ")

    try {
        const { email } = jwt.verify(token, process.env.MD5_KEY_ADMIN);
        req.adminEmail = email;
        return next();
    } catch {
        res.status(401).send('ACCESS DENIED')
    }
};

//Exporta como um MIDDLEWARE
module.exports = {
    verifyAdmin,
};
