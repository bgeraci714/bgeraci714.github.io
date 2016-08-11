$(document).ready(function() {

    if (navigator.geolocation) {
        useCoordsForWeather();
    }
    else {
        useIPforWeather();
    }
});

function useCoordsForWeather () {
    navigator.geolocation.getCurrentPosition(function(position) {
        var googleMapsURL = createGoogleMapsURL(position.coords.latitude, position.coords.longitude);
        var latlong = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        };
        localWeatherHandler(latlong, "coords");
    });
}

function useIPforWeather () {
    // uses an geolocation by IP address API to get a rough estimate of location if location services are turned off.
    $.getJSON("https://freegeoip.net/json/", function(locationData) {
        localWeatherHandler(locationData, "zip");
    });
}

function localWeatherHandler (locationData, mode) {
    try {

        var httpsProxy = "https://crossorigin.me/";
        var weatherMapURL = "http://api.wunderground.com/api/17284cf0a020e6d9/conditions/q/QUERY.json";
        weatherMapURL = httpsProxy + weatherMapURL;

        if (mode === "zip") {
            weatherMapURL = weatherMapURL.replace("QUERY",locationData.zip_code);
            console.log(weatherMapURL);
            $.getJSON(weatherMapURL, function(weatherData) {
                applyWunderToHTML(weatherData);
            });
        }
        else if (mode === "coords") {
            var latlongString = locationData.lat + "," + locationData.long;
            weatherMapURL = weatherMapURL.replace("QUERY", latlongString);
            $.getJSON(weatherMapURL, function(weatherData) {
              applyWunderToHTML(weatherData);
            });
        }
        else
            throw new Error ("localWeatherHandler Error");
    } catch (e) {
        console.log(e, mode  + " was given as an improper input");
    }

}

function applyWunderToHTML (wunderData) {
    /*
    console.log(wunderData.current_observation.icon_url);
    console.log(wunderData.current_observation.weather);
    console.log(wunderData.current_observation.temp_f);
    */
    var tempF = wunderData.current_observation.temp_f;
    var curCity = wunderData.current_observation.display_location.city;
    var curState = wunderData.current_observation.display_location.state;
    var curWeather = wunderData.current_observation.weather;

    $("#data").html("The current weather in " + curCity + " is " + curWeather + ".<br>The current temperature is " + tempF + "&deg;F.");
}

function createGoogleMapsURL (lat, long) {
    var googleMapsURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=LAT,LONG&sensor=true";
    var googleLatURL = googleMapsURL.replace("LAT", lat);
    var googleLatLongURL = googleLatURL.replace("LONG", long);

    return googleLatLongURL;
}
