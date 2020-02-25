export function getUser(callback: (result: any, error: any) => void) {
    fetch("https://randomuser.me/api/")
        .then(value => value.json())
        .then(value => {
            callback(value, undefined);
            console.log("user loaded");
        })
        .catch(reason => callback(undefined, reason));
}

export function getWeather(sityName: string, callback: (result: any, error: any) => void) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=".concat(sityName).concat("&appid=f86628d4407790e972163f4c9a8d3513"))
        .then((value => value.json()))
        .then((weather: any) => {
            callback(weather, undefined);
            console.log("weather loaded");
        })
        .catch(reason => callback(undefined, reason));
}
