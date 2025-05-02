import React, { useState } from 'react';  

function StockData({ onTickerChange }) {  
    const [ticker, setTicker] = useState('');  

    const handleSubmit = (event) => {  
        event.preventDefault();  
        onTickerChange(ticker);  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <label>  
                Enter Stock Ticker:  
                <input  
                    type="text"  
                    value={ticker}  
                    onChange={(e) => setTicker(e.target.value)}  
                />  
            </label>  
            <button type="submit">Get Prediction</button>  
        </form>  
    );  
}  

export default StockData;  