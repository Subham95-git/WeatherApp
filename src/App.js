import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';


//api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
const API_Key = "433e8679667e4a994de6b015c4502748";

class App extends React.Component{
 constructor(){
   super();
   this.state = {
     city:undefined,
     country:undefined,
     icon:undefined,
     main:undefined,
     celsius:undefined,
     temp_max:undefined,
     temp_min:undefined,
     description:"",
     error:false,
     //weathericon : undefined
   };
   //this.getWeather();

   this.weathericon = {
      Thunderstrom: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
      Temp:'wi-thermometer',
      Celsius:'wi-celsius'
   }
 }

 calCelsius(temp){
   return Math.floor(temp-273.15)
 }

 get_WeatherIcon(icons, rangeId){
   switch(true){
     case rangeId>=200 && rangeId<=232:
       this.setState({icon:this.weathericon.Thunderstrom});
       break;
      case rangeId>=300 && rangeId<=321:
        this.setState({icon:this.weathericon.Drizzle});
        break;
      case rangeId>=500 && rangeId<=531:
        this.setState({icon:this.weathericon.Rain});
        break;
      case rangeId>=600 && rangeId<=622:
        this.setState({icon:this.weathericon.Snow});
        break;
      case rangeId>=701 && rangeId<=781:
        this.setState({icon:this.weathericon.Atmosphere});
        break;
      case rangeId=800:
        this.setState({icon:this.weathericon.Clear});
        break;
      case rangeId>=801 && rangeId<=804:
        this.setState({icon:this.weathericon.Clouds});
        break;
      default:
        this.setState({icon:this.weathericon.Clouds});
   }
 }

getWeather = async(e)=>{
  e.preventDefault();

  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;

  console.log(city+"  "+country);

  if(city && country){
    const API_Call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`);

  const response = await API_Call.json();

  console.log(response);
  if(response.cod=='200'){
    this.setState({
      city:`${response.name}, ${response.sys.country}`,
      //country:response.sys.country,
      celsius:this.calCelsius(response.main.temp),
      temp_min:this.calCelsius(response.main.temp_min),
      temp_max:this.calCelsius(response.main.temp_max),
      description:response.weather[0].description,
     // weathericon:response.weather[0].icon
      //icon:this.weathericon.Thunderstrom
      error:false
    });

    this.get_WeatherIcon(this.weathericon, response.weather[0].id);
  }else{
    this.setState({
     city:undefined,
     country:undefined,
     icon:undefined,
     main:undefined,
     celsius:undefined,
     temp_max:undefined,
     temp_min:undefined,
     description:"",
      error:true});
  }
  

  
  }
  
  else{
    this.setState({error:true});
  }
}

  render(){
    return(
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error}/>
      <Weather 
      city={this.state.city} 
      country={this.state.country} 
      temp_celsius={this.state.celsius}
      temp_min={this.state.temp_min} 
      temp_max={this.state.temp_max} 
      description={this.state.description}
      weathericon={this.state.icon}
      icon={this.weathericon}
      />
    </div>
    );
  }
}



export default App;
