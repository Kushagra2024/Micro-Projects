/* ----------------------------------------- CONSTANTS & VARIABLES ----------------------------------------- */

// Stores the OpenWeatherMap API key
const API_KEY = "4a9eb102a4f6486d0e4b8dbc09cdefa7";

// Declares variables with initial values set to null. These variables will store weather-related information.
let [weather, temp, humidity, wind_speed, place] = [null, null, null, null, null];

// References to HTML elements. These elements are used for user input and triggering a search.
const searchBox = document.querySelector('#searchBox');
const searchBtn = document.querySelector('#searchBtn');

/* ----------------------------------------- FUNCTIONS ----------------------------------------- */

// Fetch weather data from the OpenWeatherMap API using the provided city name
async function getWeatherDetails(city_name) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_KEY}`);

        // Parse the response as JSON
        const data = await response.json();

        // Destructure and assign values from the fetched data to the variables. All values at fetched concurrently
        // The Promise.all is used to await multiple asynchronous operations simultaneously.
        [weather, temp, humidity, wind_speed, place] = await Promise.all([
            data.weather[0].main,
            Math.round(data.main.temp),
            data.main.humidity,
            data.wind.speed,
            data.name
        ])
    } catch (error) {
        // Handle errors, if any, during the fetching process
        console.log(`Error: ${error}`);
    }
}

// Updates UI with fetched data
function setWeatherDetails() {

    // References to HTML elements
    const tempEle = document.querySelector("#temp");
    const placeEle = document.querySelector("#place");
    const humidityEle = document.querySelector("#humidity");
    const windSpeedEle = document.querySelector("#wind_speed");
    const weatherIconEle = document.querySelector('#weather_icon');

    // UI is updated
    tempEle.innerText = `${temp}°c`;
    placeEle.innerText = `${place}`;
    humidityEle.innerText = `${humidity}%`;
    windSpeedEle.innerText = `${wind_speed} km/h`;
    weatherIconEle.src = `./Assets/images/${weather}.png`;
}

// Updates weather details based on the provided city name.
async function updateWeather(city_name) {

    // Await the completion of the getWeatherDetails function for the specified city
    await getWeatherDetails(city_name);
    // Await the completion of the setWeatherDetails function to update the UI
    await setWeatherDetails();
}
// Self-invoking asynchronous function that attempts to get the user's current location
(async function getCurrentLocation() {

    // Default city name is set to 'Delhi'
    let city_name = 'Delhi';

    // Check if the 'geolocation' feature is supported in the browser
    if ('geolocation' in navigator) {
        try {
            // Use the Geolocation API to get the user's current position
            const position = await new Promise((response, reject) => {
                navigator.geolocation.getCurrentPosition(response, reject);
            })

            // Extract latitude and longitude from the obtained position
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Fetch city information based on coordinates from OpenWeatherMap API
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`);
            const data = await response.json();

            // Extract the city name from the API response
            city_name = data[0].name;
        }
        catch (err) {
            // Handle errors during geolocation or API fetch
            console.error(`Error fetching location: ${err.message}`);
        }
    }
    else {
        // Log an error message if geolocation is not supported
        console.error("Geolocation is not supported by your browser");
    }
    // After obtaining the city name, update the weather information
    updateWeather(city_name);
})();

/* ----------------------------------------- EVENT LISTENERS ----------------------------------------- */

// Listens for the "Search" button click to search for weather details.
searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value ? searchBox.value : 'Delhi';
    searchBox.value = '';

    updateWeather(cityName);
})