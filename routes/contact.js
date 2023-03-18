const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

const contactController = require("../controllers/contact");

//Middlewares
const token = require("../middlewares/AuthFront");
const ddosProtection = require("../middlewares/limitRequests");
const adminAuth = require("../middlewares/verifyAdmin");

router.post(
    "/contact",
    [body("email", "Email é necessário").exists({ checkFalsy: true })],
    [body("name", "Nome é necessário").exists({ checkFalsy: true })],
    [body("message", "Mensagem é necessário").exists({ checkFalsy: true })],
    ddosProtection.sendEmailLimiter,
    token.authFront,
    contactController.contact
);

router.post(
    "/partner",
    [body("companyName", "Nome da empresa é necessário").exists({ checkFalsy: true })],
    [body("email", "Email é necessário").exists({ checkFalsy: true })],
    ddosProtection.sendEmailLimiter,
    token.authFront,
    contactController.partner
);

router.delete(
    "/deleteContact/:email",
    [param("email", "Email é necessário").exists({ checkFalsy: true })],
    adminAuth.verifyAdmin,
    contactController.deleteContact
);

router.delete(
    "/deletePartner/:email",
    [param("email", "Email é necessário").exists({ checkFalsy: true })],
    adminAuth.verifyAdmin,
    contactController.deletePartner
);

//Exporta o ROUTER
module.exports = router;