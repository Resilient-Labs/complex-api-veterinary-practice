//Goal: Build a simple front-end app that uses data returned from one api to make a request to another api
//  to create something that would be beneficial to a veterinary practice.
// https://docs.thecatapi.com/v1/images/search?breed_ids=${}&limit=5
// api key 🐱 - live_oCqmLENSHkzX6X6OaTLgRQnfwrQKrUDB9Xv9Fz6nibA7L42SWmFib6TXjo26f5Om
//`https://api.fda.gov/animalandveterinary/event.json?search=animal.breed.breed_component:"${breed}"&limit=10`

document.querySelector("button").addEventListener("click",getInfo)

function getInfo (){

    const getKitty = document.querySelector("#catId").value 
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${getKitty}&limit=5`)
    .then (res => res.json())
    .then(data => {

        console.log(data)
        document.querySelector("img").src = data[0].url

       
        
    })

    fetch(`https://api.fda.gov/animalandveterinary/event.json?search=animal.breed.breed_component:"${getKitty}"&limit=10`)
     .then (res=> res.json())
     .then (data => {
        console.log(data) 
        document.querySelector("#symptom").textContent="Symptoms:"+ data.results[0].reaction[0].veddra_term_name
        document.querySelector("h4").textContent="Active Ingredients: "+ data.results[0].drug[0].active_ingredients[0].name
        document.querySelector("#outcome").textContent="Outcome:"+ data.results[0].outcome[0].medical_status
     })





}
