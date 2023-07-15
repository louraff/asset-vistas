import {Component} from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
    }


    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
        });
      };

    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
          const formData = {...this.state};
          delete formData.confirm;
          delete formData.error;
          const user = await signUp(formData);
          this.props.setUser(user);
        } catch {
          // An error occurred, like a dup email address
          this.setState({ error: 'Sign Up Failed - Try Again' });
        }
      };

      render() {
        const disable = this.state.password !== this.state.confirm;
        return (
          <div className="login-parent">
          <div className="login-form-container">
          <h4 className="login-header">Let's start by getting you signed up</h4>
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label className='email'>Name *</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                <label className="email">Email Address *</label>
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} required />
                <label className='password'>Password *</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                <label className='password'>Confirm Password *</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                <h3 className='required-fields'>* Required Fields</h3>
                <div className="signup-button-container">
                <button type="submit" disabled={disable}>SIGN UP</button>
                </div>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
      
    }