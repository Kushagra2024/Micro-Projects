# Weather Application

This Weather App provides real-time weather information based on the user's location or a specific city. It utilizes the OpenWeatherMap API to fetch weather details, including temperature, humidity, wind speed, and the current weather condition.

### Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
  - [Code Structure](#code-structure)
  - [JavaScript Functions](#javascript-functions)
  - [HTML and CSS](#html-and-css)
  - [UI Elements](#ui-elements)
  - [Event Listeners](#event-listeners)
- [Dependencies](#dependencies)
- [Contribute](#contribute)

---

### Features

The To-Do list application provides the following features:
- **Real-time Weather Data:** Get the latest weather information for a specific city.
  
- **Search Functionality:** Users can input the city name and get weather details for that location.
  
- **Location-Based Weather:** Fetches weather details based on the user's current location using geolocation.

### Usage

- **Automatic Location:**
  - Upon loading, the app attempts to fetch the user's current location and displays weather details for the corresponding city.

- **Default Location:**
  - If geolocation is not supported or encounters an error, the app displays weather details for Delhi by default.
  
- **Search for Other Cities:**
  -  Use the search box to input the desired city name and click the search button to get weather details for that location.

### Code Explanation

- #### **Code Structure**:
  The project consists of the following main files:

  - `index.html`: Main HTML file containing the structure of the Weather application.
  - `styles.css`: Stylesheet for styling the application. (Uses Tailwind CSS classes)
  - `script.js`: JavaScript file containing the logic for displaying weather condition functionality.
  - `Assets/`: Folder containing images used in the application.

- #### **JavaScript Functions**:

  - **`getWeatherDetails(city_name)`**: This asynchronous function fetches weather information from the OpenWeatherMap API.
  
    **Parameter**: `city_name` - The name of the city for which weather details are to be fetched.

    ---

  - **`setWeatherDetails()`**: Updates the UI with the fetched weather details.

    ---

  - **`updateWeather(city_name)`**: Updates weather details based on the provided city name.
  
    **parameter**: `city_name` - The name of the city for which weather details are to be fetched.

    ---

  - **`getCurrentLocation()`**: A self-invoking asynchronous function that attempts to get the user's current location using geolocation. If geolocation is not supported or encounters an error, it defaults to 'Delhi'.
    
      **Code Break Down**

      The `new Promise` constructor is used to wrap the asynchronous operation of `navigator.geolocation.getCurrentPosition` into a Promise. The `resolve` and `reject` functions provided to the Promise constructor are called based on the success or failure of the asynchronous operation.

      In the context of the `getCurrentPosition` method:
      - If the geolocation is successfully retrieved, the resolve function is called with the position data.
      - If there's an error or the retrieval fails, the reject function is called with an error.

      ```js
      await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      ```

      The `await` keyword ensures that the surrounding async function doesn't proceed until the Promise is settled (resolved or rejected), making it possible to use asynchronous code in a more synchronous-looking manner.

      **Usage of `navigator.geolocation.getCurrentPosition`**

      ```js
      navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);
      ```

      - **successCallback (required)**: A callback function that is called when the device's location is successfully retrieved. This function is passed a Position object, which contains information such as latitude, longitude, altitude, accuracy, and timestamp.

      - **errorCallback (required)**: A callback function that is called when there is an error in retrieving the location. This function is passed a PositionError object, which contains information about the error, such as code and message.

      - **options (optional)**: An optional parameter that allows you to provide additional configuration options for the geolocation request.
    
    ---

- #### **HTML and CSS**:

  The HTML file (`index.html`) contains the structure of the Weather application. The styling is handled by the `styles.css` file, which uses Tailwind CSS classes for styling.

- #### UI Elements:
  
  - **Temperature**: Displayed in Celsius.
  - **City Name**: The name of the city for which weather details are displayed.
  - **Humidity**: Percentage of humidity.
  - **Wind Speed**: Displayed in kilometers per hour.
  - **Weather Icon**: Displays the current weather condition.

- #### **Event Listeners**

  - `addEventListener("click", ...)`: Listens for the "Search" button click to search for weather details.


### Dependencies

- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quickly building custom designs.
- [OpenWeatherMap API](https://openweathermap.org/api): Used to fetch real-time weather data.
- No other external dependencies are required.

### Contribute

Feel free to contribute to the development of this ToDo list application. Submit issues or pull requests to help improve the functionality or fix bugs.

---

**Note**: Make sure to replace the ***API_KEY*** with your own OpenWeatherMap API key for the application to work correctly.