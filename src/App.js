import React from 'react';
import './App.css';
import Weather from "./components/weather";
import Titles from "./components/titles";
import Form from "./components/form";

const Api_Key = "4b1bbc84bd3dfb402c08b77ff66bf789";

class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    getWeather = async(e) => {

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        e.preventDefault();

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
        const response = await  api_call.json();
        console.log(response);

        if(city && country){
            this.setState({
                temperature: response.main.temp,
                city: response.name,
                country: response.sys.country,
                humidity: response.main.humidity,
                description: response.weather[0].description,
                error: ""
            })
        }else{
            this.setState({
                error: "Please enter the values..."
            })
        }
    }

    render() {
        return (
            <div>
                <Titles/>
                <Form loadWeather={this.getWeather}/>
                <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}/>
            </div>
        )
    }
}

export default App;
