const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({}, { strict: false });
const Team = mongoose.model('team', teamSchema, 'team');

router.get('/', async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ error: 'Miembro del equipo no encontrado' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newMember = new Team(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedMember)
      return res
        .status(404)
        .json({ error: 'Miembro del equipo no encontrado' });
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedMember = await Team.findByIdAndDelete(req.params.id);
    if (!deletedMember)
      return res
        .status(404)
        .json({ error: 'Miembro del equipo no encontrado' });
    res.json({ message: 'Miembro del equipo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
