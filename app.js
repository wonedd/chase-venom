const express = require('express');
const venom = require('venom-bot');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send/:num/:msg', async (req, res) => {
  try {
    const { num, msg } = req.params;

    if (!num || !msg) {
      return res.status(400).json({ error: 'Número e mensagem são obrigatórios.' });
    }

    venom
      .create({
        session: 'session-name'
      })
      .then((client) => start(client))
      .catch((erro) => {
        console.log(erro);
      });

    function start(client) {

      client
        .sendText(num, msg)
        .then((result) => {
          console.log('Result: ', result);
        })

    }

    res.json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error);
    res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

