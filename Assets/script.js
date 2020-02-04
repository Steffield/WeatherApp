$(document).ready(function() {
    //===============================================================
    //Setup variables
    //===============================================================
            
    var APIKey = "fc5087353660b1e52ab9e8b5bc5a76a6";
    var cityDefault = "Cary";
    var currentDateEl = moment().format("MM/DD/YY"); 
    var queryBaseURL= "https://api.openweathermap.org/data/2.5/weather";
    var forecastQueryBaseURL= "https://api.openweathermap.org/data/2.5/forecast";
            //UV API
            //http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
            
            
    var searchTerm=0;
    //check date
    console.log(currentDateEl);  
            
    //===============================================================
    //Functions
    //===============================================================
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
        $("#cityName").html("<h1>" + response.name +" ("+ currentDateEl +") "+ icon+"</h1>");
                   
        console.log(icon);
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
            
        // Converts the temp from Kelvin to Fahrenheit with the below formula
        var fahrenheit = (response.main.temp -273.15) *1.8 +32;
        $(".temp").text("Temperature (F): "+ Number(fahrenheit).toFixed(2));
                  
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
            
            
        });
                   
    };
    
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

        var newForecastURL = forecastQueryBaseURL +"?q=" +cityQuery  + "&APPID=" + APIKey;
        console.log(newForecastURL);
        runQuery(newForecastURL);
        
        return false;
    });
            
            // 1. Retrieve user input and convert to variables
            // 2. use those variables to run ajax call to weather APIKey
            // 3. break down the object into usable fields
            // 4. Dynamically generate html content
            
            
            
            // //GeolocationAPI
            // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
            
            
            
            
    });