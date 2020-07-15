// checking for weather using geolocation

const api_key = "2ef5bd8ccaf308e15a25ffe2f7d1c326";

window.addEventListener("load", () => {

  let locationDescription = document.querySelector(".location__description");
  let locationDegree = document.querySelector(".location__degree");
  let locationName = document.querySelector(".location__name");
  const setIcon = document.querySelector(".location__icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;

      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          // show data in dev tools
          const { weather, name, main } = data;

          // which icons?
          // const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

          // Set DOM Elements from the API
          locationDegree.innerHTML = Math.round(parseFloat(main.temp) - 273.15) + '&deg;C'; // converting Kelvin to Celcius
          locationDescription.textContent = weather[0].description;
          locationName.textContent = name;
          setIcon.src = icon;
        });
    });
  }
});

// checking for weather by input value (user search)

const form = document.querySelector(".app__form");
const input = document.querySelector(".app__input");
const list = document.querySelector(".search__results");
 
form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  const url_search = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api_key}&units=metric`;

  fetch(url_search)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      const li = document.createElement("li");
      li.classList.add("city");
      const result = `
        <h2 data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div>${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img src="${icon}" alt="${weather[0]["description"]}">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = result;
      list.appendChild(li);
      form.reset();
      input.focus();
    })
});