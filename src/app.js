import React, { useState, useEffect } from 'react';
import StockData from './components/StockData';
import StockChart from './components/StockChart';

function App() {
    const [ticker, setTicker] = useState('AAPL');
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrediction = async () => {
            try {
                const response = await fetch(`http://localhost:4000/lstm-prediction/${ticker}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPrediction(data.prediction);
                setError(null);
            } catch (err) {
                console.error("Error fetching prediction:", err);
                setError(err.message || "Failed to fetch prediction");
                setPrediction(null);
            }
        };

        fetchPrediction();
    }, [ticker]);

    const handleTickerChange = (newTicker) => {
        setTicker(newTicker);
    };

    return (
        <div className="App">
            <h1>Stock Prediction App</h1>
            <StockData onTickerChange={handleTickerChange} />
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {prediction !== null ? (
                <>
                    <p>Predicted price for {ticker}: {prediction.toFixed(2)}</p>
                    <StockChart ticker={ticker} />
                </>
            ) : (
                <p>Loading prediction...</p>
            )}
        </div>
    );
}

export default App;
