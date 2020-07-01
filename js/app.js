window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2ef5bd8ccaf308e15a25ffe2f7d1c326`;
            
            fetch(api)
              .then(response => {
                return response.json();
              })
                .then(data => {
                  console.log(data);
                  // const { temp, summary } = data.currently;
                  // Set DOM Elements from the API
                  // tempDegree.textContent = temp;
                  // tempDescription.textContent = summary;
                });
        });
    }
});
