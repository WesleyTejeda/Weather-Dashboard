


var apiKey = "4973b465133a426fc92080785c763347";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Philadelphia&appid="+apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    //What we need:
    //Temp, Humidity, Wind Speed, UV index, Temp ICON
});