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
      const main_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;

      fetch(main_url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          // show data in dev tools
          const { weather, name, main } = data;
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
          // converting Kelvin to Celcius
          locationDegree.innerHTML = Math.round(parseFloat(main.temp) - 273.15) + '<sup>°C</sup>';
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
const msg = document.querySelector(".app__message");
const list = document.querySelector(".search__results");

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  //check if there's already a city
  const listItems = list.querySelectorAll(".city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el.querySelector(".city-name span").textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span")}`;
      form.reset();
      input.focus();
      return;
    }
  }

  const search_url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api_key}&units=metric`;

  fetch(search_url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      const li = document.createElement("li");
      li.classList.add("city");
      const result = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = result;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });
  msg.textContent = "";
  form.reset();
  input.focus();
});