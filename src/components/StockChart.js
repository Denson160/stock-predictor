import React, { useState, useEffect } from 'react';  
import Chart from 'chart.js/auto';  // Import Chart.js  
import axios from 'axios';  

function StockChart({ ticker }) {  
    const [chartData, setChartData] = useState(null);  

    useEffect(() => {  
        const fetchChartData = async () => {  
            try {  
                // Fetch historical data from your backend  
                const response = await axios.get(`http://localhost:4000/historical-data/${ticker}`); // Adjust the URL  
                const data = response.data;  

                // Process data for Chart.js  
                const dates = data.map(item => item.Date); // Assuming your backend returns Date  
                const prices = data.map(item => item.Close); // Assuming your backend returns Close  

                setChartData({  
                    labels: dates,  
                    datasets: [{  
                        label: `Stock Price of ${ticker}`,  
                        data: prices,  
                        fill: false,  
                        borderColor: 'rgb(75, 192, 192)',  
                        tension: 0.1  
                    }]  
                });  
            } catch (error) {  
                console.error("Error fetching chart data:", error);  
            }  
        };  

        fetchChartData();  
    }, [ticker]);  

    useEffect(() => {  
        if (chartData) {  
            const ctx = document.getElementById('stockChart').getContext('2d');  
            new Chart(ctx, {  
                type: 'line',  
                data: chartData,  
            });  
        }  
    }, [chartData]);  

    return (  
        <div>  
            <canvas id="stockChart" width="400" height="200"></canvas>  
        </div>  
    );  
}  

export default StockChart;