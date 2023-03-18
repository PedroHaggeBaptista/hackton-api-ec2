const express = require("express");
require("express-async-errors");
require("dotenv").config();
var bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client')

const app = express();
app.use(cors());

/* Só a necessidade de ativar está parte do código quando ele estiver em produção
app.use(cors({
    origin: 'URL DO INTELI'
}));
*/

setInterval(
  async () => {
    const prisma = new PrismaClient()
    const resetBlackList = []

    prisma.email.deleteMany({}).then(() => {}).catch((err) => {console.log(err)})
  }, 1000 * 60 * 10);

app.use(express.json()); //Irá suportar JSON
app.use(
  bodyParser.urlencoded({
    // Irá suportar urlenconded
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Pong!");
});

// Rotas
const preSubRouter = require("./routes/preSub");
const contactRouter = require("./routes/contact");

app.use("/v1/Sub", preSubRouter);
app.use("/v1/Contact", contactRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: "Not found", status: 404, url: req.url });
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
