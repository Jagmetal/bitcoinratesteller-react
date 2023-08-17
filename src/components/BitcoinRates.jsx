import React, { useState, useEffect } from 'react';

const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

function BitcoinRates() {
    const [currency, setCurrency] = useState(currencies[0]);
    const [bitcoinPrice, setBitcoinPrice] = useState(null);

    useEffect(() => {
        const fetchBitcoinPrice = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency.toLowerCase()}`); // Convert to lowercase
                const data = await response.json();
                console.log('API response:', data);
                console.log('Selected currency:', currency);
                setBitcoinPrice(data.bitcoin[currency.toLowerCase()]); 
                
            } catch (error) {
                console.error('Error fetching Bitcoin price:', error);
                setBitcoinPrice(null);
            }
        };
    
        fetchBitcoinPrice();
    }, [currency]);

    const options = currencies.map(curr => (
        <option value={curr} key={curr}>
            {curr}
        </option>
    ));

    return (
        <div className="BitcoinRates componentBox">
            <h3>Bitcoin Exchange Rate</h3>
            <label>
                Choose currency:
                <select value={currency} onChange={e => setCurrency(e.target.value)}>
                    {options}
                </select>
            </label>
            <p>
                {bitcoinPrice !== null ? (
                    `Current Bitcoin Price in ${currency}: ${bitcoinPrice}`
                ) : (
                    'Fetching Bitcoin price...'
                )}
            </p>
        </div>
    );
}

export default BitcoinRates;
