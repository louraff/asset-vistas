import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { Link, useNavigate } from 'react-router-dom';
import "../css/LoginForm.css"

export default function SignUpForm({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  });

  const handleChange = (evt) => {
    setForm(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
      error: ''
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {confirm, error, ...formData} = form;
      const user = await signUp(formData);
      setUser(user);
      navigate('/add-asset', {replace:true});
    } catch {
      // An error occurred, like a dup email address
      setForm(prevState => ({
        ...prevState,
        error: 'Sign Up Failed - Try Again',
      }));
    }
  };

  const disable = form.password !== form.confirm;
  
  return (
    <div className="login-parent">
      <div className="login-form-container">
        <h4 className="login-header">Welcome! Start by getting signed up</h4>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label className='email'>Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
          <label className="email">Email Address *</label>
          <input type="text" name="email" value={form.email} onChange={handleChange} required />
          <label className='password'>Password *</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <label className='password'>Confirm Password *</label>
          <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required />
          <h3 className='required-fields'>* Required Fields</h3>
          <div className="button-container">
            <Link to='/'>Already have an account?</Link>
            <button type="submit" className="button-container-login" disabled={disable}>SIGN UP</button>
          </div>
        </form>
        <p className="error-message">&nbsp;{form.error}</p>
      </div>
    </div>
  );
}
