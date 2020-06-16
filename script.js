

// my key: 4973b465133a426fc92080785c763347
var apiKey = "4973b465133a426fc92080785c763347";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Philadelphia&appid="+apiKey;
var longitude = 0;
var latitude = 0;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(weatherData){
    //What we need:
    //Grab longitude and longitude from city
    console.log(weatherData);
    longitude = weatherData.city.coord.lon;
    lattitude = weatherData.city.coord.lat;

            //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}
    queryURL="https://api.openweathermap.org/data/2.5/onecall?lat="+lattitude+"&lon="+longitude+"&appid="+apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(newWeatherData){
        console.log(lattitude+" "+longitude);
        console.log(newWeatherData);
        var temp = ((newWeatherData.daily[0].temp.day) - 273.15) * 9/5 + 32;
        var humid = newWeatherData.daily[0].humidity;
        var windSpd = newWeatherData.daily[0].wind_speed;
        var uvIndex = newWeatherData.daily[0].uvi;
        console.log(temp+"|"+humid+"|"+windSpd+"|"+uvIndex);
    });
});