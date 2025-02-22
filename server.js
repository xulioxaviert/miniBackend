const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para enviar correos
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  // Configuración del transportador
  const transporter = nodemailer.createTransport({
    service: 'yopmail', // Cambia esto según tu proveedor de correo
    auth: {
      user: 'pruebas_envio_correo@yopmail.coom', // Tu correo
      pass: '', // Tu contraseña
    },
  });

  // Opciones del correo
  const mailOptions = {
    from: 'pruebas_envio_correo@yopmail.coom',
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Correo enviado', info });
  } catch (error) {
    res.status(500).send({ message: 'Error al enviar el correo', error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
