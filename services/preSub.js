const { PrismaClient } = require('@prisma/client')

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../smtp");
const emails = require("../SMTP/emails");

const transporter = nodemailer.createTransport({
    // host: SMTP_CONFIG.host,
    // port: SMTP_CONFIG.port,
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const prisma = new PrismaClient()

class PreSub {
    async create(email) {
        //Validate if email already exists
        const emailsAlreadyRegistered = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (emailsAlreadyRegistered) {
            throw new Error("Email já cadastrado");
        }

        const emailAlreadyExists = await prisma.email.findUnique({
            where: {
                email: email,
            }
        })

        if (emailAlreadyExists) {
            throw new Error("Verifique sua caixa de email e confirme seu cadastro, ou clique em não recebi o email para reenviar");
        }

        //Create Token for email validation
        const tokenToEmail = jwt.sign(
            { email: email },
            process.env.JWT_TOKEN_PRESUB_EMAIL,
            { expiresIn: '30m' },
        );

        //Send Email
        try {
            await transporter.sendMail({
                text: "Inscrição no Challange da InteliBlockChain",
                subject: "Challange InteliBlockchain 2023",
                from: "Noreply InteliBlockChain<blockchain@inteli.edu.br>",
                to: `${email}`,
                html: emails.generateEmailSendConfirmation(email, tokenToEmail),
            });
        } catch (error) {
            throw new Error(error);
        }

        //Add Email to BlackList For 1 minute
        try {
            await prisma.email.create({
                data: {
                    email: email,
                    quantity: 1,
                }
            })
        } catch (error) {
            throw new Error(error);
        }

        return "Porfavor, cheque sua caixa de entrada para confirmar sua inscrição";
    }

    async validateToken(token) {
        //Validate Token Send By Email
        try {
            jwt.verify(token, process.env.JWT_TOKEN_PRESUB_EMAIL);
            return { status: true, message: "Token Válido" };
        } catch (error) {
            throw new Error("Parece que o seu tempo expirou, tente novamente");
        }
    }

    async resendEmail(email) {
        //Validate if email already exists
        const emailsAlreadyRegistered = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (emailsAlreadyRegistered) {
            throw new Error("Email já cadastrado");
        }

        //const emailAlreadyExists = emailBlackList.includes(email)
        const validateIfNotExceeded = await prisma.email.findUnique({
            where: {
                email: email,
            }
        })

        if (!validateIfNotExceeded) {
            throw new Error("Email ainda não enviado");
        }

        if (validateIfNotExceeded.quantity >= 3) {
            throw new Error("Infelizmente você já excedeu o limite de reenvios de email, aguarde aproximadamente 10 minutos e tente novamente, caso o problema não seja sanado entre em contato com a organização");
        }

        //Create Token for email validation
        const tokenToEmail = jwt.sign(
            { email: email },
            process.env.JWT_TOKEN_PRESUB_EMAIL,
            { expiresIn: '10m' },
        );

        //Send Email
        try {
            await transporter.sendMail({
                text: "Inscrição no Challange da InteliBlockChain",
                subject: "Challange InteliBlockchain 2023",
                from: "Noreply InteliBlockChain<blockchain@inteli.edu.br>",
                to: `${email}`,
                html: emails.generateEmailSendConfirmation(email, tokenToEmail),
            });
        } catch (error) {
            throw new Error(error);
        }

        //Add Email to BlackList For 1 minute
        try {
            await prisma.email.update({
                where: {
                    email: email,
                },
                data: {
                    quantity: validateIfNotExceeded.quantity + 1,
                }
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async validate(token, acceptTerms, contact, discord, instagram, twitter, linkedin, github, document, documentType, fullName, institution, mailing, why, history, habilities) {
        const date = new Date().toISOString();

        let emailOut = ""

        //Validate Token Send By Email
        try {
            const { email } = jwt.verify(token, process.env.JWT_TOKEN_PRESUB_EMAIL);
            emailOut = email;
        } catch (error) {
            throw new Error("Parece que o seu tempo expirou, tente novamente");
        }

        //Validate if email already exists
        const emailsAlreadyRegistered = await prisma.user.findUnique({
            where: {
                email: emailOut,
            }
        })

        if (emailsAlreadyRegistered) {
            throw new Error("Email já confirmado");
        }

        //Add User to PreUser Table
        let sub = null;
        try {
            sub = await prisma.user.create({
                data: {
                    id: uuid(),
                    email: emailOut,
                    acceptTerms: acceptTerms,
                    contact: contact,
                    discord: discord,
                    instagram: instagram,
                    twitter: twitter,
                    linkedin: linkedin,
                    github: github,
                    why: why,
                    history: history,
                    habilities: habilities,
                    document: document,
                    documentType: documentType,
                    fullName: fullName,
                    institution: institution,
                    mailing: mailing,
                    approved: false,
                }
            })
        } catch (error) {
            throw new Error(error);
        }

        try {
            await prisma.email.delete({
                where: {
                    email: emailOut,
                }
            })
        } catch (error) {
            throw new Error(error);
        }

        return sub;
    }

    async getAll() {
        try {
            const preSub = await prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc',
                }
            })

            return preSub;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByEmail(email) {
        try {
            const preSub = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            })

            if (!preSub) {
                throw new Error("Email não encontrado");
            }

            return preSub;
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(email, data) {

        const date = new Date().toISOString();

        //Verify if email already exists
        const emailsAlreadyRegistered = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (!emailsAlreadyRegistered) {
            throw new Error("Usuário não encontrado");
        }

        if (!data) {
            throw new Error("Nenhum dado para atualizar");
        }

        try {
            const preSub = await prisma.user.update({
                where: {
                    email: email,
                },
                data,
            })

            return preSub;
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        //Verify if email already exists
        const emailsAlreadyRegistered = await prisma.user.findUnique({
            where: {
                id: id,
            }
        })

        if (!emailsAlreadyRegistered) {
            throw new Error("Usuário não encontrado");
        }

        //Effectively delete user
        try {
            const preSub = await prisma.user.delete({
                where: {
                    id: id,
                }
            })

            return `Usuário ${preSub.name} e ${preSub.email} deletado com sucesso`;
        } catch (error) {
            throw new Error(error);
        }
    }

    async callAdm(email) {
        let token = jwt.sign({
            email: email,
        }, process.env.MD5_KEY_ADMIN, {
            expiresIn: "15m",
        })

        const transporter1 = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: SMTP_CONFIG.user,
                pass: process.env.PASS_SMTP1,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        try {
            await transporter.sendMail({
                text: 'Texto do Email',
                subject: 'Admin Token - Validade',
                from: "Noreply InteliBlockChain<noreply@InteliBlockChain.com>",
                to: `${email}`,
                html: `<p>${token}</p>`
            })
            return "Email de autenticação enviado com sucesso!"
        } catch {
            throw new Error('Porfavor, tente Novamente mais tarde!')
        }
    }

    // async verifyAdmin(token) {
    //     try {
    //         jwt.verify(token, process.env.MD5_KEY_ADMIN);
    //         return {
    //             'message': 'Admin Válido',
    //             'validation': true
    //         }
    //     } catch {
    //         throw new Error('Admin Inválido')
    //     }
    // }
}

module.exports = {
    PreSub,
}