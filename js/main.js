// Goal: Build a simple front-end app that uses data returned from one api to make a request to another api to create something that would be beneficial to a veterinary practice.
// FLOW: user enters ZIP --> zippopotam.us returns coordinates --> coordinates from API 1 are used in API 2 request --> Open-Meteo returns air-quality deets

document.querySelector('#checkAir').addEventListener('click', checkAir)

function checkAir(){
    const zipCode = document.querySelector('#zipCode').value

    const locationUrl = `https://api.zippopotam.us/us/${zipCode}`

    fetch(locationUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const latitude = data.places[0].latitude
            const longitude = data.places[0].longitude

            const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm2_5`

            fetch(airUrl)
                .then(res => res.json())
                .then(airData => {
                    console.log(airData)

                    const results = document.querySelector('#results')

                    const aqi = airData.current.us_aqi
                    const pm25 = airData.current.pm2_5

                    let message = ''

                    if(aqi <= 50){
                        message = 'Air quality looks good for a walk.'
                    }else if(aqi <= 100){
                        message = 'Air quality is moderate. Keep an eye on sensitive pets.'
                    }else{
                        message = 'Air quality may not be ideal for a long walk.'
                    }

                    results.innerHTML = `
                    <h2>Air Check for ${zipCode}</h2>
                    <p>US AQI: ${aqi}</p>
                    <p>PM2.5: ${pm25} micrograms per cubic meter</p>
                    <p>${message}</p> 
                    `
                })

                .catch(err => {
                    console.log(`error ${err}`)
                })
        })

        .catch(err => {
            console.log(`error ${err}`)
        })
}