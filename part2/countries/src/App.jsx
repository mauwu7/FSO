import { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {

  const [value,setValue] = useState('');
  const [result, setResult] = useState([]);

  useEffect(()=>{
    if(value!= ''){
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(({data})=>{
        setResult(data.filter(({name})=>name.common.toLowerCase().includes(value.toLowerCase())));
      });
    }
  },[value]);

  const handleInput = (event)=> setValue(event.target.value);

  return(
    <>
      <h1>Countries</h1>
      <p>Find countries <input value={value} onChange={handleInput}/></p>
      {(value!=='')&&<Busuqeda result={result}/>}
    </>
  );

};

const Busuqeda = ({result}) =>{

  return(
    <div>
      {(result.length > 10) ? <p>Too many matches, specify another filter</p>:
      (result.length > 1 && result.length <10) ? result.map((country)=><Country key={country.name.common} name={country.name.common} pais={country}/>):
      (result.length == 1) ? <InformationCountry info={result[0]}/>:<p>Nada....aun</p>
      }
    </div>
  );
};

const Country = ({name,pais})=>{

  const [activo, setEstado] = useState(false);

  const handleClick = () => setEstado(true);

  if(activo){
    return(
      <InformationCountry info={pais}/>
    );
  }
  else{
    return(
      <p>
        {name} 
        <button onClick={handleClick}>Show</button>
      </p>
    );
  }
};

const InformationCountry = ({info})=>{
  const api_key=import.meta.env.VITE_KEY_AP;
  const [dataWeather, setData] = useState({});

  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${info.capitalInfo.latlng[0]}&lon=${info.capitalInfo.latlng[1]}&units=metric&&appid=${api_key}`)
    .then(({data})=>{
      setData({
        weather:data.main.temp,
        wind:data.wind.speed,
        icon:data.weather[0].icon
      })
    });
  },[]);
  
  return(
    <>
      <h1>{info.name.common}</h1>
      <p>Capital: {info.capital[0]}</p>
      <p>Area: {info.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(info.languages).map((language)=><li key={language}>{language}</li>)}
      </ul>
      <img src={`${info.flags.png}`}/>
      <h2>Weather in {info.capital[0]}</h2>
      <p>Temperature {dataWeather.weather}</p>
      <img src={`https://openweathermap.org/img/wn/${dataWeather.icon}`}/>
      <p>Wind {dataWeather.wind}</p>
    </>
  );
};

export default App;
