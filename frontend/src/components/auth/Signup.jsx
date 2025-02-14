import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = 'Username is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = ' Confirm Passward doesn\'t match Passward';
    console.log(newErrors.confirmPassword)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    // Basic validation
    if (validateForm()) {
      setFormData({ userName: '', email: '', password: '', confirmPassword: '', role: 'user' }); // 
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      setLoading(true);
      console.log("Signup successful:", data);
      alert("Signup successful!"); // Notify the user
    } catch (err) {
      setErrors(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  }
  };

  return (
     <>
          <div className="form-description">
          <h2>Create New User</h2>
          {/* {errors.userName && <div className="alert alert-danger">{errors.userName}</div>} */}
          </div>
          <div className="admin-user-form-container">
               <form onSubmit={handleSubmit} method="POST">
                    <div className="form-group">
                         <label >User Name*
                         <input 
                         type="text" 
                         name="userName" 
                         value={formData.userName}
                         onChange={handleChange}
                         required
                         />
                        {errors.userName && <span className="error">{errors.userName}</span>}                         
                         </label>
                    </div >
                    <div className="form-group">
                         <label>E-mail
                         <input 
                         type="email" 
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         aria-describedby="emailHelp"
                         required
                          />
                          {errors.email && <span className="error">{errors.email}</span>}               
                         </label>  
                    </div>
                    <div className="form-group">
                         <label>Password*
                         <div className="password-input">
                         <input 
                         type={showPassword ? "text" : "password"}
                         name="password"
                         value={formData.password}
                         onChange={handleChange}
                         required 
                         />
                         <button
                          type="button"
                          className="toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                         >
                           {showPassword ? '👁️' : '👁'}
                         </button>
                        </div>
                        {errors.password && <span className="error">{errors.password}</span>}
                         </label>
                    </div>
                    <div className="form-group">
                         <label>Confirm Password*
                         <div className="password-input">
                         <input 
                         type={showPassword ? "text" : "password"}
                         name="confirmPassword" 
                         value={formData.confirmPassword}
                         onChange={handleChange}
                         required 
                         />
                         <button
                          type="button"
                          className="toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                         >
                           {showPassword ? '👁️' : '👁'}
                         </button>
                        </div>
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                         </label>
                    </div>

                    <div className="form-group">
                      <label>
                        User Role *
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="role-select"
                        >
                          <option value="user">Regular User</option>
                          <option value="admin">Administrator</option>
                        </select>
                        <p className="role-help-text">Admins can manage users and content</p>
                      </label>
                    </div>
                    <div className="form-actions">   
                    <button type="submit" className="submit-btn">
                         {loading ? "Creating User..." : "Create User"}
                    </button>
                    </div>
               </form>
          </div>
     </>
    )
}


















