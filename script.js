

// my key: 4973b465133a426fc92080785c763347
var apiKey = "4973b465133a426fc92080785c763347";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Philadelphia&appid="+apiKey;
var longitude = 0;
var latitude = 0;
var city = "Philadelphia";
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
        //Daily stats get appended to our card bodies
        for(var i=0; i < 5; i++){
            var day = moment().add(i, 'days').format('l');
            var icon = newWeatherData.daily[i].weather[0].icon;
            var temp = ((newWeatherData.daily[i].temp.day) - 273.15) * 9/5 + 32;
            var humid = newWeatherData.daily[i].humidity;
            var windSpd = newWeatherData.daily[i].wind_speed;
            var uvIndex = newWeatherData.daily[i].uvi;
            console.log(day+"|"+temp+"|"+humid+"|"+windSpd+"|"+uvIndex);
            $("#day"+(i+1)+"Date").html(day);
            $("#day"+(i+1)+"Icon").attr("src", "assets/"+icon+".png")
            $("#day"+(i+1)+"Temp").html("Temp: "+temp.toFixed(2));
            $("#day"+(i+1)+"Humid").html("Humidity: "+humid);
        }
        //Current stats
        day = moment().format('l');
        temp = ((newWeatherData.current.temp) - 273.15) * 9/5 + 32;;
        humid = newWeatherData.current.humidity;
        windSpd = newWeatherData.current.wind_speed;
        uvIndex = newWeatherData.current.uvi;
        icon = newWeatherData.current.weather[0].icon;
        console.log(icon);

        //Displaying them to html elements
        $("#currCity").html(city+" "+day);
        $("#currIcon").attr("src", "assets/"+icon+".png");
        $("#currTemp").html("Temperature: "+temp.toFixed(1)+"&deg; F");
        $("#currHumid").html("Humidity: "+humid);
        $("#currWindSpd").html("Wind Speed: "+windSpd);
        $("#currUVI").html(uvIndex);
        //Adding class to UV card
        if(uvIndex <= 2)
            $("#currUVI").addClass("bg-success");
        else if( 3 <= uvIndex && uvIndex <=5)
            $("#currUVI").addClass("bg-warning");
        else if( 6 <= uvIndex && uvIndex <= 7)
            $("#currUVI").attr("style","background: rgb(236, 89, 4);");
        else
            $("#currUVI").addClass("bg-danger");

    });
});