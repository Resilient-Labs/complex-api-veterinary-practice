// alert('works')
//https://aes.shenlu.me/api#speciescount
///api/v1/speciescount

// https://open.fda.gov/apis/animalandveterinary/
// https://cataas.com/
// https://cataas.com/api/cats?tags=tag1,tag2&skip=0&limit=10
// https://open.fda.gov/apis/animalandveterinary/event/
// https://api.fda.gov/animalandveterinary/event.json

//step 1: get the species from this one 
//https://aes.shenlu.me/api#species

//document.querySelector('#submit').addEventListener("click", getPetCare)

// function getPetCare(event) {
//     event.preventDefault()

//     const pet = document.getElementById("PET").value.toLowerCase()

//     const apiUrl = `https://aes.shenlu.me/api/v1/species`

//     fetch(apiUrl)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         })
// }
/*
user enters the breed-> hits bloomington api  column breed ->this is then referenced to fda 
the fda takes the breed .data.results[0].breed -> (potential information output: Vet different animal breed medicine)
ex: drug[0].manufacturer.name
*/
//?pageNumber=1&pageSize=10&$breed=${pet}
//https://data.bloomington.in.gov/api/v3/views/up5q-gxym/query.json

document.querySelector('#submit').addEventListener("click", getPetCare)

function getPetCare() {
    const pet = document.getElementById("PET").value.toLowerCase()

    const mainApiUrl = `https://data.bloomington.in.gov/api/v3/views/up5q-gxym/query.json`

    
    fetch(mainApiUrl, {method:"POST", body:JSON.stringify({
        "query": `SELECT * WHERE lower(breed) like lower('%${pet}%')`,
        "page": {
            "pageNumber": 1,
            "pageSize": 100
        },
        "includeSynthetic": false
     })} )
        .then(result => result.json())
        .then(data => {
            console.log(data)
            document.querySelector(".one").innerHTML = "Youre searching for  medication for " + data[0].breed


            let newPetInfo = data[0].breed; 

            const apiUrl = `https://api.fda.gov/animalandveterinary/event.json?limit=5&search=animal.breed.breed_component:${newPetInfo}`

                fetch(apiUrl)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        document.querySelector(".main").innerHTML = "FDA Disclaimer" + data.meta.disclaimer
                        document.querySelector(".two").innerHTML = "Gender: " + data.results[0].animal.gender

                        document.querySelector(".three").innerHTML = "Manufacturer name: " + data.results[0].drug[0].manufacturer.name
                        document.querySelector(".four").innerHTML ="Manufacturer Registeration Number:" + data.results[0].drug[0].manufacturer.registration_number

                    })
                    .catch(err => {
                        console.log("ERROR:", err)
                    })

                    })
                    .catch(err => {
                        console.log("Error", err)

                        
                   })

}