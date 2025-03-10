import React, { useState, useEffect } from 'react';

const MedicationForm = () => {

  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    brandName: '',
    genericName: '',
    compatibleSolutions: [],
    methodOfAdministration: [],
    timeOfStability: [],
    methodOfPreparation: '',
    notes: ''
  });
  const [medications, setMedications] = useState([])
  const [currentMedId, setCurrentMedId] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(medications)
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.brandName ||
      !formData.genericName ||
      !formData.compatibleSolutions ||
      !formData.methodOfAdministration ||
      !formData.methodOfPreparation ){
      alert("Please fill in all fields");
      setIsLoading(false); 
      return ;
    }
    if (isEditMode) {
      await handleUpdate(); // Call handleUpdate if in edit mode
      return; // Exit the function to prevent further execution
    }
    try{
      const formDataToSend = {
      brandName: formData.brandName.toLowerCase().trim(),
      genericName: formData.genericName.toLowerCase().trim(),
      compatibleSolutions: formData.compatibleSolutions,
      methodOfAdministration: formData.methodOfAdministration,
      timeOfStability: formData.timeOfStability.filter(entry => entry.trim() !== ''),
      methodOfPreparation: formData.methodOfPreparation.trim(),
      notes: formData.notes.trim(),
      createdBy: userId
      }
      const res = await fetch('http://localhost:3000/medication/create',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      };
      const data = await res.json();
      setFormData({
        brandName: "",
        genericName: "",
        compatibleSolutions: [],
        methodOfAdministration: [],
        timeOfStability: [''],
        methodOfPreparation: '',
        notes: '',
      }); 
    } catch(error){
      console.error("Error:", error);
      setError("Failed to update the subscriber. Please try again.");
    } finally {
      setIsLoading(false);
      setError(null)
      setRefreshData(prev => !prev)  
    }
  };

  //GET req
  useEffect(() => {
    const fetchMed = () => {
      console.log(userId)
      fetch(`http://localhost:3000/medication/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }) 
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
            setMedications(data)
            console.log(data)
        })
        .catch((error) => {
          console.error("Error fetching subscribers:", error);
        });
    };
    fetchMed();
  }, [refreshData]);

//PUT req
const handleEdit = (id) => {
  const medToEdit = medications.find((med) => med._id === id);
  if (medToEdit) {
    setFormData({
      brandName: medToEdit.brandName,
      genericName: medToEdit.genericName,
      compatibleSolutions: medToEdit.compatibleSolutions,
      methodOfAdministration: medToEdit.methodOfAdministration,
      timeOfStability: medToEdit.timeOfStability,
      methodOfPreparation: medToEdit.methodOfPreparation,
      notes: medToEdit.notes,
    });
  }
  setIsEditMode(true); 
  setCurrentMedId(id);
};
const handleUpdate = async() =>{
  if (!currentMedId) return; 
  try {
    console.log(formData.brandName)
    const formDataToSend = {
      brandName: formData.brandName.trim(),
      genericName: formData.genericName.trim(),
      compatibleSolutions: formData.compatibleSolutions,
      methodOfAdministration: formData.methodOfAdministration,
      timeOfStability: formData.timeOfStability.filter(entry => entry.trim() !== ''),
      methodOfPreparation: formData.methodOfPreparation.trim(),
      notes: formData.notes.trim()
    }
    const response = await fetch(`http://localhost:3000/medication/update/${currentMedId}`, {
      method: "PUT",
      headers: { // Add headers here
        'Content-Type': 'application/json',
      },
      // credentials: "include",
      body:  JSON.stringify(formDataToSend),
    });
    if (!response.ok) {
      alert("error with update request");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const updatedMed = await response.json();
    setMedications(medications.map(med => med._id === currentMedId ? { ...med, ...updatedMed } : med));

    setFormData({
      brandName: "",
      genericName: "",
      compatibleSolutions: [],
      methodOfAdministration: [],
      timeOfStability: [''],
      methodOfPreparation: '',
      notes: '',
    }); 
  } catch(error){
    console.error("Error:", error);
    setError("Failed to update the subscriber. Please try again.");
  } finally {
    setIsLoading(false);
    setError(null)
    setRefreshData(prev => !prev)  
  }
}
  const handleCancelEdit = () => {
    setIsEditMode(false); 
    setCurrentMedId(null); 
    setFormData({
      brandName: "",
      genericName: "",
      compatibleSolutions: [],
      methodOfAdministration: [],
      timeOfStability: [''],
      methodOfPreparation: '',
      notes: '',
    }); 
  };
  return (
    <>
      <div className="table-container">
        <table>
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Generic Name </th>
             <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medications.map(med =>(
              med.approved? '' :
              <tr key={med._id}>
              <td>
                {med.brandName}
              </td>
              <td>
                {med.genericName}
              </td>
             <td>
             <button
                onClick={() => handleEdit(med._id)}
               className="edit-button"
              >
              Edit
            </button>           
          </td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
    {/* <h1>Medication Form</h1> */}
    <form  onSubmit={handleSubmit} className="medication-form">
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
          <div className="form-btn">
          <button type='submit'
          onClick={handleSubmit} 
           >
            {isEditMode ?"Update Medication" : "Add Medication"}
          </button>
            {isEditMode && (
          <button type="button" onClick={handleCancelEdit}>
              Cancel Edit
          </button>
            )}
          </div>
    </form>
  </>
  );
};

export default MedicationForm;