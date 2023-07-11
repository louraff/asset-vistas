import axios from 'axios';

export async function fetchHistoricalData(symbol, range='1y') {
    const url = `https://api.iex.cloud/v1/data/core/historical_prices/${symbol}?range=${range}&token=${process.env.REACT_APP_IEX_API_KEY}`;

        console.log(process.env.REACT_APP_IEX_API_KEY)
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch historical data from API ', err);
        throw err;
    }
}


//* code for twelvedata api:

// import axios from 'axios';

// export async function fetchHistoricalData(symbol, interval='1min', outputsize='compact') {
//     const params = {
//         symbol,
//         interval,
//         outputsize,
//         format: 'json', 
//     };

//     const headers = {
//         'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
//         'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
//     }

//     try {
//         const response = await axios.get('https://twelve-data1.p.rapidapi.com/time_series', {params, headers});
//         return response.data;
//     } catch (err) {
//         console.error('Failed to fetch historical data from API ', err);
//         throw err
//     }
// }