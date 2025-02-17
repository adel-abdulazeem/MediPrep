const Medication = require('../models/Medication'); 

module.exports = {
  getUser: async (req, res) => {
    try {
      res.status(200).json({ username: req.user?.username});
    } catch (err) {
      console.log(err);
    }
  },
  createMed: async (req, res) => {
  try {
    const medication =  await Medication.create({...req.body});
    res.status(201).json(medication);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
},
getMed: async (req, res) => {
  try {
    // const createdBy = req.user._id; 
    const medications =  await Medication.find().sort({ createdAt: "desc" }).lean();
    res.status(200).json(medications);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
},
updateMed: async (req, res) => {
  console.log(req.body)

  const medId = req.params.id;
  console.log(medId)

  const { brandName, genericName, compatibleSolutions, methodOfAdministration, timeOfStability, methodOfPreparation, notes } = req.body;
  try {
    const medication = await Medication.findById(medId);
    if (!medication) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    const updateData = { 
        brandName,
        genericName,
        compatibleSolutions,
        methodOfAdministration,
        timeOfStability,
        methodOfPreparation,
        notes 
      };
      const updatedMed = await Medication.findByIdAndUpdate(
      medId,
      updateData,
      { new: true, upsert: false } 
    );
    res.status(200).json(updatedMed);
  } catch (error) {
    console.error('Error updating subscriber:', error);
  }
},
};

