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

    console.log(currentDateEl);
    console.log(tomorrow);
    console.log(plus2days);
    console.log(plus3days);
    console.log(plus4days);
    console.log(plus5days);

    $("#date1").text(tomorrow);
    $("#date2").text(plus2days);
    $("#date3").text(plus3days);
    $("#date4").text(plus4days);
    $("#date5").text(plus5days);

    //variables for URLS
    var APIKey = "fc5087353660b1e52ab9e8b5bc5a76a6";
    var queryBaseURL= "https://api.openweathermap.org/data/2.5/weather";
    var forecastQueryBaseURL= "https://api.openweathermap.org/data/2.5/forecast";
            //UV API
            //http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
            
            
    var searchTerm=0;
    var defaultCity="Raleigh";
    var defaultURL = queryBaseURL + "?q="+defaultCity+ "&APPID=" + APIKey;
            
    //===============================================================
    //Functions
    //===============================================================
    //start page with Raleigh as default city
    defaultQuery(defaultURL);
    
    function defaultQuery(queryURL){
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {             
            // Transfer content to HTML
            // icon variable
            console.log(response);
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

                
            });
                       
    };
    
    //query that runs after city is enetered in search
    function runQuery(queryURL){
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {             // We store all of the retrieved data inside of an object called "response"
            
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);
            
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

            //today+3
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.list[30].weather[0].icon + ".png'>");
            var fahrenheit = (response.list[30].main.temp -273.15) *1.8 +32;
            //header with Cityname, date and icon
            $(".icon4").html(icon);
            $(".temp4").text("Temp.: "+ Number(fahrenheit).toFixed(1) +" °F");
            $(".humid4").text("Humid.: "+ response.list[30].main.humidity +" %");

            //today+3
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.list[38].weather[0].icon + ".png'>");
            var fahrenheit = (response.list[38].main.temp -273.15) *1.8 +32;
            //header with Cityname, date and icon
            $(".icon5").html(icon);
            $(".temp5").text("Temp.: "+ Number(fahrenheit).toFixed(1) +" °F");
            $(".humid5").text("Humid.: "+ response.list[38].main.humidity +" %");
            
           

        });
                

    }
    
    //===============================================================
    //Main Process
    //===============================================================
            
    $("#searchBtn").on("click", function(){
        console.log("btn clicked");
        var cityQuery = $("#citySearch").val().trim();
        console.log(cityQuery);
            
            
        var newURL = queryBaseURL + "?q=" + cityQuery + "&APPID=" + APIKey;
        console.log(newURL);
        //send the AJAX call the newly assembled URL
        runQuery(newURL);
        //forecast for next 5 days -- new API for that
        var newForecastURL = forecastQueryBaseURL +"?q=" +cityQuery  + "&APPID=" + APIKey;
        console.log(newForecastURL);
        forecastQuery(newForecastURL);
        
        return false;
    });
            
            // 1. Retrieve user input and convert to variables
            // 2. use those variables to run ajax call to weather APIKey
            // 3. break down the object into usable fields
            // 4. Dynamically generate html content
            
            
            
            // //GeolocationAPI
            // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
            
            
            
            
    });