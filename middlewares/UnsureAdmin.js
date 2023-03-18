require('dotenv').config();

const unsureAdmin = (req, res, next) => {
    //Recebe o token inserido pela aplicação
    const emailReq = req.body.email

    let validate = false

    list = JSON.parse(process.env.adminList)

    list.map((email) => {
        if (email == emailReq) {
            validate = true
        }
    })

    if (validate == true) {
        return next()
    } else {
        res.status(500).send("Você não possui permissões! Contate um administrador!")
    }
};

//Exporta como um MIDDLEWARE
module.exports = {
    unsureAdmin,
};
