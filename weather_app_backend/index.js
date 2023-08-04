import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const apiKey = "5c311e4fdf72b518e0ba40a536f07435";

// app.use(express.json());

// After app.use(express.json());
app.use(cors());

app.get("/api/weather", async (req, res) => {
  try {
    const { location } = req.query;
    console.log(location);
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      
    );
    const weatherData = {
      location: weatherResponse.data.name,
      conditions: weatherResponse.data.weather[0].description,
      temperature: `${weatherResponse.data.main.temp}°C`,
      humidity: `${weatherResponse.data.main.humidity}%`,
    };
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  try {
    console.log(`Server listening on port ${PORT}`);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});
