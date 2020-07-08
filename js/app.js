const api_key = '2ef5bd8ccaf308e15a25ffe2f7d1c326';

window.addEventListener('load', () => {

  let locationDescription = document.querySelector('.location__description');
  let locationDegree = document.querySelector('.location__degree');
  let locationName = document.querySelector('.location__name');
  const setIcon = document.querySelector('.location__icon');

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

          // converting Kelvin to Celcius
          const temp = Math.round(parseFloat(data.main.temp) - 273.15);
          const description = data.weather[0].description;
          const { weather, name } = data;
          const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

          // Set DOM Elements from the API
          locationDegree.innerHTML = temp + '&deg;C';
          locationDescription.textContent = description;
          locationName.textContent = name;
          setIcon.src = icon;
        });
    });
  }
});
