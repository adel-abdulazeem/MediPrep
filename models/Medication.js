const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  brandName: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  genericName: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  compatibleSolutions: [{
    type: String,
    required: true,
    enum: ['0.9% NaCl', 'D5W', 'Lactated Ringer\'s', 'Sterile Water', 'Other']
  }],
  timeOfStability: [{
    type: String,
    required: true,
    example: '24 hours refrigerated'
  }],
  methodOfPreparation: {
    type: String,
    required: true,
    trim: true
  },
  methodOfAdministration: [{
    type: String,
    required: true,
    enum: ['IV', 'IM', 'Oral', 'Subcutaneous', 'Topical', 'Other']
  }],
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'archived'],
    default: 'draft'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String,
    trim: true
  }
},
{
  timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);

// Indexes for faster search
medicationSchema.index({ brandName: 'text', genericName: 'text' });

module.exports = mongoose.model('Medication', medicationSchema);