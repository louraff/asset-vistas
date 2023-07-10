import axios from 'axios';

export async function fetchHistoricalData(symbol, interval, outputsize='compact') {
    
    const params = {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval,
                outputsize,
                apikey: process.env.REACT_APP_API_KEY,
            };

            console.log(process.env.REACT_APP_API_KEY);
    try {
        const response = await axios.get('https://www.alphavantage.co/query', {params});
        return response.data;
    } catch (err) {
        console.error('Failed to fetch historical data from API ', err);
        throw err
    }
}
