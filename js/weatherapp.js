$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
        });
    }
    $.getJSON("https://freegeoip.net/json/", function(data) {
        $("#data").html("latitudeAPI: " + data.latitude + "<br>longitudeAPI: " + data.longitude);
    });
});
