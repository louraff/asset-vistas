import React, { Component } from 'react';

export default class AdditionalInfoForm extends Component {
  state = {
    additionalInfo1: '',
    additionalInfo2: '',
    additionalInfo3: '',
    error: '',
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: '',
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.error;

      const updatedUser = {
        ...this.props.user,
        ...formData,
      };

      // Call the passed function to update user data in the parent component
      this.props.updateUserData(updatedUser);

      // Ultimately set the user
      this.props.setUser(updatedUser);
    } catch (error) {
      this.setState({ error: 'Failed to update information - Try Again' });
    }
  };

  render() {
    const riskToleranceOptions = [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ];

    const investmentGoalOptions = [
      { value: 'long-term-growth', label: 'Long-Term Growth' },
      { value: 'income-generation', label: 'Income Generation' },
      { value: 'capital-preservation', label: 'Capital Preservation' },
      { value: 'retirement', label: 'Retirement' },
      { value: 'education', label: 'Education' },
      { value: 'buying-a-home', label: 'Buying a Home' },
    ];

    const investmentConstraintOptions = [
      { value: 'ethical-considerations', label: 'Ethical Considerations' },
      { value: 'legal-restrictions', label: 'Legal Restrictions' },
      { value: 'investment-type-limitations', label: 'Investment Type Limitations' },
    ];

    return (
      <div className="form-container">
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <label>Risk Tolerance</label>
          <select
            name="additionalInfo1"
            value={this.state.additionalInfo1}
            onChange={this.handleChange}
            required
          >
            <option value="">Select...</option>
            {riskToleranceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label>Investment Goals</label>
          <select
            name="additionalInfo2"
            value={this.state.additionalInfo2}
            onChange={this.handleChange}
            required
          >
            <option value="">Select...</option>
            {investmentGoalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label>Investment Constraints</label>
          <select
            name="additionalInfo3"
            value={this.state.additionalInfo3}
            onChange={this.handleChange}
            required
          >
            <option value="">Select...</option>
            {investmentConstraintOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button type="submit">Submit</button>
        </form>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
