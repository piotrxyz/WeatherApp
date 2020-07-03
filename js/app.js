window.addEventListener('load', () => {
  let long;
  let lat;
  let weatherDescription = document.querySelector('.weather__description');
  let weatherDegree = document.querySelector('.location__degree');
  let locationName = document.querySelector('.location__name');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2ef5bd8ccaf308e15a25ffe2f7d1c326`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          // converting Kelvin to Celcius
          const temp = Math.round(parseFloat(data.main.temp) - 273.15);

          // const fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);


          const description = data.weather[0].description;

          // Set DOM Elements from the API

          weatherDegree.innerHTML = temp + '&deg;';
          weatherDescription.textContent = description;
          locationName.textContent = data.name;
        });
    });
  }
});
