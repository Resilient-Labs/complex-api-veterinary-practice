// https://api.fda.gov/animalandveterinary/event.json

document.querySelector('button').addEventListener('click', vetDrugs)

//Input species Name Cap

function vetDrugs() {
    const inputValOne = document.querySelector('#one').value

    const url = `https://api.fda.gov/animalandveterinary/event.json?search=animal.species:${inputValOne}&limit=5`

    console.log("INPUT:", inputValOne)
    console.log("URL:", url)
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data)

        })

        .catch(err => {
            console.log(`error ${err}`)
        })
}
//:${inputVal}
// `https://api.fda.gov/animalandveterinary/event.json?search=species:${inputVal}&limit=5`
//animal.breed.breed_component
//duration.unit 

  