const rateLimit = require('express-rate-limit')
const slowDown = require("express-slow-down");

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
})


const sendEmailLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 6, //The person will just can send 3 email from the same IP
})

const speedLimiter = slowDown({
    windowMs: 5 * 60 * 1000, // 5 minutes
    delayAfter: 8,
    delayMs: 1000
})

module.exports = {
    limiter, sendEmailLimiter, speedLimiter
};