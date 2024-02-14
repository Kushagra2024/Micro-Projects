const API_KEY = "4a9eb102a4f6486d0e4b8dbc09cdefa7";

let [weather, temp, humidity, wind_speed, place] = [null, null, null, null, null];

const searchBox = document.querySelector('#searchBox');
const searchBtn = document.querySelector('#searchBtn');

// fetches weather info from weather api
async function getWeatherDetails(city_name) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        [weather, temp, humidity, wind_speed, place] = await Promise.all([
            data.weather[0].main,
            Math.round(data.main.temp),
            data.main.humidity,
            data.wind.speed,
            data.name
        ])
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
}

// updates UI with fetched data
function setWeatherDetails(){
    const tempEle = document.querySelector("#temp");
    const placeEle = document.querySelector("#place");
    const humidityEle = document.querySelector("#humidity");
    const windSpeedEle = document.querySelector("#wind_speed");
    const weatherIconEle = document.querySelector('#weather_icon');

    tempEle.innerText = `${temp}°c`;
    placeEle.innerText = `${place}`;
    humidityEle.innerText = `${humidity}%`;
    windSpeedEle.innerText = `${wind_speed} km/h`;
    weatherIconEle.src = `../Assets/weather-app-img/images/${weather}.png`;
}

(async function updateWeather(city_name = 'Delhi') {
    await getWeatherDetails(city_name);
    await setWeatherDetails();
})();

searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value ? searchBox.value : 'Delhi';

    updateWeather(cityName);
})