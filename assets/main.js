//GOAL: Build a front-end app that is useful for a veterinary practice and uses two apis that working with each other. The output for one api should be the input for the second api!

//PROJECT DESCRIPTION: 
//This Dog Fact Sheet app will help veteranarians quickly search general information about the dog breed of choice for new pet owners.

//LOGIC BREAKDOWN:
//The user will input the name of a dog breed. We will use a click event to fetch the API1 data and print a short fact sheet for the breed. We will then use the output of the same breed name from api1 to get an image from api2 to complete the dog fact sheet.

//API1: Getting the health tips for dogs by breed
document.querySelector('#submit').addEventListener('click', getDog)

function getDog(){

    const dogBreed = document.querySelector('#dogBreed').value
    console.log(dogBreed)

    const url1 = `https://api.api-ninjas.com/v1/dogs?name=${dogBreed}`
    

    fetch(url1, {
        method: 'GET',
        headers: {'X-Api-Key': 'Q5XsjjCkhpTeUwUkBvP1jVOsOI7zCT8lQpSuXp2p'},
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data) //to test API works 
            document.querySelector('img').style.display = 'block'
            //Adding all of the info to a fact sheet depending on the breed of dog 
            document.querySelector('#dogName').innerText= `Your dog is a ✨ ${data[0].name} ✨`
            document.querySelector('#training').innerText= `Trainability: ${data[0].trainability}`
            document.querySelector('#barking').innerText= `Barking: ${data[0].barking}`
            document.querySelector('#strangers').innerText= `Good With Strangers: ${data[0].good_with_strangers}`
            document.querySelector('#life').innerText= `Max Life Expectancy: ${data[0].max_life_expectancy}`
            document.querySelector('#otherDogs').innerText= `Good With Other Dogs: ${data[0].good_with_other_dogs}`
            
            //Introduce variable for dog photo with value coming from 1st API
            const dogName = data[0].name;
            //Introduce second API variable
            const url2 = `https://dog.ceo/api/breed/${dogName}/images/random`
            
            fetch(url2) 
                .then(res => res.json())
                .then((data) =>{
                    console.log(data)
                    document.querySelector('img').src = data.message //print image to the DOM
                })
                .catch(error=> {
                    console.error(error)
                })
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

    