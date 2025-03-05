const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

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
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Ruta para enviar correos
app.post('/send-email', async (req, res) => {
  const { date, id, products, name, to } = req.body;
  const processedProducts = products.map((product) => {
    const quantity =
      product.properties && product.properties.length > 0
        ? product.properties[0].quantity
        : 0;
    return { ...product, quantity };
  });
  const isMultiple = processedProducts.length > 1;
  const templatePath = path.join(
    __dirname,
    'templates',
    'emailTemplate_2.html',
  );
  // Leer la plantilla
  fs.readFile(templatePath, 'utf8', async (err, htmlTemplate) => {
    if (err) {
      console.error('Error leyendo la plantilla de correo:', err);
      return res
        .status(500)
        .json({ error: 'Error al leer la plantilla de correo.' });
    }

    // Compilar la plantilla con Handlebars
    const template = handlebars.compile(htmlTemplate);
    const htmlToSend = template({
      id,
      name,
      date,
      products: processedProducts,
      isMultiple,
    });

    // Configuración de Nodemailer (modifica el servicio y credenciales según corresponda)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Opciones del correo
    let mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: `Resumen de tu compra - Pedido n° ${id}`,
      html: htmlToSend,
      attachments: [
        {
          filename: 'img_email.jpg',
          path: path.join(__dirname, 'templates', 'img', 'img_email.jpg'),
          cid: 'img',
        },
      ],
    };
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Mensaje enviado: %s', info.messageId);
      return res.json({ message: 'Correo enviado correctamente.' });
    } catch (sendError) {
      console.error('Error enviando el correo:', sendError);
      return res.status(500).json({ error: 'Error al enviar el correo.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
