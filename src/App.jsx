import { useState } from "react"
import Display from './components/Display'
import './index.css'

function App() {
  const [city, setCity] = useState("")
  const [temperature, setTemperature] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const geoRes = await fetch( `https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoRes.json();

      if(!geoData.results || geoData.results.length === 0) {
        setError("City not found");
      }

      const {latitude, longitude} = geoData.results[0];



      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`)
      const weatherData = await weatherRes.json();

      setTemperature(weatherData.current_weather.temperature)
      setError("")
    } catch (error) {
      setError(error.message)
      setTemperature(null)
    }

  }


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        onChange={handleChange} 
        value={city} 
        placeholder="Enter city name"
        className="input"
        />
        <button className="submit-btn" type="submit">Get the Weather</button>
      </form>

      {error && <p style={{color: "red"}}>{error}</p>}

      {temperature !== null && (
        <Display city={city} temperature={temperature}/>
      )}
    </div>
  )
}

export default App
