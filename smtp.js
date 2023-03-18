require('dotenv').config();

module.exports = {
    host: "smtp.gmail.com",
    port: 587,
    user: process.env.EMAIL_SMTP,
    pass: process.env.PASS_SMTP,
}