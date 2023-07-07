import axios from 'axios';


export async function fetchIntradayData(symbol) {
    try {
        const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval: '1min',
                apikey: 'B7MG5090XUXCRPX3',
            },
        });

        const rawData = response.data['Time Series (1min)'];
        const processedData = Object.entries(rawData).map(([datetime, data]) => ({
            datetime,
            open: +data['1. open'],
            high: +data['2. high'],
            low: +data['3. low'],
            close: +data['4. close'],
        }));

        return processedData;
    } catch (err) {
        console.error('Failed to detch data from API', err);
        throw err
    }
}