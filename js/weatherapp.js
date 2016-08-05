$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
        });
    }
    $.getJSON("http://ipinfo.io", function(data) {
        console.log(data)
    });
});
