const express = require('express');
const Medication = require('../models/Medication'); // Import your Mongoose model

// POST /api/medications
module.exports = {
CreateMed: async (req, res) => {
  try {
    // const createdBy = req.user._id; 
    const medication =  await Medication.create({
        ...req.body
    });
    res.status(201).json(medication);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
}
};

