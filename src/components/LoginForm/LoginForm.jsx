import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import "../css/LoginForm.css"
import { Link } from 'react-router-dom';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className="login-parent">
    <div className="login-form-container">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <h4 className="login-header">LOGIN</h4>
          <label className="email">Email Address *</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className='password'>Password *</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <h3 className='required-fields'>* Required Fields</h3>
        
        <div className="button-container">
        <Link to='/signup'>Don't have an account yet?</Link>
          <button className="button-container-login" type="submit">LOG IN</button>
        </div>
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  </div>
  );
}