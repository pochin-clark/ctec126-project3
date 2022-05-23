function getCurrentWeather(data,zipCode){
    console.log(data)
    // Check to see if the OpenWeather API returned an error
    if (data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        // show the initially hidden div
        weatherContent.style.display = 'block'
        weatherContent.innerHTML = 'Please enter a valid Zip Code'
        return // exit
    }

    let p = document.createElement('p') // create a p element
    let date = new Date(data.dt * 1000)
    let dateStr = date.toLocaleDateString('en-us')
    let timeStr = date.toLocaleTimeString('en-us')

    p.innerHTML = dateStr + ' - ' + timeStr + '<br>' + data.name + '<br>' + data.weather[0].description + '<br>' + data.main.temp // content for p
    weatherContent.append(p) // add the p to the weatherContent to the DOM
    const icon = document.createElement('img') // create img element for icon
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`) // set the src attribute using the data from the API
    weatherContent.append(icon) // add the icon to the DOM
    weatherContent.style.display = 'block'
}

function getWeatherForecast(data,zipCode){
    // your code goes here
}

// Declare Variables
const weatherContent = document.querySelector('#weather')
const API_KEY = 'YOUR OPENWEATHERAPI API TOKEN' // Replace this with your own

document.querySelector('#getWeather').addEventListener('click', function () {
    weatherContent.innerHTML = '' // clear out prior results
    let zipCode = document.querySelector('#zip').value
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=${API_KEY}&units=imperial`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Call getWeather function
            getCurrentWeather(data,zipCode)
        }).catch((e) => {
            console.log(`This error occurred: ${e}`)
        })
})