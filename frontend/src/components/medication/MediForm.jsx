import React, { useState } from 'react';

const MedicationForm = ({ onSubmit, userId }) => {

  const [formData, setFormData] = useState({
    brandName: '',
    genericName: '',
    compatibleSolutions: [],
    methodOfAdministration: [],
    timeOfStability: [''],
    methodOfPreparation: '',
    notes: ''
  });

  const [query, setQuery] = useState("");
    // Handle search input change
    const handleSearch = (e) => {
      setQuery(e.target.value);
    };


  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayField = (field, index) => {
    const filtered = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: filtered });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      createdBy: userId // Assuming userId is provided via props
    });
  };

  return (
    <>
      {/* Search Subscribers */}
      <div className="search-container">
        <input
        type="text"
        placeholder="Search by ID or name..."
        value={query}
        onChange={handleSearch}
       />
      </div>
    <h1>Medication Form</h1>
    <form onSubmit={handleSubmit} className="medication-form">
      {/* Brand Name */}
      <div className='medi-name'>
      <div className="form-group">
        <label htmlFor='brandName'>Brand Name *</label>
        <input
          id='brandName'
          type="text"
          value={formData.brandName}
          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
          required
        />
      </div>

      {/* Generic Name */}
      <div className="form-group">
        <label htmlFor='genericName'>Generic Name *</label>
        <input
          id='genericName'
          type="text"
          value={formData.genericName}
          onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
          required
        />
      </div>
      </div>

        {/* Compatible Solutions */}
        <div className="form-group">
          <label>Compatible Solutions *</label>
          <div className="checkbox-group" role="group">
            {['0.9% NaCl', 'D5W', 'Lactated Ringer\'s', 'Sterile Water'].map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.compatibleSolutions.includes(option)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      compatibleSolutions: e.target.checked
                        ? [...prev.compatibleSolutions, value]
                        : prev.compatibleSolutions.filter(item => item !== value)
                    }));
                  }}
                />
                <span className="checkmark"></span>
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Method of Administration */}
        <div className="form-group">
          <label>Method of Administration *</label>
          <div className="checkbox-group" role="group">
            {['IV', 'IM', 'Oral', 'Subcutaneous'].map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.methodOfAdministration.includes(option)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      methodOfAdministration: e.target.checked
                        ? [...prev.methodOfAdministration, value]
                        : prev.methodOfAdministration.filter(item => item !== value)
                    }));
                  }}
                />
                <span className="checkmark"></span>
                {option}
              </label>
            ))}
          </div>
        </div>
      {/* Time of Stability */}
      <div className="form-group">
        <label>Time of Stability Entries *</label>
        {formData.timeOfStability.map((entry, index) => (
          <div key={index} className="array-entry">
            <input
              type="text"
              value={entry}
              onChange={(e) => handleArrayChange('timeOfStability', index, e.target.value)}
              required
            />
            {formData.timeOfStability.length > 1 && (
              <button type="button" onClick={() => removeArrayField('timeOfStability', index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField('timeOfStability')}>
          Add Another Time Entry
        </button>
      </div>

      {/* Method of Preparation */}
      <div className="form-group">
        <label>Method of Preparation *</label>
        <textarea
          value={formData.methodOfPreparation}
          onChange={(e) => setFormData({ ...formData, methodOfPreparation: e.target.value })}
          required
        />
      </div>

      {/* Notes */}
      <div className="form-group">
        <label>Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <button type="submit">Submit Medication</button>
    </form>
  </>
  );
};

export default MedicationForm;