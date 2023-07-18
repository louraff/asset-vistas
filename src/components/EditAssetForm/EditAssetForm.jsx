import {Component} from 'react';
import axios from 'axios';
import Autosuggest from "react-autosuggest";
import "../css/EditAssetForm.css"
import "../css/LoginForm.css"
import { Button } from '@mui/material';



export default class EditAssetForm extends Component {
    state = {
        ticker: '',
        units: '',
        sector: '',
        tickerSuggestions: [],
        error: '',
        successMessage: '',
    }

    componentDidUpdate(prevProps) {
        if (this.props.asset !== prevProps.asset) {
            if (this.props.asset) {
                this.setState(this.props.asset);
            } else {
                this.setState({
                ticker: '', 
                units: '', 
                sector: '', 
                tickerSuggestions: [], 
                error: '',
                successMessage: '',});
            }
        }
    }

    handleChange = (evt) => {
        const newState = {
          [evt.target.name]: evt.target.value,
          error: '',
          successMessage: '',
        };
        this.setState(newState, () => {
            if (this.props.onAssetChange) {
                this.props.onAssetChange(newState);
            }
        });
    };
    

    handleSubmit = async (evt) => {
        evt.preventDefault();
        const formData = {...this.state};
        delete formData.confirm;
        delete formData.error;
        delete formData.successMessage;
    
        // call onSubmit with the new asset data
        this.props.onSubmit(formData);
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
      

    onTickerSuggestionsFetchRequested = ({ value }) => {
        this.getTickerSuggestions(value);
    };

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
        const { ticker, tickerSuggestions, successMessage } = this.state;
        const { asset } = this.props;
    
        let titlePart1 = 'ADD ASSET';
        let titlePart2 = '';
        if (asset) {
            titlePart1 = 'EDIT ASSET: ';
            titlePart2 = asset.ticker;
        }
        
        const tickerInputProps = {
            placeholder: "Type a ticker",
            value: ticker,
            onChange: this.handleTickerChange,
            className: "form-control"
        };
      
        return (
            <div className='modal-home'>
            <div className="modal-parent">
                <div className="edit-form-container">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <h4 className="edit-header">
                            <span style={{fontWeight: '100'}}>{titlePart1}</span>
                            <span style={{fontWeight: '400'}}>{titlePart2}</span>
                        </h4>
    
              <div className="form-group">
             
              
              
                <label className='email'>Units</label>
                <input type="text" name="units"  value={this.state.units} onChange={this.handleChange} required />
                </div>
                <label className='email'>Sector</label>
                <select name="sector" className="asset-sector" value={this.state.sector} onChange={this.handleChange} required>
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
                
                <div className="button-container">
                    <button onClick={this.props.onCancel} color="secondary" className="cancel-button">
                    Cancel
                    </button>
                    <Button onClick={this.handleSubmit} color="primary" className="asset-button">
    Save
</Button>
                 </div>
              </form>
              {successMessage && <p className="success-message">{successMessage}</p>}
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
          </div>
          </div>
        );
      }
      
    }