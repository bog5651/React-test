import React from "react";

interface WeatherItem {
    temp: number;
    sityName: string;
}


const Weather = () => {
    /*
    *
    private static final String mUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    private static final String key = "&appid=f86628d4407790e972163f4c9a8d3513";
    *
    */

    const [weather, setWeather] = React.useState<WeatherItem | undefined>(undefined);

    function getWeather(sityName: string) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=".concat(sityName).concat("&appid=f86628d4407790e972163f4c9a8d3513"))
            .then((value => value.json()))
            .then((weather: any) => {
                const newWeather: WeatherItem = {
                    sityName: weather.name,
                    temp: (fromKelvin(weather.main.temp))
                };
                setWeather(newWeather);
            })
            .catch(reason => {
                console.log("error request/" + reason);
                setWeather(undefined);
            })
    }

    return (
        <div>
            <form>
                <input onChange={(event) => {
                    getWeather(event.target.value);
                }}/>
            </form>
            <div>
                {weather ? (
                    <p>
                        В
                        городе {weather?.sityName} сейчас {weather?.temp.toLocaleString(
                        "ru-ru",
                        {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2
                        }
                    )}
                    </p>
                ) : (
                    <p>
                        Такой город не найден
                    </p>
                )}

            </div>
        </div>
    )
};

function fromKelvin(value: number): number {
    return value - 273.15;
}

function fromFaringeit(value: number): number {
    return (value - 32) * (5 / 9)
}

export default Weather;

