import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from'../assets/images/search.png'
import clear_icon from'../assets/images/clear.png'
import cloud_icon from'../assets/images/cloud.png'
import drizzle_icon from'../assets/images/drizzle.png'
// import humidity_icon from'../assets/images/humidity.png'
import rain_icon from'../assets/images/rain.png'
import snow_icon from'../assets/images/snow.png'
// import wind_icon from'../assets/images/wind.png'
import humidity_gif from'../assets/images/humidity.gif'
import wind_gif from'../assets/images/wind.gif'
const Weather = () => {
  
    const inputref= useRef()
    const[weatherData,setWeatherData]=useState(false)

    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }

    const search= async (city)=> {
        if(city===""){
            alert("Enter City Name")
            return
        }
        try{
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=78fc68504d1d964f45e49a4b71b4cde1`
            const response = await fetch(url)
            const data = await response.json()

            if(!response.ok){
                alert(data.message)
                return
            }
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeatherData({
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon: icon
            })
        }
        catch(error){
            setWeatherData(false)
            console.log(error)
            console.error("Error In Fetching Data")
        }
    }

    useEffect(()=>{
        search("Chennai")
    },[])
  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputref} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputref.current.value)}/>
      </div>
      {weatherData?<>
        <img src={clear_icon} alt="" className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className="col">
            <img src={humidity_gif} alt="" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>

        <div className="col">
            <img src={wind_gif} alt="" />
            <div>
                <p>{weatherData.windspeed} Km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather
