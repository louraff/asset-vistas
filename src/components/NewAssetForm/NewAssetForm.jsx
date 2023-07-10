import {Component} from 'react';
import axios from 'axios';
import Autosuggest from "react-autosuggest";

export default class NewAssetForm extends Component {
    state = {
        ticker: '',
        units: '',
        sector: '',
        tickerSuggestions: []
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

          console.log(this.props.user._id)
          console.log(formData);
          // POST request to the server
          const res = await axios.post(`/api/portfolio/${this.props.user._id}/asset`, formData);
          console.log(res);
          // handle response from server
        } catch(error) {
          console.error(error);
          this.setState({ error: 'Asset was not added. Please try again.' });
        }
      };

      getTickerSuggestions = async (value) => {
        const response = await axios.get(`https://twelve-data1.p.rapidapi.com/symbol_search?q=${value}`, {
            headers: {
                'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }
        });
    
        this.setState({ tickerSuggestions: response.data.data.symbols });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    onTickerSuggestionsFetchRequested = ({ value }) => {
        this.getTickerSuggestions(value);
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onTickerSuggestionsClearRequested = () => {
        this.setState({
        tickerSuggestions: []
        });
    }; 
        // When suggestion is clicked, Autosuggest needs to populate the input field based on the clicked suggestion.
    getTickerSuggestionValue = (suggestion) => suggestion;

    renderTickerSuggestion = (suggestion) => (
        <div>
          {suggestion}
        </div>
    );
    
    handleTickerChange = (event, { newValue }) => {
        this.setState({
        ticker: newValue
        });
    };

      render() {
        const { ticker, tickerSuggestions } = this.state;

        // Autosuggest will pass through all these props to the input field.
    const tickerInputProps = {
        placeholder: "Type a ticker",
        value: ticker,
        onChange: this.handleTickerChange
      };
  

        return (
          <div>
            <div className="asset-form-container">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Ticker</label>
                <Autosuggest
              suggestions={tickerSuggestions}
              onSuggestionsFetchRequested={this.onTickerSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onTickerSuggestionsClearRequested}
              getSuggestionValue={this.getTickerSuggestionValue}
              renderSuggestion={this.renderTickerSuggestion}
              inputProps={tickerInputProps}
            />

                <label>Units</label>
                <input type="number" name="units" value={this.state.units} onChange={this.handleChange} required />
                <label>Sector</label>
                <select name="sector" value={this.state.sector} onChange={this.handleChange} required>
                    <option value="Energy">Energy</option>
                    <option value="Materials">Materials</option>
                    <option value="Industrials">Industrials</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Financials">Financials</option>
                    <option value="Consumer Discretionary">Consumer Discretionary</option>
                    <option value="Consumer Staples">Consumer Staples</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Communication Services">Communication Services</option>
                    <option value="Real Estate">Real Estate</option>
                </select>
                <button type="submit">Add Asset</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
      
    }