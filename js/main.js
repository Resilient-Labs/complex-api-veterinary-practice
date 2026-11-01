// Project: Complex API 1 - Veterinary Practice
// GitHub: https://github.com/Resilient-Labs/complex-api-veterinary-practice
// APIs used:
// U.S. Food and Drug Administration:
// https://open.fda.gov/apis/animalandveterinary/event/

// global variable, so I can store a value and then use it as value for next API call
let animalSpecies = ''

// When the user clicks to submit, the function should run:
document.querySelector('#submit').addEventListener('click', USFoodAndDrugAdministrationTestAPI)

// program uses api to see if active ingredient has any reports of getting a animal sick
function USFoodAndDrugAdministrationTestAPI() {
    // Doc enters active ingredient
    const userInputtedDrugName = document.querySelector('#drugInputValue').value
    console.log(userInputtedDrugName)
    // Doc enters animal type:
    const userInputtedAnmialSpecies = document.querySelector('#speciesInputValue').value
    console.log(userInputtedAnmialSpecies)
    //Empty Arrays to store info I get back from API:
    let receivedData = []
    let refinedArray = []
    // api_key=haIrLgKlfX6ykAUlW1C9nh6zu4jf5fsuptPGugy0
    fetch(
        `https://api.fda.gov/animalandveterinary/event.json?search=drug.active_ingredients.name:"${userInputtedDrugName}"&limit=5`
    )
        .then(response => response.json())
        .then(data => {
            // store received data as value in variable:
            receivedData = data.results
            console.log(receivedData)
            // filter data, want to exclude human as species
            refinedArray = receivedData.filter(elementsInArray => elementsInArray.animal.species != 'Human')
            console.log(refinedArray)

            // display what this API returned
            document.querySelector('#Medication').innerText = userInputtedDrugName
            document.querySelector('#dogBreed').innerText = refinedArray[0].animal.breed.breed_component

            // want to store the animal's gender in a value to use in next API
            animalGender = refinedArray[0].animal.gender
            console.log(animalGender)
            // taking what was returned then stored from API and plugging it into a new function that will use the stored value in new API call/new fetch
            getAnimalGenderInfo(animalGender)
        })
        .catch(error => {
            console.log(error)
            alert('Please try entering an active ingredient of the medication')
        })
}


// global variable needs to be declared to store value returned from function, and then be able to plug into function to display
let vetPatientWithAdverseReaction = ''
// second API Fetch: https://api-ninjas.com/api/emoji
function getAnimalGenderInfo(storedPropertyValueFromReturnedObject) {
    fetch(`
        https://api.api-ninjas.com/v1/emoji?name=${storedPropertyValueFromReturnedObject}
        `, {
        headers: {
            "X-API-Key":
                "AHH5dN0kTFwhozLmKiFN0a7Q5uxYhln8k7KLgHG5"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (storedPropertyValueFromReturnedObject == 'Female') {
                vetPatientWithAdverseReaction = data[0].character
                console.log(data[0].character)
                vetPatientWithAdverseReactionDisplay(vetPatientWithAdverseReaction)
            } else if (storedPropertyValueFromReturnedObject == 'Male') {
                vetPatientWithAdverseReaction = data[0].character
                console.log(data[1].character)
                vetPatientWithAdverseReactionDisplay(vetPatientWithAdverseReaction)
            } else {
                return
            }
        })
}

// display animal gender
function vetPatientWithAdverseReactionDisplay(genderEmoji) {
    document.querySelector('#genderOfAnimal').innerText = genderEmoji
}

