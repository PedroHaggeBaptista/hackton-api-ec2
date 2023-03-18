const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateTokenToTest = (email) => {
    const token = jwt.sign(
        { id: "testeDoVitin" },
        process.env.JWT_TOKEN_VALIDATION_FRONT, 
        { expiresIn: '30m' }, 
    );

    return token;
}

console.log(generateTokenToTest())