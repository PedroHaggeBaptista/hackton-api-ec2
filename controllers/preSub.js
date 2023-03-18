const { validationResult } = require('express-validator')
//const preSub = require('../services/preSub')
require('express-async-errors')

const service = require('../services/preSub')

const preSub = new service.PreSub()

const sendPreSub = async (req, res) => {
    const { email, name } = req.body;

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
        const result = await preSub.create(email, name);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const validateToken = async (req, res) => {
    const { token } = req.params;

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
        const result = await preSub.validateToken(token);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const resendSub = async (req, res) => {
    const { email } = req.body;

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
        const result = await preSub.resendEmail(email);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const validateEmail = async (req, res) => {
    const { token } = req.params;

    const { acceptTerms, contact, discord, instagram, twitter, linkedin, github, document, documentType, fullName, institution, mailing, why, history, habilities} = req.body;	

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
        const result = await preSub.validate(token, acceptTerms, contact, discord, instagram, twitter, linkedin, github, document, documentType, fullName, institution, mailing, why, history, habilities);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
 
const getAllPreSub = async (req, res) => {
    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await preSub.getAll();
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const getByEmail = async (req, res) => {
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
        const result = await preSub.getByEmail(email);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const updatePreSub = async (req, res) => {
    const { email } = req.params;

    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await preSub.update(email, req.body);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const deletePreSub = async (req, res) => {
    const { id } = req.params;

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
        const result = await preSub.delete(id);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const callAdm = async (req, res) => {
    //Pega as infos da requisição
    const { email } = req.body
    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }

    try {
        //Tratamento das respostas do método da classe
        const result = await preSub.callAdm(email);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const verifyAdmin = async (req, res) => {
    res.send({ message: `Admin Verified with email ${req.adminEmail} and IP ${req.ip}`, validated: true })
}

//Exporta as funções do controller para o ROUTER
module.exports = {
    sendPreSub,
    validateEmail,
    validateToken,
    getAllPreSub,
    getByEmail,
    updatePreSub,
    deletePreSub,
    callAdm,
    verifyAdmin,
    resendSub
}