import { useState, useEffect } from "react";

export default function DashBoard() {
  const [medications, setMedications] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  // GET medications
  useEffect(() => {
    const fetchMedications = () => {
      fetch("http://localhost:3000/medication", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(data => setMedications(data))
        .catch(console.error);
    };
    fetchMedications();
  }, [refreshData]);

  // Toggle approval status
  const handleApproval = async (id) => {
    try {
      const medToUpdate = medications.find(med => med._id === id);
      if (!medToUpdate) return;

      const response = await fetch(`http://localhost:3000/medication/approve/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !medToUpdate.approved }),
      });

      if (!response.ok) throw new Error('Update failed');

      setMedications(medications.map(med => 
        med._id === id ? { ...med, approved: !med.approved } : med
      ));
      setRefreshData(prev => !prev);
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed. Please try again.");
    }
  };
  console.log(medications)

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Action</th>
            <th>CreatedBy</th>
          </tr>
        </thead>
        <tbody>
          {medications.map(med => (
            <tr key={med._id}>
              <td>
                {med.brandName}
              </td>
              {localStorage.getItem('userRole') === 'admin' && (
                <td>
                  <button onClick={() => handleApproval(med._id)}>
                    {med.approved ? "Unapprove" : "Approve"}
                  </button>
                </td>
              )}
               <td>{med.createdBy?.userName || "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}