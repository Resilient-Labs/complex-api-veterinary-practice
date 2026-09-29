// live_QY4ca2zFzWIwgJo4KUnJFY2hIXfwwvunagJFpcrtTsTvPtd7bUzHvgrbCzxhvIg8

// https://api.thedogapi.com/v1/breeds/1?api_key=live_QY4ca2zFzWIwgJo4KUnJFY2hIXfwwvunagJFpcrtTsTvPtd7bUzHvgrbCzxhvIg8

// https://breedhealthscore.com/api/v1/breeds/labrador-retriever.json

//https://dog.ceo/api/breeds/list/all

// const API_URL =
    // "https://api.thedogapi.com/v1/breeds?api_key=live_QY4ca2zFzWIwgJo4KUnJFY2hIXfwwvunagJFpcrtTsTvPtd7bUzHvgrbCzxhvIg8";

const breedSelect = document.getElementById("breedSelect")
const results = document.getElementById("results")

const breedListURL = "https://dog.ceo/api/breeds/list/all"
const dogAPI = "https://api.thedogapi.com/v1/breeds?api_key=live_QY4ca2zFzWIwgJo4KUnJFY2hIXfwwvunagJFpcrtTsTvPtd7bUzHvgrbCzxhvIg8"

let breeds = [];

fetch(breedListURL)
    .then(response => response.json())
    .then(data => {
    for (let breed in data.message) {
        
let option = document.createElement("option")
    option.value = breed
    option.textContent = breed
    breedSelect.appendChild(option)
}
});


fetch(dogAPI)
    .then(response => response.json())
    .then(data => {
    breeds = data
});


document.getElementById("searchButton").addEventListener("click", function() {
let selectedBreed = breedSelect.value

if (selectedBreed === "Breed Options") {
    results.innerHTML = "<p>Select a breed.</p>"
    return
}

let dog = breeds.find(function(breed) {
    return breed.name.toLowerCase() === selectedBreed.toLowerCase()
});

if (dog) {
    results.innerHTML = `<h2>${dog.name}</h2> <p>${dog.description}</p>`
} else {
    results.innerHTML = "<span>Nothing found.</span>"
}
});