//To Do:
//tried to delete oldes query from array when more than 7 queries with shift()-->didnt work
//UV is red in example but I cant find info in API that marks a certain UV value

$(document).ready(function() {
    //===============================================================
    //Setup variables
    //===============================================================
    //dates
    var currentDateEl = moment().format("MM/DD/YY"); 
    var tomorrow  = moment().add(1, "days").format("MM/DD/YY");
    var plus2days = moment().add(2, "days").format("MM/DD/YY");
    var plus3days = moment().add(3, "days").format("MM/DD/YY");
    var plus4days = moment().add(4, "days").format("MM/DD/YY");
    var plus5days = moment().add(5, "days").format("MM/DD/YY");

    //variables for URLS
    var APIKey = "fc5087353660b1e52ab9e8b5bc5a76a6";
    var queryBaseURL= "https://api.openweathermap.org/data/2.5/";
    var forecastQueryBaseURL= queryBaseURL + "forecast";
    var UVQueryBaseURL= queryBaseURL +"uvi?appid="+APIKey;

    //var for entered city to search for
    var latitude;
    var longitude;

    // city search array for local storage
    var searchedCitiesArr = []; 
    var cityQuery;
   
    var defaultCity="Raleigh";
    var defaultURL = queryBaseURL + "weather" + "?q="+defaultCity+ "&APPID=" + APIKey;
            
    //===============================================================
    //Functions
    //===============================================================   
    function init(){
        defaultQuery(defaultURL);
        callStorage();
        currentLocationQuery();  

    }

    //function to get current location
    function currentLocationQuery(){
        console.log("currentLoc function runs");
        if (!navigator.geolocation) {
            $("#cityName").show();
            $("#cityName").append($("<p>").html("Your browser doesn't support geolocation!"));
        }
        else {
            navigator.geolocation.getCurrentPosition(success,error);
        }

        function success(position){
            $("#cityName").show();
            latitude  = position.coords.latitude;
            longitude = position.coords.longitude;
            locationAnswer(latitude,longitude);
        }
        //only if there is an error
        function error() {
            $("#cityName").show();
            $("#cityName").append($("<p>").html("Location can't be retrieved. Raleigh will be picked as your default location."));
            defaultQuery(defaultURL);
        }
    }


    //function to output current location 
    function locationAnswer(latitude,longitude){
            console.log("locationAnswer fct runs")
           var locationQueryURL = queryBaseURL + "weather"+ "?lat=" + latitude + "&lon=" +longitude + "&APPID=" + APIKey;
            console.log(locationQueryURL);
           $.ajax({
            url: locationQueryURL,
            method: "GET"
            })
        .then(function(response){
            console.log(response.name);
            console.log(response.sys.country);

            var icon = ("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
            //header with Cityname, date and icon
            $("#cityName").html("<h2>" + response.name +" ("+ currentDateEl +") "+ icon+"</h2>");
            $(".wind").text("Wind Speed: " + response.wind.speed + "MPH");
            $(".humidity").text("Humidity: " + response.main.humidity+"%");
                
            // Converts the temp from Kelvin to Fahrenheit with the below formula
            var fahrenheit = (response.main.temp -273.15) *1.8 +32;
            $(".temp").text("Temperature: "+ Number(fahrenheit).toFixed(1) +"°F");
           
            //5day forecast for default city
            var newForecastURL = forecastQueryBaseURL +"?q=" + response.name  + "&APPID=" + APIKey;
            console.log(newForecastURL);
            forecastQuery(newForecastURL);
            
            forecastDays();
            uvIndexQuery(latitude, longitude);
        }); 
    }

    //forecast Query that populates the dates
    function forecastDays (){
        console.log("forecastDays fct runs");

        $("#date1").text(tomorrow);
        $("#date2").text(plus2days);
        $("#date3").text(plus3days);
        $("#date4").text(plus4days);
        $("#date5").text(plus5days);
    }
    
    //query that runs after city is enetered in search
    function runQuery(queryURL){
        console.log("runQuery function runs");

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {             
            
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);
        latitude  = response.coord.lat;
        longitude = response.coord.lon;
            
        // Transfer content to HTML

        // icon variable
        var icon = ("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        //header with Cityname, date and icon
        $("#cityName").html("<h2>" + response.name +" ("+ currentDateEl +") "+ icon+"</h2>");
                   
        console.log(icon);
        $(".wind").text("Wind Speed: " + response.wind.speed + "MPH");
        $(".humidity").text("Humidity: " + response.main.humidity+"%");
            
        // Converts the temp from Kelvin to Fahrenheit with the below formula
        var fahrenheit = (response.main.temp -273.15) *1.8 +32;
        $(".temp").text("Temperature: "+ Number(fahrenheit).toFixed(1) +"°F");
                  
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
        
        forecastDays();
        forecastQuery();
        uvIndexQuery(latitude, longitude);
            
        });
                   
    };

    //query to get 5 day forecast
    function forecastQuery(queryURL){
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {             
            // Log the queryURL
            console.log(queryURL);
            // Log the resulting object
            console.log(response);
            
            //today+1
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.list[6].weather[0].icon + ".png'>");
            var fahrenheit = (response.list[6].main.temp -273.15) *1.8 +32;
            //header with Cityname, date and icon
            $(".icon1").html(icon);
            $(".temp1").text("Temp.: "+ Number(fahrenheit).toFixed(1) +" °F");
            $(".humid1").text("Humid.: "+ response.list[6].main.humidity +" %");
            
            //today+2
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.list[14].weather[0].icon + ".png'>");
            var fahrenheit = (response.list[14].main.temp -273.15) *1.8 +32;
            //header with Cityname, date and icon
            $(".icon2").html(icon);
            $(".temp2").text("Temp.: "+ Number(fahrenheit).toFixed(1) +" °F");
            $(".humid2").text("Humid.: "+ response.list[14].main.humidity +" %");
            
            //today+3
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.list[22].weather[0].icon + ".png'>");
            var fahrenheit = (response.list[22].main.temp -273.15) *1.8 +32;
            //header with Cityname, date and icon
            $(".icon3").html(icon);
            $(".temp3").text("Temp.: "+ Number(fahrenheit).toFixed(1) +" °F");
            $(".humid3").text("Humid.: "+ response.list[22].main.humidity +" %");

            //today+4
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.list[30].weather[0].icon + ".png'>");
            var fahrenheit = (response.list[30].main.temp -273.15) *1.8 +32;
            //header with Cityname, date and icon
            $(".icon4").html(icon);
            $(".temp4").text("Temp.: "+ Number(fahrenheit).toFixed(1) +" °F");
            $(".humid4").text("Humid.: "+ response.list[30].main.humidity +" %");

            //today+5
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.list[38].weather[0].icon + ".png'>");
            var fahrenheit = (response.list[38].main.temp -273.15) *1.8 +32;
            //header with Cityname, date and icon
            $(".icon5").html(icon);
            $(".temp5").text("Temp.: "+ Number(fahrenheit).toFixed(1) +" °F");
            $(".humid5").text("Humid.: "+ response.list[38].main.humidity +" %");
            
        });
    }

    //UV Index function
    function uvIndexQuery(latitude, longitude){
        var UVQueryURL =UVQueryBaseURL +"&lat="+latitude +"&lon="+longitude;
        console.log(UVQueryURL);

        $.ajax({
            url: UVQueryURL,
            method: "GET"
            })
        .then(function(response){
            
            $(".UV").text("UV Index: " +response.value);
          
        }); 
    }

    //start page with Raleigh as default city in case geolocation doesnt work  
    function defaultQuery(queryURL){
        
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {             
           
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
            //header with Cityname, date and icon
            $("#cityName").html("<h2>" + response.name +" ("+ currentDateEl +") "+ icon+"</h2>");
            $(".wind").text("Wind Speed: " + response.wind.speed + "MPH");
            $(".humidity").text("Humidity: " + response.main.humidity+"%");
                
            // Converts the temp from Kelvin to Fahrenheit with the below formula
            var fahrenheit = (response.main.temp -273.15) *1.8 +32;
            $(".temp").text("Temperature: "+ Number(fahrenheit).toFixed(1) +"°F");
           
            //5day forecast for default city
            var newForecastURL = forecastQueryBaseURL +"?q=" +defaultCity  + "&APPID=" + APIKey;
            console.log(newForecastURL);
            forecastQuery(newForecastURL);
            
            forecastDays();
                
            });
                       
    };

    function callStorage(){
        //city list from local storage 
        console.log("local stor fct runs");
        

        if(localStorage["searchedCitiesArr"]){
            searchedCitiesArr = JSON.parse(localStorage["searchedCitiesArr"]);
            //if local storage not empty get cities from the searchedCitiesArr array
            // if(searchedCitiesArr.length!="null"){
                console.log(searchedCitiesArr.length);
                searchedCitiesArr.forEach(element =>{
                    var cityLi=$("<li class='list-group-item'></li>");
                    cityLi.attr("data-city", element);
                    cityLi.text(element);
                    $("#cityList").append(cityLi);
                });
            } else{
                    console.log("no search history yet");
            }
        
        
    }

    function addToLocal (){
        var city =$("#citySearch").val().trim().toLowerCase();

        //if nothing was enetered before clicking button, dont add
        if(city===""){
            return;
        } 

        city =city.split(" ");
        searchCity ="";

        //Capitalize the first letters of each city
        city.forEach(element => {
            searchCity += " "+ element.charAt(0).toUpperCase() + element.slice(1);
        });

          //avoids to add an already existing city to the list andlocalstorage
          if (searchedCitiesArr.includes(searchCity)){
            $("#citySearch").val("");
            return;
        }

        searchedCitiesArr.push(searchCity);
        localStorage.setItem("searchedCitiesArr",JSON.stringify(searchedCitiesArr));

         
    }
 
    
    //===============================================================
    //Main Process
    //===============================================================
    init();

    //event handlers
     
     //searchButton starts new city query and output and adds city to local storage array      
    $("#searchBtn").on("click", function(e){

        e.preventDefault();
        //run the query
        console.log("btn clicked");
        var cityQuery = $("#citySearch").val().trim().toLowerCase();
        console.log(cityQuery);
            
            
        var newURL = queryBaseURL + "weather"+ "?q=" + cityQuery + "&APPID=" + APIKey;
        console.log(newURL);
        //send the AJAX call the newly assembled URL
        runQuery(newURL);
        //forecast for next 5 days -- new API for that
        var newForecastURL = forecastQueryBaseURL +"?q=" +cityQuery  + "&APPID=" + APIKey;
        console.log(newForecastURL);
        forecastQuery(newForecastURL);

        //if cityQuery empty
        if (cityQuery === ""){
            return;
        }
        $(".list-group").empty();

        callStorage();
        addToLocal();
    

        return false;

    });

    //eventlistener if li is clicked the city query runs again
    $(".list-group").on("click",".list-group-item",function(){
        cityQuery = $(this).data("city");
        var changedQueryURL= queryBaseURL + "weather"+ "?q=" + cityQuery + "&APPID=" + APIKey
        runQuery(changedQueryURL);
        var changedForecastURL = forecastQueryBaseURL +"?q=" + cityQuery  + "&APPID=" + APIKey;
        forecastQuery(changedForecastURL);
    });
    
            
});

            