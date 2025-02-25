const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Importa el paquete cors
const gmailPassword = process.env.gmailPassword;

const app = express();
const PORT = process.env.PORT || 4000;

// Habilita CORS para todas las solicitudes
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  const from = 'xulioxaviert.pruebas.dev@gmail.com'; // Reemplaza con tu correo


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: from,
      pass: gmailPassword
    },
  });

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: `<p>${text}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado correctamente: ', info.messageId);
    res.status(200).send('Correo enviado correctamente!');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Error al enviar el correo.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
