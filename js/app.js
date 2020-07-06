const api_key = '2ef5bd8ccaf308e15a25ffe2f7d1c326';

window.addEventListener('load', () => {

  let locationDescription = document.querySelector('.location__description');
  let locationDegree = document.querySelector('.location__degree');
  let locationName = document.querySelector('.location__name');

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

          // const fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);


          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
          console.log(data.weather[0].icon);

          // Set DOM Elements from the API

          locationDegree.innerHTML = temp + '&deg;C';
          locationDescription.textContent = description;
          locationName.textContent = data.name;

          // Set icon
          setIcons(icon, document.querySelector('.location__icon'));

        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    // const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    const currentIcon = icon;
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
