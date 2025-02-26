const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require( 'dotenv' ).config();
const fs = require('fs');
const handlebars = require('handlebars');

const app = express();
const port = 4000;

// Configuración de CORS (permite solicitudes desde Angular)
app.use(
  cors({
    origin: 'http://localhost:4200', // Reemplaza con el puerto de tu app Angular
  }),
);

app.use(express.json());

// Configuración de Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Usa variables de entorno
    pass: process.env.GMAIL_PASS,
  },
});

// Ruta para enviar correos
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  // Leer el archivo de la plantilla
  const templateSource = fs.readFileSync(
    './templates/emailTemplate_2.html',
    'utf8',
  );

  // Compilar la plantilla con Handlebars
  const template = handlebars.compile(templateSource);
  const htmlToSend = template({ text });

  // const mailOptions = {
  //   from: process.env.GMAIL_USER,
  //   to,
  //   subject,
  //   text,
  // };

  try {
    let info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html: htmlToSend, // Aquí se envía la plantilla HTML procesada
      attachments: [
        {
          filename: 'img_email.jpg', // Nombre del archivo adjunto
          path: './templates/img/img_email.jpg', // Ruta al archivo en tu servidor
          cid: 'img', // Identificador que coincide con el src en el HTML
        },
      ],
    });
    res.status(200).json({ message: 'Correo enviado correctamente', info });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
