import React from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY= "79a1afb8b7f7a545a464c897a77f1eaa";

class App extends React.Component {
  state = {
    temperature: undefined, 
    city:undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault(); // IMPORTANT
    console.log(e);
    const city= e.target.elements.city.value
    const country= e.target.elements.country.value
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)

    .then(response => response.json())
    .then(data => {
      if(city && country){
          this.setState({
           temperature: data.main.temp,
           city: data.name,
           country: data.sys.country,
           humidity: data.main.humidity,
           description: data.weather[0].description,
           error: ""
       })
     }
     else{
         this.setState({
           temperature: undefined, 
           city:undefined,
           country: undefined,
           humidity: undefined,
           description: undefined,
           error: "Please enter new values"
           })
     }
    })
   .catch( error => {
      this.setState({
           temperature: undefined, 
           city:undefined,
           country: undefined,
           humidity: undefined,
           description: undefined,
           error: ""
           })
   });
  }
  render(){
    return(
       <div>
        <div className="wrapper">
         <div className="main">
          <div className="container">
           <div className="row">
             <div className="col-xs-5 title-container">
              <Title/>
             </div>
             <div className="col-xs-7 form-container">
               <Form getWeather={this.getWeather}/>
               <Weather 
               temperature={this.state.temperature} 
               city={this.state.city}
               country={this.state.country}
               humidity={this.state.humidity}
               description={this.state.description}
               error={this.state.error}/>
             </div>
           </div>
          </div>
         </div>
        </div>
       </div>
    )
  }
}          


export default App