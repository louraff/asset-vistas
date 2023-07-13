import React, {useEffect, useState} from 'react';
import { fetchHistoricalData } from '../../utilities/historicalData-api';

export default function Card({header, portfolio, calculate = () => {}}) {
    const [value, setValue] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await calculate(portfolio);
            setValue(result)
        }

        fetchData();
    }, [portfolio, calculate])


    return (
        <div className="card">
            <h2>{header}</h2>
            {
                typeof value === 'object' && value !== null ?
                <p>Ticker: {value.ticker}, Units: {value.units}, Sector: {value.sector}</p>
                :
                <p>{value || "Calculating..."}</p>
            }
        </div>
    )
};

