
//const req = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${MY_WEATHER_APIKEY}`;

function setWeatherIcon(humidity) {
    const icon = document.getElementById('weather-icon');
    if (humidity < 50) {
        icon.src = 'images/rainy.png'; // 低湿度のアイコン
    } else {
        icon.src = 'images/cloudy.png'; // 高湿度のアイコン
    }
}

document.getElementById('coordinates-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const latInput = document.getElementById('lat-input');
    const lonInput = document.getElementById('lon-input');
    const lat = parseFloat(latInput.value);
    const lon = parseFloat(lonInput.value);

    const MY_WEATHER_APIKEY = ""; // ここにAPIキーを設定

    const req = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${MY_WEATHER_APIKEY}`;

    fetch(req)
        .then((response) => response.json())
        .then((data) => {
            console.log('API Response:', data);
            const weatherDescription = data.weather[0].description;
            const temperature = (data.main.temp - 273.15).toFixed(2); // ケルビンを摂氏に変換
            const humidity = data.main.humidity;
            const country = data.name;
            const weatherIcon = data.weather[0].icon; // アイコンコードを取得

            // 受け取った値に応じて要素を更新
            document.getElementById('weather-description').textContent = `Weather: ${weatherDescription}`;
            document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
            document.getElementById('country').textContent = `Country: ${country}`;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

           // setWeatherIcon(humidity);
        })
        .catch((error) => {
            console.error(error);
        });
});