import {Component} from 'react';
import axios from 'axios';
import Autosuggest from "react-autosuggest";
import '../css/NewAssetForm.css'

export default class NewAssetForm extends Component {
    state = {
        ticker: '',
        units: '',
        sector: 'Energy',
        tickerSuggestions: []
    }

    componentDidUpdate(prevProps) {
        if (this.props.asset !== prevProps.asset) {
            if (this.props.asset) {
                this.setState(this.props.asset);
            } else {
                this.setState({ticker: '', units: '', sector: '', tickerSuggestions: []});
            }
        }
    }

    handleChange = (evt) => {
        const newState = {
          [evt.target.name]: evt.target.value,
          error: ''
        };
        this.setState(newState, () => {
            if (this.props.onAssetChange) {
                this.props.onAssetChange(newState);
            }
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
          // Check if this is an edit operation
          if (this.props.asset && this.props.asset._id) {
            // Update existing asset
            await axios.put(`/api/portfolio/${this.props.user._id}/asset/${this.props.asset._id}`, formData);
          } else {
            // Create new asset
            await axios.post(`/api/portfolio/${this.props.user._id}/asset`, formData);
          }
          // Call onSave function if provided (this is to support modal closing and other post-save operations)
          if (this.props.onSave) {
            this.props.onSave();
          }
        } catch(error) {
          console.error(error);
          this.setState({ error: 'Asset was not added. Please try again.' });
        }
      };

      getTickerSuggestions = async (value) => {
        try {
          const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${process.env.REACT_APP_ALPHA_API_KEY}`, {
              headers: {
                //   'User-Agent': 'request'
              }
          });
          
          if (response.data && response.data['bestMatches']) {
            this.setState({ tickerSuggestions: response.data['bestMatches'] });
        } else {
            this.setState({ tickerSuggestions: [] });
        }
    } catch (error) {
        console.log('Ticker API error:', error);
        this.setState({ tickerSuggestions: [] });
    }
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
    getTickerSuggestionValue = (suggestion) => suggestion['1. symbol'];

    renderTickerSuggestion = (suggestion) => (
        <div key={suggestion['1. symbol']} className="suggestion-item">
        {`${suggestion['1. symbol']} - ${suggestion['2. name']}`}
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
        onChange: this.handleTickerChange,
        className: "form-control"
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
                    theme={{
                        suggestionsContainer: 'suggestions-container',
                        suggestion: 'suggestion-item',
                        suggestionHighlighted: 'suggestion-item--highlighted'
                      }}                
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