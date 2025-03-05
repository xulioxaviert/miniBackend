const express = require('express');
const router = express.Router();
const mongoose = require( 'mongoose' );

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Esquema genérico para la colección "users"
const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.models.User || mongoose.model('User', userSchema);



router.post( '/', async ( req, res ) =>
{
  
  const { email, password, role } = req.body;

  try {
    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email inválido' });
    }

    // Comparar la contraseña
    let validPassword = false;
    if (user.password.startsWith('$2')) {
      // Si la contraseña está hasheada, usar bcrypt
      validPassword = await bcrypt.compare(password, user.password);
    } else {
      // Si la contraseña no está hasheada, comparar directamente
      validPassword = password === user.password;
    }
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Pass inválido' });
    }

    // Generar el payload (evita incluir información sensible como la contraseña)
    const payload = {
      id: user._id,
      email,
      role,
    };

    // Generar el token
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secreto', {
      expiresIn: '10h',
    });

    // Devolver el token y el objeto de usuario (puedes filtrar campos sensibles)
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
