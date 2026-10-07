// fetch(`https://api.fda.gov/animalandveterinary/event.json?api_key=Q3nXQLeOJ8anpOXmOPZMpMguZ36TGtyohZdK5Oqi`)
// const url =`https://api.fda.gov/animalandveterinary/event.json?search=animal.breed.breed_component:"${userInput}"`
// const urls = `https://api.fda.gov/animalandveterinary/event.json?search=animal.breed.breed_component:%22Bulldog%22`
// Get the breed name from user and Look up somethings in Dog Api
// The use the ouput from Dog Api to interact with the OPEN FDA to get the
// Drugs active ingredient, what it does, was it effective, min wieght and age of dog

document.querySelector('button').addEventListener('click',dogBreed)
function dogBreed(){
    let userInput = document.querySelector('input').value
    const url =`https://api.fda.gov/animalandveterinary/event.json?search=animal.breed.breed_component:"${userInput}"`
    // const url = `https://dogapi.dog/api/v2/breeds`
fetch(url)
.then(res => res.json())
.then( async data =>{
    console.log(data)
    // vedera term name
    console.log(data.results[0].reaction[0].veddra_term_name)
    let veddra = data.results[0].reaction[0].veddra_term_name
    document.querySelector('.illness').innerText = `The dog suffered from: ${veddra}`
    // drug name
    console.log(data.results[0].drug[0].active_ingredients[0].name)
    let drugName = data.results[0].drug[0].active_ingredients[0].name
    document.querySelector('.drug').innerText = `The active ingredient in the drug is: ${drugName}`
    // minimum weight
    console.log(data.results[0].animal.weight.qualifier)
    let weight = data.results[0].animal.weight.qualifier
    document.querySelector('.minWeight').innerText = `The minimum weight for the medication is: ${weight}`
    // minimum age
    let age =Math.floor(data.results[0].animal.age.min)
    let ageUnit = data.results[0].animal.age.unit
    document.querySelector('.minAge').innerText = `The minimum age for the medication is ${age} ${ageUnit}`
    console.log(data.results[0].animal.age.min)
    // minimum age unit
    console.log(data.results[0].animal.age.unit)
    // outcome medical status   
    // console.log(data.results[0].outcome[0].medical_status)
    //dog name output that will be input for other api
    console.log(data.results[0].animal.breed.breed_component)
    let imageInput = data.results[0].animal.breed.breed_component
     document.querySelector('img').src = await dogImage(imageInput)
})}

function dogImage(name){
return fetch(`https://dog.ceo/api/breed/${name}/images`)
.then(res => res.json())
.then(data =>{
    console.log(data)
    return data.message[0]
    // document.querySelector('img').src = data.message[0]
})
}