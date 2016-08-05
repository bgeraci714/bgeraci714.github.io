$(document).ready(function() {
    var currentZip;

    $.getJSON("https://freegeoip.net/json/", function(locationData) {
        //console.log(locationData);
        localWeatherData(locationData);

    });
});

function localWeatherData (locationData) {
    // API key is 176611c00d609a0919ef1cd4b31da46b
    var weatherMapURL = "https://api.openweathermap.org/data/2.5/weather?APPID=176611c00d609a0919ef1cd4b31da46b&zip="
    $.getJSON(weatherMapURL + locationData.zip_code, function(weatherData) {
        var temp = weatherData.main.temp;

        tempF = kToF(temp);

        $("#data").html("The current weather in " + locationData.city + " is " + weatherData.weather[0].main + ".<br>The current temperature is " + tempF + "&deg;F.");
    });
}

function kToF (kelvinTemp) {
    return Math.round(kelvinTemp * 9 / 5 - 459.67);
}
