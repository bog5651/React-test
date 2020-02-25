import React from "react";
import {getWeather} from "../Utils";

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

    function updateWeather(sityName: string) {
        getWeather(sityName, (result, error) => {
            if (error) {
                console.log("error request/" + error);
                setWeather(undefined);
            } else {
                const newWeather: WeatherItem = {
                    sityName: result.name,
                    temp: (fromKelvin(result.main.temp))
                };
                setWeather(newWeather);
            }
        });
    }

    return (
        <div>
            <form>
                <input onChange={(event) => {
                    updateWeather(event.target.value);
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

