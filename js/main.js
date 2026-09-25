//get input from the button



//Grabbing Location
document.querySelector('#search-button').addEventListener('click', grabLocation)

function grabLocation() {
    const apiKey = `0e0f03fb018404219d4ba42c466280de`
    const zipCode = document.querySelector('#location-input').value
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`

    const apiKey2 = `2625a992af5449e1a3025843262309`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            let returnedVal = document.querySelector('#location-name').innerText = data.name

            const url2 = `http://api.weatherapi.com/v1/current.json?key=${apiKey2}&q=${returnedVal}`

            fetch(url2)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    document.querySelector('#temperature').innerText = "Temperature: " + data.current.temp_f + " °F"
                    if (data.current.temp_f > 60){
                        document.querySelector('#safety-message').innerText = "Reconsider walking the luh doggy."
                    } else {
                        document.querySelector('#safety-message').innerText = "It's a great time for your dog to get some exercise."
                    }
                    document.querySelector('#weather-icon').src = 'https:' + data.current.condition.icon
                    document.querySelector('#weather-condition').innerText = "Current conditions: " + data.current.condition.text
                    document.querySelector('#humidity').innerText = data.current.humidity + '%'
                    document.querySelector('#uv-index').innerText = data.current.uv

                })
                .catch(error => {
                    console.error(error)
                })
        })
        .catch(error => {
            console.error(error)
        })
}