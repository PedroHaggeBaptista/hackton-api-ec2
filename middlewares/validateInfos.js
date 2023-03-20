require('dotenv').config();
const documentValidator = require('cpf-cnpj-validator');

const validate = (req, res, next) => {
    const emailsAllowed = JSON.parse(process.env.ALLOWED_EMAILS);

    const path = req.route.path;

    if(req.body.email || req.params.email) {
        let emailInfos
        if (req.body.email) {
            emailInfos = String(req.body.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        } else if (req.params.email) {
            emailInfos = String(req.params.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        }

        if (!emailInfos) {
            res.status(400).send('Invalid email');
            return;
        }
        
        if (!(path === "/partner")) {
            if (!emailsAllowed.includes(emailInfos[5])) {
                res.status(400).send('Invalid email');
                return;
            }
        }
    }
     
    if(req.body.document) {
        if (req.body.documentType === "cpf") {
            const isValidCPF = documentValidator.cpf.isValid(req.body.document);
            if (!isValidCPF) {
                res.status(400).send('Invalid Document');
                return;
            }

            const cpfFormatted = documentValidator.cpf.format(req.body.document);
            req.body.document = cpfFormatted;
        } else if (req.body.documentType === "rg") {
            var v = req.body.document.toUpperCase().replace(/[^\dX]/g,'');
            const rgCorrected = (v.length==8 || v.length==9)?
            v.replace(/^(\d{1,2})(\d{3})(\d{3})([\dX])$/,'$1.$2.$3-$4'):
            false;

            if (!rgCorrected) {
                res.status(400).send('Invalid Document');
                return;
            }

            req.body.document = rgCorrected;
        }
    }

    return next();
};

//Exporta como um MIDDLEWARE
module.exports = {
    validate,
};
