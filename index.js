// API key to access OpenWeatherMap data
const apiKey = '9ae57ac3163527589b047feb4349e68a';

// Main function that fetches weather data for the city entered by the user
function getWeather() {
    // Get the value (city name) entered by the user in the input field with id="cityValue"
    const location = document.getElementById('cityValue').value;

    // If no location is entered, show an alert and exit the function
    if(!location){
        alert('Please enter a city name');
        return;
    }

    // Construct the API URL using the city name, API key, and metric units (Celsius)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // Print the API URL to the console (useful for debugging)
    console.log('Fetching URL:', url);

    // Use fetch() to send a request to the API
    fetch(url)
        .then(response => {
            // Print the response status (e.g. 200, 404) to the console
            console.log('Response status:', response.status);

            // If the response is not successful (status not OK), handle the errors
            if(!response.ok){
                if(response.status === 401) throw new Error('Invalid API Key'); // Unauthorized
                if(response.status === 404) throw new Error('Location given not found'); // Not found
                throw new Error('Something went wrong. Weather Data unavailable'); // Other errors
            }

            // If response is OK, convert it to JSON format
            return response.json();
        })
        .then(data => {
            // Log the received weather data
            console.log('Weather data:', data);

            // Call the function to display weather data on the page
            displayWeather(data);
        })
        .catch(error => {
            // If any error occurs (e.g., API failed), log it and show an alert
            console.log('Error:', error);
            alert(error.message);

            // Clear any previous weather data from the screen
            clearWeather();
        });
}

// Function to display the fetched weather data in the HTML elements
function displayWeather(data){
    // Get references to the DOM elements where data will be displayed
    const locationName = document.getElementById('locationname');
    const temperature = document.getElementById('temperature'); 
    const weatherDescription = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind');

    // Set the text content of each element with the respective data from the API response
    locationName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Optional (commented out): Make a weather container visible if needed
    /*
    if(weatherContainer){
        weatherContainer.style.visibility = 'visible';
    }else{
        console.log('Weather container not found in the DOM');
        return;
    }
    */
}

// Function to clear the weather data from the UI when there's an error or no data
function clearWeather(){
    // Clear the text content of all elements
    document.getElementById('locationname').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('description').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind').textContent = '';

    // Optional (commented out): Hide the weather container if needed
    /*
    if(weatherContainer){
        weatherContainer.style.visibility = 'hidden';
    }else{
        console.log('Weather container not found in the DOM');
    }
    */
}

// Add an event listener to the input field that listens for "Enter" key press
// When user presses Enter, it will trigger the getWeather() function
document.getElementById('cityValue').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        getWeather();
    }
});
