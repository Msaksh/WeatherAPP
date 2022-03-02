const api = {
    key : "a94b8f8f80f988f5c097ee2d8f8832e9",
    base : "https://api.openweathermap.org/data/2.5/"
}


const searchBox = document.querySelector(".searchBox");
searchBox.addEventListener("keydown", handlePress)

function handlePress (evt) {
    console.log(evt.key);
    if (evt.key === "Enter") {
        console.log(searchBox.value);
        getResults(searchBox.value);
    }
}

function getResults(cityName) {
    fetch(`${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }) .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .cityName");
    city.innerText = `${weather.name}, ${weather.sys.country}`
    
    let todaysDate = new Date();
    const day = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let date = document.querySelector(".location .date");
    date.innerText = `${day[todaysDate.getDay()]}, ${todaysDate.getDate()} ${monthNames[todaysDate.getMonth()]} ${todaysDate.getFullYear()}`
    // console.log(day[todaysDate.getDay() - 1]);
    // console.log(monthNames[todaysDate.getMonth()]);

    let temp = document.querySelector(".current .temp");
    temp.innerText = `${Math.round(weather.main.temp)}°c`;

    let sky = document.querySelector(".current .sky");
    sky.innerText = `${weather.weather[0].main}`;

    let tempBetween = document.querySelector(".current .tempBetween");
    tempBetween.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}