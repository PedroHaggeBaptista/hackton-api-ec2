const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

const preSubController = require("../controllers/preSub");

//Middlewares
const token = require("../middlewares/AuthFront");
const adminAuth = require("../middlewares/UnsureAdmin");
const ddosProtection = require("../middlewares/limitRequests");
const admin = require("../middlewares/verifyAdmin");
const validateInfos = require("../middlewares/validateInfos");

router.post(
    "/sendConfirmation",
    [body("email", "Email é necessário").exists({ checkFalsy: true })],
    validateInfos.validate,
    ddosProtection.sendEmailLimiter,
    token.authFront,
    preSubController.sendPreSub
);

router.get(
    "/validateToken/:token",
    [param("token", "Token é necessário").exists({ checkFalsy: true })],
    token.authFront,
    preSubController.validateToken
);

router.post(
    "/resendConfirmation",
    [body("email", "Email é necessário").exists({ checkFalsy: true })],
    validateInfos.validate,
    ddosProtection.limiter,
    token.authFront,
    preSubController.resendSub
);

router.post(
    "/validateEmail/:token",
    [param("token", "Token é necessário").exists({ checkFalsy: true })],
    [body("acceptTerms", "É necessário aceitar os termos").exists({ checkFalsy: true })],
    [body("contact", "Contato é necessário").exists({ checkFalsy: true })],
    [body("discord", "Discord é necessário").exists({ checkFalsy: true })],
    [body("document", "Documento é necessário").exists({ checkFalsy: true })],
    [body("documentType", "Tipo de documento é necessário").exists({ checkFalsy: true })],
    [body("fullName", "Nome completo é necessário").exists({ checkFalsy: true })],
    [body("institution", "Instituição/Empresa é necessário").exists({ checkFalsy: true })],
    [body("mailing", "Mailing é necessário").exists({ checkFalsy: true })],
    [body("why", "Porque é necessário").exists({ checkFalsy: true })],
    [body("habilities", "Habilidades é necessário").exists({ checkFalsy: true })],
    [body("history", "História é necessário").exists({ checkFalsy: true })],
    validateInfos.validate,
    ddosProtection.speedLimiter,
    token.authFront,
    preSubController.validateEmail
);

router.get(
    "/allPreSubs",
    admin.verifyAdmin,
    preSubController.getAllPreSub
);

router.get(
    "/getPreSub/:email",
    admin.verifyAdmin,
    preSubController.getByEmail
);

router.put(
    "/updatePreSub/:email",
    admin.verifyAdmin,
    preSubController.updatePreSub
);

router.delete(
    "/deletePreSub/:id",
    admin.verifyAdmin,
    preSubController.deletePreSub
);

router.post(
    "/callAdm",
    [body("email", "Email é necessário").exists({ checkFalsy: true })],
    adminAuth.unsureAdmin,
    preSubController.callAdm
)

router.get(
    "/admin",
    admin.verifyAdmin,
    preSubController.verifyAdmin
);

//Exporta o ROUTER
module.exports = router;