const apiKey = "&appid=5bbb7a356faba6df28c3a3229103f17a";
let searchedCity = "Oakland";
// let searchedCity = $("#searchedCity");


let locUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + apiKey;


$(".search").on("click", function() {
    // Set searched city
    $("#city").text(searchedCity);
    getCurrentApi();
})



// // Set current date 
// $("#date").text(moment().format("L"));

function getCurrentApi () {

    fetch(locUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log(data[0].lat);
            let lat = data[0].lat;
            console.log(data[0].lon);
            let lon = data[0].lon
            let currentUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts" + apiKey;
            console.log(currentUrl);
            fetch(currentUrl)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data){
                    $(`#date`).text(moment(data.current.dt*1000).format(`L`));
                    $(`#currentDayForcast`).text(data.current.weather[0].icon);
                    $(`#currentDayTemp`).text(data.current.temp);
                    $(`#currentDayWind`).text(data.current.wind_speed);
                    $(`#currentDayHumidity`).text(data.current.humidity);
                    $(`#currentDayUV`).text(data.current.uvi);
                    $(`.day1`).text(moment(data.daily[1].dt*1000).format(`L`));
                    $(`.forc1`).text(data.daily[1].weather[0].icon);
                    $(`.tempMax1`).text(data.daily[1].temp.max);
                    $(`.tempMin1`).text(data.daily[1].temp.min);
                    $(`.wind1`).text(data.daily[1].wind_speed);
                    $(`.humi1`).text(data.daily[1].humidity);
                    $(`.day2`).text(moment(data.daily[2].dt*1000).format(`L`));
                    $(`.forc2`).text(data.daily[2].weather[0].icon);
                    $(`.tempMax2`).text(data.daily[2].temp.max);
                    $(`.tempMin2`).text(data.daily[2].temp.min);
                    $(`.wind2`).text(data.daily[2].wind_speed);
                    $(`.humi2`).text(data.daily[2].humidity);
                    $(`.day3`).text(moment(data.daily[3].dt*1000).format(`L`));
                    $(`.forc3`).text(data.daily[3].weather[0].icon);
                    $(`.tempMax3`).text(data.daily[3].temp.max);
                    $(`.tempMin3`).text(data.daily[3].temp.min);
                    $(`.wind3`).text(data.daily[3].wind_speed);
                    $(`.humi3`).text(data.daily[3].humidity);
                    $(`.day4`).text(moment(data.daily[4].dt*1000).format(`L`));
                    $(`.forc4`).text(data.daily[4].weather[0].icon);
                    $(`.tempMax4`).text(data.daily[4].temp.max);
                    $(`.tempMin4`).text(data.daily[4].temp.min);
                    $(`.wind4`).text(data.daily[4].wind_speed);
                    $(`.humi4`).text(data.daily[4].humidity);
                    $(`.day5`).text(moment(data.daily[5].dt*1000).format(`L`));
                    $(`.forc5`).text(data.daily[5].weather[0].icon);
                    $(`.tempMax5`).text(data.daily[5].temp.max);
                    $(`.tempMin5`).text(data.daily[5].temp.min);
                    $(`.wind5`).text(data.daily[5].wind_speed);
                    $(`.humi5`).text(data.daily[5].humidity);
                })
        })
}
