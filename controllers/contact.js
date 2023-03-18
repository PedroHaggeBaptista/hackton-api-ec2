const { validationResult } = require('express-validator')
//const preSub = require('../services/preSub')
require('express-async-errors')

const service = require('../services/contact')

const contactService = new service.Contact()

const contact = async (req, res) => {
    const { email, name, message } = req.body;

    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }

    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await contactService.contact(email, name, message);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const partner = async (req, res) => {
    const { companyName, email } = req.body;	

    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }

    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await contactService.partner(companyName, email);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const deletePartner = async (req, res) => {
    const { email } = req.params;

    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }

    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await contactService.deletePartner(email);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteContact = async (req, res) => {
    const { email } = req.params;

    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }

    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await contactService.deleteContact(email);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const getAllContacts = async (req, res) => {
    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await contactService.getAllContacts();
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getAllPartners = async (req, res) => {
    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await contactService.getAllPartners();
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

//Exporta as funções do controller para o ROUTER
module.exports = {
    contact,
    partner,
    deletePartner,
    deleteContact,
    getAllContacts,
    getAllPartners
}