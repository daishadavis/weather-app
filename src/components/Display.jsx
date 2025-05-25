import '../index.css'

const Display = ({city, temperature}) => {
  return (
    <div className="weather-container">
        <h2 className="city">{city}</h2>
        <p className="temperature">{temperature} F</p>
    </div>
  )
}

export default Display