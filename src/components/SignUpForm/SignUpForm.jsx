import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../utilities/users-service';
import { Link } from 'react-router-dom';

export default function SignUpForm({ setUser }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
    });

    const handleChange = (evt) => {
        setFormData(prevState => ({
          ...prevState,
          [evt.target.name]: evt.target.value,
          error: ''
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const user = await signUp({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            setUser(user); // Updates the state with the new user
            navigate('/add-asset'); // Navigate to the '/add-asset' page
        } catch {
            setFormData(prevState => ({
                ...prevState,
                error: 'Sign Up Failed - Try Again'
            }));
        }
    };

  const disable = formData.password !== formData.confirm;

  return (
    <div className="login-parent">
      <div className="login-form-container">
        <h4 className="login-header">Let's start by getting you signed up</h4>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label className='email'>Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label className="email">Email Address *</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} required />
          <label className='password'>Password *</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label className='password'>Confirm Password *</label>
          <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
          <h3 className='required-fields'>* Required Fields</h3>
          <div className="signup-button-container">
           
              <button type="submit" disabled={disable}>SIGN UP</button>

          </div>
        </form>
      </div>
      <p className="error-message">&nbsp;{formData.error}</p>
    </div>
  );
}