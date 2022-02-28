const apiKey = "&appid=5bbb7a356faba6df28c3a3229103f17a";
// let searchedCity = "Oakland";
let searchedCity;
const searchPastCity = document.getElementsByClassName(`searchPastCity`);
let searchedCityHistory = JSON.parse(localStorage.getItem('searchCityHistory')) || [];


function getCurrentApi (searchedCity) {
    let locUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + apiKey;

    fetch(locUrl)
        .then(function(response) {
            console.log(locUrl);
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
                    $(`#date`).text("(" + moment(data.current.dt*1000).format(`L`) + ")");
                    $(`#currentDayForcast`).attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
                    $(`#currentDayTemp`).text(data.current.temp + " °F");
                    $(`#currentDayWind`).text(data.current.wind_speed + " MPH");
                    $(`#currentDayHumidity`).text(data.current.humidity + "%");
                    $(`#currentDayUV`).text(data.current.uvi);
                    $(`#currentDayUV`).attr('style', `background-color: ${uvIndexColor(data.current.uvi)}; color: white; padding: 2px 5px; border-radius: 5px `);
                    $(`.day1`).text(moment(data.daily[1].dt*1000).format(`L`));
                    $(`.forc1`).attr("src", "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png");
                    $(`.tempMax1`).text(data.daily[1].temp.max + " °F");
                    $(`.tempMin1`).text(data.daily[1].temp.min + " °F");
                    $(`.wind1`).text(data.daily[1].wind_speed + " MPH");
                    $(`.humi1`).text(data.daily[1].humidity + "%");
                    $(`.day2`).text(moment(data.daily[2].dt*1000).format(`L`));
                    $(`.forc2`).attr("src", "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png");
                    $(`.tempMax2`).text(data.daily[2].temp.max + " °F");
                    $(`.tempMin2`).text(data.daily[2].temp.min + " °F");
                    $(`.wind2`).text(data.daily[2].wind_speed + " MPH");
                    $(`.humi2`).text(data.daily[2].humidity + "%");
                    $(`.day3`).text(moment(data.daily[3].dt*1000).format(`L`));
                    $(`.forc3`).attr("src", "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png");
                    $(`.tempMax3`).text(data.daily[3].temp.max + " °F");
                    $(`.tempMin3`).text(data.daily[3].temp.min + " °F");
                    $(`.wind3`).text(data.daily[3].wind_speed + " MPH");
                    $(`.humi3`).text(data.daily[3].humidity + "%");
                    $(`.day4`).text(moment(data.daily[4].dt*1000).format(`L`));
                    $(`.forc4`).attr("src", "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png");
                    $(`.tempMax4`).text(data.daily[4].temp.max + " °F");
                    $(`.tempMin4`).text(data.daily[4].temp.min + " °F");
                    $(`.wind4`).text(data.daily[4].wind_speed + " MPH");
                    $(`.humi4`).text(data.daily[4].humidity + "%");
                    $(`.day5`).text(moment(data.daily[5].dt*1000).format(`L`));
                    $(`.forc5`).attr("src", "https://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png");
                    $(`.tempMax5`).text(data.daily[5].temp.max + " °F");
                    $(`.tempMin5`).text(data.daily[5].temp.min + " °F");
                    $(`.wind5`).text(data.daily[5].wind_speed + " MPH");
                    $(`.humi5`).text(data.daily[5].humidity + "%");
                })
        })
}

function uvIndexColor(uvi) {
    if(uvi<3) {
        return 'green';
    } else if (uvi >= 3 && uvi < 8) {
        return 'yellow';
    } else {
        return 'red';
    }
}


const addSearch = ()=>{
    let newSearch = searchedCity;
    searchedCityHistory.push(newSearch);
    // historyArray.splice(5);
    localStorage.setItem('searchCityHistory', JSON.stringify(searchedCityHistory));
}

function showHistory() {
    for (i = 0; i < searchedCityHistory.length; i++) {
        let cityHistoryBtn = document.createElement('button');
        cityHistoryBtn.className = "searchPastCity"
        $("#searchedHistory").append(cityHistoryBtn);
        cityHistoryBtn.textContent = searchedCityHistory[i];
        cityHistoryBtn.addEventListener('click', function() {
            $("#city").text(this.textContent);
            getCurrentApi(this.textContent); 
        })
    }
}

$("#search").on("click", function() {
    searchedCity = document.getElementById(`searchedCity`).value;
    // Set searched city
    $("#city").text(searchedCity);
    getCurrentApi(searchedCity);
    addSearch();
    $("#searchedHistory").empty();
    showHistory ();
})

$("#clear").on("click", function () {
    $("#searchedHistory").empty();
    localStorage.clear();
    return;
});

showHistory();