const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const API_KEYS = {
    weather: process.env.WEATHER_API_KEY,
    marketPrices: process.env.MARKET_API_KEY
};

// Weather API
app.get("/api/weather", async (req, res) => {
    try {
        const city = req.query.city || "Delhi";
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEYS.weather}&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

// Crop Market Prices API (Mock Data)
app.get("/api/market-prices", (req, res) => {
    res.json({
        wheat: "₹2200/quintal",
        rice: "₹2500/quintal",
        maize: "₹1800/quintal"
    });
});

// Farming Tips API
app.get("/api/farming-tips", (req, res) => {
    res.json({
        tips: [
            "Use organic fertilizers to improve soil health.",
            "Practice crop rotation to maintain soil fertility.",
            "Monitor weather forecasts to plan irrigation efficiently."
        ]
    });
});

// Soil Health API (Mock Data)
app.get("/api/soil-health", (req, res) => {
    res.json({
        pH: 6.5,
        nitrogen: "Medium",
        phosphorus: "High",
        potassium: "Low"
    });
});

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
