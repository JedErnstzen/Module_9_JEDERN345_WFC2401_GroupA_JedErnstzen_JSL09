// Fetch and display a random landscape image from Unsplash
function displayRandomImage() {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
      .then(response => response.json())
      .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        document.getElementById("author").textContent = `By: ${data.user.name}`;
      })
      .catch(error => {
        console.error("Error fetching image:", error);
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
        document.getElementById("author").textContent = "By: Dodi Achmad";
      });
  }
  
  // Fetch and display Dogecoin cryptocurrency data
  function displayDogecoinData() {
    fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
      .then(response => {
        if (!response.ok) {
          throw new Error("Something went wrong fetching Dogecoin data");
        }
        return response.json();
      })
      .then(data => {
        const currentPrice = (data.market_data.current_price.usd * 18.5).toFixed(2); // Convert USD to ZAR
        const highPrice = (data.market_data.high_24h.usd * 18.5).toFixed(2); // Convert USD to ZAR
        const lowPrice = (data.market_data.low_24h.usd * 18.5).toFixed(2); // Convert USD to ZAR
  
        document.getElementById("crypto-top").innerHTML = `
          <img src=${data.image.small} />
          <span>${data.name}</span>
        `;
        document.getElementById("crypto").innerHTML += `
          <p>🎯: R${currentPrice}</p>
          <p>👆: R${highPrice}</p>
          <p>👇: R${lowPrice}</p>
        `;
      })
      .catch(error => {
        console.error("Error fetching Dogecoin data:", error);
      });
  }
  
  // Update the current time every second
  function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(getCurrentTime, 1000);
  
  // Fetch and display the local weather
  function displayWeather() {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetch(
          `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
        )
          .then(response => {
            if (!response.ok) {
              throw new Error("Weather data not available");
            }
            return response.json();
          })
          .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
              <img src=${iconUrl} />
              <p class="weather-temp">${Math.round(data.main.temp)}°C</p>
              <p class="weather-city">${data.name}</p>
            `;
          })
          .catch(error => {
            console.error("Error fetching weather data:", error);
          });
      },
      error => {
        console.error("Error getting location:", error);
      }
    );
  }
  
  // Call the functions to initialize the web application
  displayRandomImage();
  displayDogecoinData();
  displayWeather();