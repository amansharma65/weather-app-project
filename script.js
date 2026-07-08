async function getWeather() {

    const city = document.getElementById("city").value;

    if(city==""){
        alert("Enter city");
        return;
    }

    try{

        // Get latitude & longitude
        const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geo.json();

        if(!geoData.results){
            document.getElementById("result").innerHTML="City Not Found";
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;
        const country = geoData.results[0].country;

        // Get weather
        const weather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const data = await weather.json();

        document.getElementById("result").innerHTML = `
<h2>📍 ${cityName}, ${country}</h2>

<p>🌡 <strong>Temperature:</strong> ${data.current.temperature_2m} °C</p>

<p>💧 <strong>Humidity:</strong> ${data.current.relative_humidity_2m}%</p>

<p>🌬 <strong>Wind Speed:</strong> ${data.current.wind_speed_10m} km/h</p>
`;
    }catch(e){
        document.getElementById("result").innerHTML="Something went wrong.";
    }

}