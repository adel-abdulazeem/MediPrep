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
    enum: ['0.9% NaCl', 'D5W', 'Lactated Ringer\'s', 'Sterile Water']
  }],
  timeOfStability: [{
    type: String,
    required: true,
    example: '24 hours refrigerated after reconstituted by 0.9% Nacl'
  }],
  methodOfPreparation: {
    type: String,
    required: true,
    trim: true
  },
  methodOfAdministration: [{
    type: String,
    required: true,
    enum: ['IV', 'IM', 'Oral', 'Subcutaneous', 'Topical']
  }],
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['approved', 'openForUpdate'],
    default: 'openForUpdate'
  },
  // createdBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
},
{
  timestamps: true, 
}
);

// Indexes for faster search
medicationSchema.index({ brandName: 'text', genericName: 'text' });

module.exports = mongoose.model('Medication', medicationSchema);