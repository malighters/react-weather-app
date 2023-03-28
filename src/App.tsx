import { useState } from 'react';
import axios from 'axios';
import { IData } from './IData';
import './index.css';


function App() {
  
  const [data, setData] = useState<IData>()
  const [city, setCity] = useState<string>('');

  const urlApiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;

  const getData = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter') {
      axios.get(urlApiCall).then((res) => setData(res.data));
      setCity('');
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input 
          type="text" 
          value={city} 
          onChange={(e) => {setCity(e.target.value)}} 
          onKeyDown={getData}
          placeholder="Enter city"

        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>{ data ? <p>{data?.name}, {data?.sys.country}</p> : null }</div>
          <div className='temp'>{data?.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null }</div>
          <div className='description'>{ data?.weather ? <p>{data.weather[0].description}</p> : null }</div>
        </div>

        { data?.name !== undefined && 
        <div className='bottom'>
          <div className='feels'><p>Feels like</p>{ data?.main ? <p className='bold'>{data?.main.feels_like.toFixed()} °C</p> : null }</div>
          <div className='humidity'><p>Humidity</p>{ data?.main ? <p className='bold'>{data?.main.humidity} %</p> : null }</div>
          <div className='wind'><p>Wind</p>{ data?.main ? <p className='bold'>{data?.wind.speed.toFixed()} m/s</p> : null } </div>
        </div> }
      </div>
    </div>
  )
}

export default App
