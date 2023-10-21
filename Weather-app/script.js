import API_KEY from "./config.js";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", async () => {
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const json = await response.json();

    if (json.cod === "404") {
      cityHide.textContent = city;
      container.style.height = "440px";
      weatherBox.classList.remove("active");
      weatherDetails.classList.remove("active");
      error404.classList.add("active");
      return;
    }

    const image = document.querySelector(".weather-box img");
    const temperature = document.querySelector(".weather-box .temperature");
    const description = document.querySelector(".weather-box .description");
    const humidity = document.querySelector(".weather-details .humidity span");
    const wind = document.querySelector(".weather-details .wind span");

    if (cityHide.textContent === city) {
      return;
    }

    cityHide.textContent = city;
    container.style.height = "555px";
    container.classList.add("active");
    weatherBox.classList.add("active");
    weatherDetails.classList.add("active");
    error404.classList.remove("active");

    setTimeout(() => {
      container.classList.remove("active");
    }, 2500);

    // Clear the old weather information
    image.src = "";
    temperature.innerHTML = "";
    description.innerHTML = "";
    humidity.innerHTML = "";
    wind.innerHTML = "";

    // Update the weather information with the new values
    switch (json.weather[0].main) {
      case "Clear":
        image.src = "/sunny.jpg";
        break;

      case "Rain":
        image.src = "/rain.jpg";
        break;

      case "Snow":
        image.src = "/snow.jpg";
        break;

      case "Clouds":
        image.src = "/clouds.jpg";
        break;

      case "Mist":
        image.src = "/misty.jpg";
        break;

      case "Haze":
        image.src = "/haze.jpg";
        break;

      default:
        image.src = "/clouds.jpg";
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

    const infoWeather = document.querySelector(".info-weather");
    const infoHumidity = document.querySelector(".info-humidity");
    const infoWind = document.querySelector(".info-wind");

    const elCloneInfoWeather = infoWeather.cloneNode(true);
    const elCloneInfoHumidity = infoHumidity.cloneNode(true);
    const elCloneInfoWind = infoWind.cloneNode(true);

    elCloneInfoWeather.id = "clone-info-weather";
    elCloneInfoWeather.classList.add("active-clone");

    elCloneInfoHumidity.id = "clone-info-humidity";
    elCloneInfoHumidity.classList.add("active-clone");

    elCloneInfoWind.id = "clone-info-wind";
    elCloneInfoWind.classList.add("active-clone");

    setTimeout(() => {
      infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
      infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
      infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
    }, 2200);

    const cloneInfoWeather = document.querySelectorAll(
      ".info-weather.active-clone"
    );
    const totalCloneInfoWeather = cloneInfoWeather.length;
    const cloneInfoWeatherFirst = cloneInfoWeather[0];

    const cloneInfoHumidity = document.querySelectorAll(
      ".info-humidity.active-clone"
    );
    const cloneInfoHumidityFirst = cloneInfoHumidity[0];

    const cloneInfoWind = document.querySelectorAll(".info-wind.active-clone");
    const cloneInfoWindFirst = cloneInfoWind[0];

    if (totalCloneInfoWeather > 0) {
      cloneInfoWeatherFirst.classList.remove("active-clone");
      cloneInfoHumidityFirst.classList.remove("active-clone");
      cloneInfoWindFirst.classList.remove("active-clone");

      setTimeout(() => {
        cloneInfoWeatherFirst.remove();
        cloneInfoHumidityFirst.remove();
        cloneInfoWindFirst.remove();
      }, 2200);
    }
  } catch (error) {
    console.error(error);
  }
});
