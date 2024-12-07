import './style.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import API_KEY  from './constant';

const App = () => {
  const [weather, setWeather] = useState();
  const [search, setSearch] = useState("pune");
  const [forecast, setForecase] = useState([])
  const [theme ,setTheme] = useState(true);
  const [temp, setTemp] = useState(true);
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    let searchValue = search.toLowerCase(); 
    axios
    .get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchValue}&days=7`)
    .then((response) =>{
      // console.log(response.data.current);
      setForecase(response.data.forecast.forecastday)
      setWeather(response.data.current);
      setCity(response.data.location)
      console.log(response.data.forecast.forecastday);
   
    })
    .catch((error) => {
      console.log(error);
    })
    setSearch('');
     e.preventDefault();
  };


  useEffect(() => {
    handleSubmit(event)
  }, []);

//Theme change logic
useEffect(() => {
if(theme){
    document.body.classList.add('light-mode');
  }else{
    document.body.classList.remove('light-mode');
  }
},[theme])
  


const date = new Date(city.localtime || "");
const week =  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];
const year = date.getFullYear();
const month = months[date.getMonth()]; // Months are zero-based, so add 1
const day = week[date.getDay()];
const hours = date.getHours();
const minutes = date.getMinutes();

const forecastDays = (days) => {
  const date = new Date(days || "");
  const week =  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return week[date.getDay()];

}
// F=(C× 5/9)+32
const tempConv = (temperature, isCelsius) => {
  if (isCelsius) {
    return temperature.toFixed(0);
  } else {
    return ((temperature * 9) / 5 + 32).toFixed(0);
  }
};


// ***************************************************************

  return (
    <>
    <div className="container py-5">

    <div className="row justify-content-center">
    <div className="col-lg-8 col-xl-8 col-mb-12 col-sm-12 py-2">
    <div className="card">
    <div className="card-body">
    
    <div className="themes">
    <h3 className="theme-logo" onClick={() => setTheme(!theme)}> {theme?'🌞':'🌙'} </h3>
    <img onClick={()=>window.open('https://github.com/NAYAN-KAHAR')} className="mt-1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/2048px-Github-desktop-logo-symbol.svg.png" width={27} height={27}/>
    </div>

    <form className="form mt-4" onSubmit={handleSubmit}>
    <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)} className="form-control" placeholder="Enter a city"/>
    </form>
  {/*********************************************************************/}
    <div className="row justify-content-center">
    <div className="col-lg-4 col-12 col-sm-12 col-mb-12 d-flex">
      <div className="mx-1 mt-3">
       <img className="mlogo" src={weather?.condition?.icon} width={100}/></div>
        <div className="text-details mt-4 mx-2">
        <h3 className="city"><b>{city.name}</b></h3>
        <p className="times">{hours?hours:null}:{minutes?minutes:null},{day} {month} {year}</p>

        <p className="overcast-text">Overcast {weather && weather.condition.text}</p>
      </div>

    </div>

    <div className="col-lg-4 col-12 col-sm-12 col-mb-12 ">
    <h1 className="py-5 temp"><b>{weather && tempConv(weather.temp_c,temp)}</b></h1>
    </div>

    <div className="col-lg-4 col-12 col-sm-12 col-mb-12 mt-4" style={{lineHeight:0.5}}>
    <div className="mx-4 details-text">
    <div className="mx-4 d-flex switchTemp">
       <h3 onClick={() => setTemp(true)}>°C |</h3>
       <h3 onClick={() => setTemp(false)}>℉</h3>
  </div>
    <p className="humidity mx-4 mt-3">Humidity: {weather && weather.humidity}%</p>
    <p className="wind mx-4">Wind: {weather && weather.wind_kph}/kph</p>
    </div></div>

    </div>
      
{/*********************** forecast ********************************/}
    <hr/>
<div className="row justify-content-center">
<div className="col-lg-12">
<div className="forecast-details">
  
{forecast && forecast.map((data,index) => {

     return <div className="text-center" key={index}>
    <h5>{forecastDays(data.date)}</h5>
    <img src={data.day.condition.icon} width={70} />
    <p>{tempConv(data.day.maxtemp_c,temp)}{temp?"°C":"℉"}</p>
   </div>
   
})

}


</div>
  </div>
</div>




{/*************************************/}
    </div></div></div>

    {/***************************************************/}
    </div></div>
    </>
  );
}

export default App;

