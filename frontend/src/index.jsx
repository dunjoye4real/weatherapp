import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;


const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);

    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getLocationFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/location`);

    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};


class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      city: "",
      temp: "",
      pressure: "",
      humidity: "",

      futureIcon: "",
      futureTemp: "",
      futurePressure: "",
      futureHumidity: "",


    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();

    this.setState({icon: weather.weather[0].icon.slice(0, -1)});
    this.setState({city: "city : "+weather.name});
    this.setState({temp: "temperature: "+weather.main.temp});
    this.setState({pressure: "pressure: "+weather.main.pressure});
    this.setState({humidity: "humidity: "+weather.main.humidity});


    const forecast = await getForecastFromApi();
    this.setState({futureIcon: forecast.weather[0].icon.slice(0, -1)});
    this.setState({futureTemp: "temperature : "+forecast.main.temp});
    this.setState({futureHumidity: "humidity: "+forecast.main.humidity});
    this.setState({futurePressure: "pressure: "+forecast.main.pressure});


  }

  render() {
    const { icon } = this.state;
    const { city } = this.state;
    const { temp } = this.state;
    const { pressure } = this.state;
    const { humidity } = this.state;

    const { futureIcon } = this.state;
    const { futureTemp } = this.state;
    const { futurePressure } = this.state;
    const { futureHumidity } = this.state;



    return (
        <div>

        <div className="icon">
          { icon && <img src={`/img/${icon}.svg`} /> }
        </div>


          <div className="temp">
            { city }
          </div>


          <div className="temp">
            { temp }
          </div>


          <div className="temp">
             { pressure }
          </div>


          <div className="temp">
             { humidity }
          </div>


          <div >
            forecast: next 5 hours
          </div>


          <div className="icon">
            { futureIcon && <img src={`/img/${futureIcon}.svg`} /> }
          </div>


          <div className="temp">
            { futureTemp }
          </div>

          <div className="temp">
            { futurePressure }
          </div>

          <div className="temp">
            { futureHumidity }
          </div>

        </div>

    );

  }

}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
