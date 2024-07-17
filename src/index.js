import "./styles.css";

async function loadJson(url) {
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function getWeather(location) {
  try {
    const weather = await loadJson(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=LUQBHAMM4Y53RMRHYSJRRGDJN&contentType=json`
    );
    return weather;
  } catch (err) {
    console.error("Error fetching weather data:", err);
    alert("Error fetching weather data");
  }
}

class weatherObject {
  constructor(address, weatherDescription) {
    this.address = address;
    this.description = weatherDescription;
  }
}

function processWeatherInfo(weather) {
  const currentWeather = new weatherObject(
    weather.resolvedAddress,
    weather.description
  );
  return currentWeather;
}

async function displayWeather() {
  const location = prompt("For what location do you want to know the weather?");
  const weather = await getWeather(location);
  console.log(weather);
  const currentWeather = processWeatherInfo(weather);
  console.log(currentWeather.address);
  console.log(currentWeather.description);
}

displayWeather();
