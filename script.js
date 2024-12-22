let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let city = document.getElementById("city");

let getWeather = () => {
    let cityvalue = city.value;

    if (cityvalue.length === 0) {
        result.innerHTML = `<h3 class="msg">Silakan masukkan nama kota</h3>`;
        return;
    }else{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${key}&units=metric`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Kota tidak ditemukan");
                }
                return response.json();
            })
            .then(data => { 
                result.innerHTML = `
                    <h2 class="city">${data.name}</h2>
                    <h4 class="weather">${data.weather[0].main}</h4>
                    <h4 class="desc">${data.weather[0].description}</h4>
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" id="weather-icon" alt="weather icon">
                    <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
                    <h1 class="humidity"><img class ="humidity-icon" src="/moisture_3152.png" alt="humidity icon"> ${data.main.humidity}%</h1>
                    <h1 class="wind"><img class="wind-icon" src="/speed.png" alt="wind icon"> ${data.wind.speed} km/j</h1>
                `;
            })
            .catch(error => {
                result.innerHTML = `<h3 class="msg">${error}</h3>`;
            });
    }
    
};

searchBtn.addEventListener("click", getWeather);
