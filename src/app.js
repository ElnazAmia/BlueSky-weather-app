function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function showTemp(response) {
  console.log(response.data);
  celisiusTemp = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = celisiusTemp;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "f0ff64afa8957098b6eda5ad96796c19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
document.querySelector("#search-form").addEventListener("submit", handleSubmit);

function displyToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    (celisiusTemp * 9) / 5 + 32
  );

  celisuisLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displyToCelisius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = celisiusTemp;
  celisuisLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

celisiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displyToFahrenheit);

let celisuisLink = document.querySelector("#celisius-link");
celisuisLink.addEventListener("click", displyToCelisius);

search("New York");
