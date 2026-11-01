apiKey =`YjwlEZx1vqyqvgo5HGpzkYws8YwnDJ8V1Z9P9o8p`

document.querySelector('#dogBtn').addEventListener('click',getDog)


function getDog(){

  let breed = document.querySelector('#dogInput').value
  fetch(`https://api.fda.gov/animalandveterinary/event.json?search=animal.breed.breed_component:"${breed}"&limit=5`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let symptoms = data.results[0].reaction[0].veddra_term_name
    let outcome = data.results[0].outcome[0].medical_status
    let drug = data.results[0].drug[0].active_ingredients[0].name
    let brand = data.results[0].drug[0].brand_name
   document.querySelector('h2').innerText = 'Onset:' + symptoms
  document.querySelector('#drug').innerText = 'Ingredients of Drug:' + drug + '/ Brand:' + brand
  document.querySelector('#outcome').innerText = 'Outcome:' + outcome
   let breeds = data.results[0].animal.breed.breed_component
   let textBreed = Array.isArray(breeds) ? breeds[0] :breeds
   // makes it so the breed on fda matches how dog api takes in the breed names
   let fixed = textBreed.split(/[\s,]+/)[0].toLowerCase()

fetch(`https://dog.ceo/api/breed/${fixed}/images/random`)
    .then(res=> res.json())
    .then(data => {
      console.log(data)
        

      let dogImg = document.querySelector('#placeHere')

      dogImg.innerHTML = `<img src="${data.message}">`

      
    })

    .catch(err => {
      console.log(`error is ${err}`)
    });


  })



  



}