

// const city = 'london'


// function fetchWeather(city) {
//     fetch('https://api.api-ninjas.com/v1/weather?city=' + city, {
//         headers: {
//             'X-Api-Key': '81XCpNit4+yWlD9vkpmOmg==6CzxWaLH4XRzrcpZ',
//         }
//     })
//         .then((response) => response.json())
//         .then((data) => console.log(data))
// }

// const city = 'warri'
const apiKey = 'cc24a2d7d1a89eb9972d808b816b5ef9'
const searchBtn = document.querySelector('.search button')
const searchBar = document.querySelector('.search-bar')
const userLocation = document.querySelector('.location')
const weatherLoad = document.querySelector('.weather')


function fetchWeather(location) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    ).then(res => res.json())
}





function displayWeather(data) {
    const { name } = data
    const { icon, description } = data.weather[0]
    const { temp, humidity } = data.main
    const { speed } = data.wind
    console.log(name, icon, description, humidity, speed, temp)
    document.querySelector('.city').innerText = 'Weather in ' + name
    document.querySelector('.icon').src =
        'https://openweathermap.org/img/wn/' + icon + '.png'
    document.querySelector('.description').innerText = description
    document.querySelector('.temp').innerText = temp + '°C'
    document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%'
    document.querySelector('.wind').innerText = 'wind speed: ' + speed + 'km/h'
    document.querySelector('.weather').classList.remove('loading')
    // document.body.style.backgroundImage = 'url('')'

}

function search() {
    fetchWeather = searchBar.value
}

searchBtn.addEventListener('click', function () {
    document.querySelector('.weather').classList.add('loading')
    fetchWeather(searchBar.value).then(data => displayWeather(data))

})
searchBar.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        fetchWeather()
    }
})


const getUserCoordinates = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
                fetch(REVERSE_GEOCODING_URL)
                    .then(res => resolve(res.json()))
            },
            error => {
                if (error === error.PERMISSION_DENIED) {
                    reject('location request denied. please reset location to grant access again')
                }
            }
        )
    })
}


userLocation.addEventListener('click', () => {
    document.querySelector('.weather').classList.add('loading')
    getUserCoordinates().then(data => {
        const location = data[0];
        fetchWeather(location.state).then(data => displayWeather(data))
    })
})

