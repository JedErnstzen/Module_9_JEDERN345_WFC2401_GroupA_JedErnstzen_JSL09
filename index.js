// Function to fetch and display a random landscape image from Unsplash
function displayRandomImage() {
  // Fetch a random landscape image from Unsplash API
  fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
      // Set the background image of the body
      document.body.style.backgroundImage = `url(${data.urls.regular})`;
      // Display the author of the image
      document.getElementById("author").textContent = `By: ${data.user.name}`;
    })
    .catch(error => {
      // Log and handle errors, then set default background image/author
      console.error("Error fetching image:", error);
      document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
      document.getElementById("author").textContent = "By: Dodi Achmad";
    });
}

// Function to fetch and display Dogecoin cryptocurrency data
function displayDogecoinData() {
  // Fetch Dogecoin data from CoinGecko API
  fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(response => {
      // Check for successful response
      if (!response.ok) {
        throw new Error("Failed to fetch Dogecoin data");
      }
      return response.json();
    })
    .then(data => {
      // Extract relevant data and display
      const currentPrice = data.market_data.current_price.eur; // Display in Euros
      const highPrice = data.market_data.high_24h.eur; // Display in Euros
      const lowPrice = data.market_data.low_24h.eur; // Display in Euros
      document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
      `;
      // Clear previous content and display new data
      document.getElementById("crypto").innerHTML = "";
      document.getElementById("crypto").innerHTML = `
        <p>🎯: € ${currentPrice}</p>
        <p>👆: € ${highPrice}</p>
        <p>👇: € ${lowPrice}</p>
      `;
    })
    .catch(error => {
      // Log and handle errors while fetching Dogecoin data
      console.error("Error fetching Dogecoin data:", error.message);
    });
}

// Function to update the current time every second
function getCurrentTime() {
  // Get current time and update the DOM
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;
}
// Call getCurrentTime() every second
setInterval(getCurrentTime, 1000);

// Function to fetch and display the local weather
function displayWeather() {
  // Get user's geolocation and fetch weather data from OpenWeatherMap API
  navigator.geolocation.getCurrentPosition(
    position => {
      fetch(
        `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
      )
        .then(response => {
          // Check for successful response
          if (!response.ok) {
            throw new Error("Weather data not available");
          }
          return response.json();
        })
        .then(data => {
          // Extract relevant weather data and display
          const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}°C</p>
            <p class="weather-city">${data.name}</p>
          `;
        })
        .catch(error => {
          // Log and handle errors while fetching weather data
          console.error("Error fetching weather data:", error);
        });
    },
    error => {
      // Log and handle errors while getting geolocation
      console.error("Error getting location:", error);
    }
  );
}

// Call the functions to initialize the web application
displayRandomImage();
displayDogecoinData();
displayWeather();
