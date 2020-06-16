

// my key: 4973b465133a426fc92080785c763347
var city = "";
var longitude = 0;
var latitude = 0;
var apiKey = "4973b465133a426fc92080785c763347";
var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
var sampleCityBtns = ["Philadelphia","Boston","Florida","New York","Chicago","Cherry Hill","Denver","Seattle"];
var sampleCityBtns2= ["Austin","Los Angeles","Phoenix","San Diego","El Paso","Dallas","Las Vegas","Miami"];
//When localStorage empty we want to present some city options on our list-group
if(cityArray.length == 0){
    city = "Philadelphia";
    for(var i=0; i < $(".list-group-item").length; i++){
        $("#ls"+(i+1)).html(sampleCityBtns[i]);
    }
}
else {
    city = cityArray[cityArray.length - 1];
    var counter = 0;
    //If it's not empty we want to display cities previously searched, from top to bottom
    for(var i=cityArray.length; i > 0 && counter < 8 ; i--){
        var assignStoredCity = cityArray[i-1].city;
        $("#ls"+(counter+1)).html(assignStoredCity);
        counter++;
    }
    //If some buttons are still empty, pull sample cities from second sample array
    if(counter < 8){
        for(var i= counter; i < 8; i++){
            $("#ls"+(i+1)).html(sampleCityBtns2[i]);
        }
    }
}
//Initialize elements on page with weather info
console.log(city);
getData();
$(".list-group-item").each(function(){
    $(this).on("click",function(){
        city = $(this).html();
        getData();
        cityArray.push({city: city});
        localStorage.setItem("cities", JSON.stringify(cityArray));
    })
});

$("#srchBtn").on("click", function(event){
    event.preventDefault();
    city = $(this).siblings("input").val();
    cityArray.push({city: city});
    localStorage.setItem("cities", JSON.stringify(cityArray));
    getData();
});

function getData(){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function getData(weatherData){
        //What we need:
        //Grab longitude and longitude from city
        longitude = weatherData.city.coord.lon;
        lattitude = weatherData.city.coord.lat;

                //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}
        queryURL="https://api.openweathermap.org/data/2.5/onecall?lat="+lattitude+"&lon="+longitude+"&appid="+apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(newWeatherData){
            console.log(newWeatherData);
            //Daily stats get appended to our card bodies
            for(var i=0; i < 5; i++){
                var day = moment().add(i, 'days').format('l');
                var icon = newWeatherData.daily[i].weather[0].icon;
                var temp = ((newWeatherData.daily[i].temp.day) - 273.15) * 9/5 + 32;
                var humid = newWeatherData.daily[i].humidity;
                var windSpd = newWeatherData.daily[i].wind_speed;
                var uvIndex = newWeatherData.daily[i].uvi;
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
};