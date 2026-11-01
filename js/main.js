document.querySelector('#search').addEventListener('click', getCat)

function getCat() {

    const catType = document.querySelector('#catInput').value

    const url = `https://api.thecatapi.com/v1/breeds/search?q=${catType}`

    fetch(url, {
        headers: {
            'x-api-key': 'live_l4Z8YKzYCuTogMsJKqKNdVsZjvHVeodhm5OQAHmARlvP6bwkCNUDbOtryZOSpFtb'
        }
    })
    .then(response => response.json())
    .then(data => {

        console.log(data)

        const cat = data[0]

        document.querySelector('#title').innerText = cat.name

        document.querySelector('#avgWeight').innerText =
            `Average Weight: ${cat.weight.metric} kg`

        document.querySelector('#life').innerText =
            `Life Span: ${cat.life_span} years`

        getCatImage(cat.id)

        getHealthInfo()

    })
    .catch(error => {
        console.log(error)
    })
}


function getCatImage(catId) {

    const imageUrl =
        `https://api.thecatapi.com/v1/images/search?breed_ids=${catId}`

    fetch(imageUrl, {
        headers: {
            'x-api-key': 'live_l4Z8YKzYCuTogMsJKqKNdVsZjvHVeodhm5OQAHmARlvP6bwkCNUDbOtryZOSpFtb'
        }
    })
    .then(response => response.json())
    .then(data => {

        console.log(data)

        document.querySelector('#image').src = data[0].url

    })
    .catch(error => {
        console.log(error)
    })
}


function getHealthInfo() {

    fetch('https://galen.vet/api/v1/vital-signs.json')
    .then(response => response.json())
    .then(data => {

        console.log(data)

        const catHealth =
            data.data.find(animal => animal.species === 'Cat')

        document.querySelector('#heartRate').innerText =
            `Normal Heart Rate: ${catHealth.heart_rate_bpm[0]} - ${catHealth.heart_rate_bpm[1]} BPM`

        document.querySelector('#temp').innerText =
            `Normal Temperature: ${catHealth.temperature_c[0]} - ${catHealth.temperature_c[1]} °C`

    })
    .catch(error => {
        console.log(error)
    })
}