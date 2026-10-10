console.log("Hello World")
// Use Water Quality API to see if it's safe to use the tap for grooming and sugeries etc
// API - https://environment.data.gov.uk/water-quality/api-docs OR Philly Open Data
// API - FDA Vertinary - https://api.fda.gov/animalandveterinary/event.json - KEY pTdEGLobTDkbJ65wjCm6udv1qaQIdwGmge1jWtvu
// API - https://dogapi.dog/api/v2
// API - https://dogapi.dog/api/v2/facts
// API - https://www.geoapify.com/places-api/ (requires geo-coding)

// fetch(`https://api.fda.gov/animalandveterinary/event.json?api_key=pTdEGLobTDkbJ65wjCm6udv1qaQIdwGmge1jWtvu&search=animal.breed.breed_component:"short"`)
//         .then(res => res.json())
//         .then((data) => {
//         console.log(data)

//         })

// document.querySelector('button').addEventListener('click', findBreed)

// function findBreed() {

//         const breed = document.querySelector('#dogInput').value

//         fetch(`https://dogapi.dog/api/v2/breeds`)
//         .then(res => res.json())
//         .then((data) => {
//         console.log(data)

//         pup = data[0].attributes.name
//         console.log(pup)

        

//         });
// }

// fetch(`https://api.geoapify.com/v2/places?categories=pet.veterinary&filter=circle%3A-89.9324386707035%2C35.143833853955485%2C1000&bias=proximity%3A-89.9324386707035%2C35.143833853955485&limit=20&offset=0&lang=en&apiKey=6b33**0834`)
//         .then(res => res.json())
//         .then((data) => {
//         console.log(data)

//         })
document.querySelector('button').addEventListener('click', getCity)

function getCity(){
    const zipCode = document.querySelector("#cityInput").value

    fetch(`https://api.geocod.io/v2/geocode?api_key=ad26dd29ad9fba7ef761c1fbd11173132d36db9&q=${zipCode}`)
        .then(res => res.json())
        .then((data) => {
        console.log(data)

        let latt = data.results[0].location.lat
        let lon = data.results[0].location.lng

        var requestOptions = {
        method: 'GET',
        };

        fetch(`https://api.geoapify.com/v2/places?categories=pet.animal_shelter&filter=circle:${lon},${latt},32200&bias=proximity:${lon},${latt}&limit=20&offset=0&lang=en&apiKey=6b33c61257d2474dae5cc499e2720834`, requestOptions)
        .then(response => response.json())
        .then((hospitals) => {
       

        const petHospital = hospitals.features
        console.log(petHospital)

        document.querySelector('#boxOne').innerText = petHospital[0].properties.formatted
        document.querySelector('#boxTwo').innerText = petHospital[1].properties.formatted
        document.querySelector('#boxThree').innerText = petHospital[2].properties.formatted
        });

});
} 


//  fetch(`https://api.geoapify.com/v2/places?categories=pet.animal_shelter&filter=circle:${lon},${latt},32200&bias=proximity:${lon},${latt}&limit=20&offset=0&lang=en&apiKey=6b33c61257d2474dae5cc499e2720834`, requestOptions)
//         .then(response => response.json())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));