// The Cat API: https://api.thecatapi.com/v1

// Siamese
// Maine Coon
// Bengal

// The Dog API: https://api.thedogapi.com/v1

// Beagle
// Labrador Retriever
// Poodle

const getCatAPI_URL = 'https://api.thecatapi.com/v1';
const theCatAPI_Key = 'yourCatAPI_Key';

const getDogAPI_URL = 'https://api.thedogapi.com/v1';
const theDogAPI_Key = 'yourDogAPI_Key';

document.querySelector('#searchCat').addEventListener('click', changeTitles);
document.querySelector('#searchDog').addEventListener('click', changeTitles);

function changeTitles() {

    const searchCat = document.querySelector('#searchCat').checked;
    console.log(searchCat);

    const searchDog = document.querySelector('#searchDog').checked;
    console.log(searchDog);

    if (searchCat === true) {

        document.querySelector('#headerSearchBreed').innerText = document.querySelector('#headerSearchBreed').innerText.replaceAll('Dog', 'Cat');

        document.querySelector('#headerMatchBreed').innerText = document.querySelector('#headerMatchBreed').innerText.replaceAll('Cat', 'Dog')

    }
    else if (searchDog === true) {

        document.querySelector('#headerSearchBreed').innerText = document.querySelector('#headerSearchBreed').innerText.replaceAll('Cat', 'Dog');

        document.querySelector('#headerMatchBreed').innerText = document.querySelector('#headerMatchBreed').innerText.replaceAll('Dog', 'Cat')

    };
}

document.querySelector('button').addEventListener('click', getBreedMatch);

function getBreedMatch() {

    const breedName = document.querySelector('#breedName').value;
    console.log(breedName);

    const searchCat = document.querySelector('#searchCat').checked;
    console.log(searchCat);

    const searchDog = document.querySelector('#searchDog').checked;
    console.log(searchDog);

    document.querySelector('#searchBreed').replaceChildren();
    document.querySelector('#matchBreed').replaceChildren();

    if (breedName === '') {
        return alert('Please enter a breed.');
    };

    const formatBreedName = breedName.replaceAll(' ', '+');
    console.log(formatBreedName);

    if (searchCat === true) {
        getCatBreed(formatBreedName);
    }
    else if (searchDog === true) {
        getDogBreed(formatBreedName);
    };

};

function getCatBreed(breedName) {
    console.log(breedName);

    const getCatBreedURL = getCatAPI_URL + `/breeds/search?q=${breedName}`;
    console.log(getCatBreedURL);

    return fetch(getCatBreedURL, {
        headers: {
            'x-api-key': theCatAPI_Key
        }
    })

        .then(function (response) {
            console.log(response);
            return response.json();
        })

        .then(function (data) {
            console.log(data);

            if (data.length < 1) {
                return alert('No cat breed was found.');
            };

            const catBreed = data[0];
            console.log(catBreed);

            buildSearchBreed(catBreed);

            return getDogBreeds(catBreed);

        });

};

function getDogBreed(breedName) {
    console.log(breedName);

    const getDogBreedURL = getDogAPI_URL + `/breeds/search?q=${breedName}`;
    console.log(getDogBreedURL);

    return fetch(getDogBreedURL, {
        headers: {
            'x-api-key': theDogAPI_Key
        }
    })

        .then(function (response) {
            console.log(response);
            return response.json();
        })

        .then(function (data) {
            console.log(data);

            if (data.length < 1) {
                return alert('No dog breed was found.');
            };

            const dogBreed = data[0];
            console.log(dogBreed);

            buildSearchBreed(dogBreed);

            return getCatBreeds(dogBreed);

        });

};

function getCatBreeds(dogBreed) {
    console.log(dogBreed);

    const getCatBreedsURL = getCatAPI_URL + '/breeds';
    console.log(getCatBreedsURL);

    return fetch(getCatBreedsURL, {
        headers: {
            'x-api-key': theCatAPI_Key
        }
    })

        .then(function (response) {
            console.log(response);
            return response.json();
        })

        .then(function (data) {
            console.log(data);

            findMatchingBreed(dogBreed, data);

            return data;

        });

};

function getDogBreeds(catBreed) {
    console.log(catBreed);

    const getDogBreedsURL = getDogAPI_URL + '/breeds';
    console.log(getDogBreedsURL);

    return fetch(getDogBreedsURL, {
        headers: {
            'x-api-key': theDogAPI_Key
        }
    })

        .then(function (response) {
            console.log(response);
            return response.json();
        })

        .then(function (data) {
            console.log(data);

            findMatchingBreed(catBreed, data);

            return data;

        });

};

function findMatchingBreed(searchBreed, matchBreeds, matchAnimal) {
    console.log(searchBreed);
    console.log(matchBreeds);
    console.log(matchAnimal);

    if (searchBreed.temperament == '') {
        return alert('Temperament information was not found.');
    };

    const searchTemperament = searchBreed.temperament.split(', ');
    console.log(searchTemperament);

    let highestMatch = 0;
    let matchingBreed = '';
    let matchingBreedTemperament = [];


    matchBreeds.forEach(function (matchBreed) {
        console.log(matchBreed);

        if (matchBreed.temperament) {

            const matchTemperament = matchBreed.temperament.split(', ');
            console.log(matchTemperament);

            let matchScore = 0;
            let matchingTemperament = [];

            for (let i = 0; i < searchTemperament.length; i++) {

                for (let j = 0; j < matchTemperament.length; j++) {

                    if (searchTemperament[i].toLowerCase() === matchTemperament[j].toLowerCase()) {

                        matchScore += 1;

                        matchingTemperament.push(searchTemperament[i]);

                    };

                };

            };

            console.log(matchBreed.name);
            console.log(matchScore);
            console.log(matchingTemperament);

            if (matchScore > highestMatch) {

                highestMatch = matchScore;
                console.log(highestMatch);

                matchingBreed = matchBreed;
                console.log(matchingBreed);

                matchingBreedTemperament = matchingTemperament;
                console.log(matchingBreedTemperament);

            };

        };

    });

    console.log(matchingBreed);
    console.log(highestMatch);
    console.log(matchingBreedTemperament);

    if (matchingBreed == '') {
        return alert('No matching breed was found.');
    };

    buildMatchBreed(matchingBreed, matchAnimal, highestMatch, matchingBreedTemperament);

};

function buildSearchBreed(searchBreed) {
    console.log(searchBreed);

    const searchBreedResults = document.querySelector('#searchBreed');

    let sectionSearchBreed = document.createElement('section');

    let headingSearchBreed = document.createElement('h3');
    headingSearchBreed.innerText = searchBreed.name;
    sectionSearchBreed.appendChild(headingSearchBreed);

    let divImage = document.createElement('div');

    let imgAnimal = document.createElement('img');
    imgAnimal.src = searchBreed.image.url;
    divImage.appendChild(imgAnimal);

    sectionSearchBreed.appendChild(divImage);

    let divBreedGroup = document.createElement('div');

    let nameBreedGroup = document.createElement('span');
    nameBreedGroup.innerText = 'BREED GROUP: ';
    divBreedGroup.appendChild(nameBreedGroup);

    let valueBreedGroup = document.createElement('span');
    valueBreedGroup.innerText = searchBreed.breed_group;
    divBreedGroup.appendChild(valueBreedGroup);

    sectionSearchBreed.appendChild(divBreedGroup);

    let divTemperament = document.createElement('div');

    let nameTemperament = document.createElement('span');
    nameTemperament.innerText = 'TEMPERAMENT: ';
    divTemperament.appendChild(nameTemperament);

    let valueTemperament = document.createElement('span');
    valueTemperament.innerText = searchBreed.temperament;
    divTemperament.appendChild(valueTemperament);

    sectionSearchBreed.appendChild(divTemperament);

    let divOrigin = document.createElement('div');

    let nameOrigin = document.createElement('span');
    nameOrigin.innerText = 'ORIGIN: ';
    divOrigin.appendChild(nameOrigin);

    let valueOrigin = document.createElement('span');
    valueOrigin.innerText = searchBreed.origin;
    divOrigin.appendChild(valueOrigin);

    sectionSearchBreed.appendChild(divOrigin);

    let divLifeSpan = document.createElement('div');

    let nameLifeSpan = document.createElement('span');
    nameLifeSpan.innerText = 'LIFE SPAN: ';
    divLifeSpan.appendChild(nameLifeSpan);

    let valueLifeSpan = document.createElement('span');
    valueLifeSpan.innerText = searchBreed.life_span + ' years';
    divLifeSpan.appendChild(valueLifeSpan);

    sectionSearchBreed.appendChild(divLifeSpan);

    let divSize = document.createElement('div');

    let nameSize = document.createElement('span');
    nameSize.innerText = 'SIZE: ';
    divSize.appendChild(nameSize);

    let valueSize = document.createElement('span');
    valueSize.innerText = searchBreed.weight.imperial;
    valueSize.innerText = valueSize.innerText.replaceAll(';', ' lbs;') + ' lbs';
    divSize.appendChild(valueSize);

    sectionSearchBreed.appendChild(divSize);

    let divDescription = document.createElement('div');

    let nameDescription = document.createElement('span');
    nameDescription.innerText = 'DESCRIPTION: ';
    divDescription.appendChild(nameDescription);

    let valueDescription = document.createElement('span');
    valueDescription.innerText = searchBreed.description;
    divDescription.appendChild(valueDescription);

    sectionSearchBreed.appendChild(divDescription);

    searchBreedResults.appendChild(sectionSearchBreed);

};


function buildMatchBreed(matchBreed, matchAnimal, matchScore, matchingTemperament) {
    console.log(matchBreed);
    console.log(matchAnimal);
    console.log(matchScore);
    console.log(matchingTemperament);

    const matchBreedResults = document.querySelector('#matchBreed');

    let sectionMatchBreed = document.createElement('section');

    let headingMatchBreed = document.createElement('h3');
    headingMatchBreed.innerText = matchBreed.name;
    sectionMatchBreed.appendChild(headingMatchBreed);

    let divImage = document.createElement('div');

    let imgAnimal = document.createElement('img');
    imgAnimal.src = matchBreed.image.url;
    divImage.appendChild(imgAnimal);

    sectionMatchBreed.appendChild(divImage);

    let divBreedGroup = document.createElement('div');

    let nameBreedGroup = document.createElement('span');
    nameBreedGroup.innerText = 'BREED GROUP: ';
    divBreedGroup.appendChild(nameBreedGroup);

    let valueBreedGroup = document.createElement('span');
    valueBreedGroup.innerText = matchBreed.breed_group;
    divBreedGroup.appendChild(valueBreedGroup);

    sectionMatchBreed.appendChild(divBreedGroup);

    let divMatchingTemperament = document.createElement('div');

    let nameMatchingTemperament = document.createElement('span');
    nameMatchingTemperament.innerText = 'MATCHING TEMPERAMENT: ';
    divMatchingTemperament.appendChild(nameMatchingTemperament);

    let valueMatchingTemperament = document.createElement('span');
    valueMatchingTemperament.innerText = matchingTemperament;
    valueMatchingTemperament.innerText = valueMatchingTemperament.innerText.replaceAll(',', ', ');
    divMatchingTemperament.appendChild(valueMatchingTemperament);

    sectionMatchBreed.appendChild(divMatchingTemperament);

    let divMatchScore = document.createElement('div');

    let nameMatchScore = document.createElement('span');
    nameMatchScore.innerText = 'MATCH SCORE: ';
    divMatchScore.appendChild(nameMatchScore);

    let valueMatchScore = document.createElement('span');
    valueMatchScore.innerText = matchScore;
    divMatchScore.appendChild(valueMatchScore);

    sectionMatchBreed.appendChild(divMatchScore);

    let divTemperament = document.createElement('div');

    let nameTemperament = document.createElement('span');
    nameTemperament.innerText = 'TEMPERAMENT: ';
    divTemperament.appendChild(nameTemperament);

    let valueTemperament = document.createElement('span');
    valueTemperament.innerText = matchBreed.temperament;
    divTemperament.appendChild(valueTemperament);

    sectionMatchBreed.appendChild(divTemperament);

    let divOrigin = document.createElement('div');

    let nameOrigin = document.createElement('span');
    nameOrigin.innerText = 'ORIGIN: ';
    divOrigin.appendChild(nameOrigin);

    let valueOrigin = document.createElement('span');
    valueOrigin.innerText = matchBreed.origin;
    divOrigin.appendChild(valueOrigin);

    sectionMatchBreed.appendChild(divOrigin);

    let divLifeSpan = document.createElement('div');

    let nameLifeSpan = document.createElement('span');
    nameLifeSpan.innerText = 'LIFE SPAN: ';
    divLifeSpan.appendChild(nameLifeSpan);

    let valueLifeSpan = document.createElement('span');
    valueLifeSpan.innerText = matchBreed.life_span + ' years';
    divLifeSpan.appendChild(valueLifeSpan);

    sectionMatchBreed.appendChild(divLifeSpan);

    let divSize = document.createElement('div');

    let nameSize = document.createElement('span');
    nameSize.innerText = 'SIZE: ';
    divSize.appendChild(nameSize);

    let valueSize = document.createElement('span');
    valueSize.innerText = matchBreed.weight.imperial;
    valueSize.innerText = valueSize.innerText.replaceAll(';', ' lbs;') + ' lbs'
    divSize.appendChild(valueSize);

    sectionMatchBreed.appendChild(divSize);

    let divDescription = document.createElement('div');

    let nameDescription = document.createElement('span');
    nameDescription.innerText = 'DESCRIPTION: ';
    divDescription.appendChild(nameDescription);

    let valueDescription = document.createElement('span');
    valueDescription.innerText = matchBreed.description;
    divDescription.appendChild(valueDescription);

    sectionMatchBreed.appendChild(divDescription);

    matchBreedResults.appendChild(sectionMatchBreed);

};