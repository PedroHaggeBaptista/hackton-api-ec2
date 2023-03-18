const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class Contact {
    async contact(email, name, message) {
        //Verify if email already exists
        const emailsAlreadyRegistered = await prisma.contato.findUnique({
            where: {
                email: email,
            }
        })

        if (emailsAlreadyRegistered) {
            throw new Error("Já recebemos seu contato, em breve entraremos em contato. Caso queira passar mais detalhes, envie em resposta ao email que enviaremos. Obrigado!");
        }

        try {
            await prisma.contato.create({
                data: {
                    email: email,
                    name: name,
                    message: message,
                }
            })

            return "Mensagem enviada com sucesso";
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteContact(email) {
        //Verify if email already exists
        const emailsAlreadyRegistered = await prisma.contato.findUnique({
            where: {
                email: email,
            }
        })

        if (!emailsAlreadyRegistered) {
            throw new Error("Contato não existe ou já foi excluído");
        }

        try {
            await prisma.contato.delete({
                where: {
                    email: email,
                }
            })

            return "Contato excluído com sucesso";
        } catch (error) {
            throw new Error(error);
        }
    }

    async partner(companyName, email) {
        //Verify if email already exists
        const emailsAlreadyRegistered = await prisma.patrocinador.findUnique({
            where: {
                email: email,
            }
        })

        if (emailsAlreadyRegistered) {
            throw new Error("Já recebemos sua proposta, em breve entraremos em contato. Caso queira passar mais detalhes, envie em resposta ao email que encaminharemos (Questões de Segurança). Obrigado!");
        }

        try {
            await prisma.patrocinador.create({
                data: {
                    email: email,
                    companyName: companyName,
                }
            })

            return "Proposta enviada com sucesso";
        } catch (error) {
            throw new Error(error);
        }
    }

    async deletePartner(email) {
        //Verify if email already exists
        const emailsAlreadyRegistered = await prisma.patrocinador.findUnique({
            where: {
                email: email,
            }
        })

        if (!emailsAlreadyRegistered) {
            throw new Error("Proposta não existe ou já foi excluída");
        }

        try {
            await prisma.patrocinador.delete({
                where: {
                    email: email,
                }
            })

            return "Proposta excluída com sucesso";
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllContacts() {
        try {
            const contacts = await prisma.contato.findMany()

            return contacts;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllPartners() {
        try {
            const partners = await prisma.patrocinador.findMany()

            return partners;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = {
    Contact,
}