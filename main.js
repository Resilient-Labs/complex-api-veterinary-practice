
const breedSelect = document.querySelector('#breed');
const results = document.querySelector('#results');
const apiKey = 'live_mVLEnbEWS83grH7rDhTZQen7VKRPkVnnsOcy7dZphZHNolyGAJ66eEdu9pFTrq2X';

document.querySelector('button').addEventListener('click', getBreed);

// Get cat breeds and fill the dropdown.
fetch('https://catfact.ninja/breeds?limit=1000')
    .then(res => res.json())
    .then(data => {
        data.data.forEach(cat => {
            const option = document.createElement('option');

            option.value = cat.breed;
            option.textContent = cat.breed;

            breedSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.log(error);
        results.textContent = 'Could not load breeds.';
    });

function getBreed() {
    const breedName = breedSelect.value;

    if (breedName === '') {
        results.textContent = 'Please select a breed.';
        return;
    }

    results.textContent = 'Loading...';

    // API 1: Find the selected breed's characteristics.
    fetch('https://catfact.ninja/breeds?limit=1000')
        .then(res => res.json())
        .then(data => {

            const cat = data.data.find(item =>
                item.breed === breedName
            );

            // API 2: Search for the breed.
            fetch(`https://api.thecatapi.com/v1/breeds/search?q=${encodeURIComponent(breedName)}`, {
                headers: {
                    'x-api-key': apiKey
                }
            })
                .then(res => res.json())
                .then(breeds => {

                    // Find the exact breed, not just a partial match.
                    const breed = breeds.find(item =>
                        item.name.toLowerCase() === breedName.toLowerCase()
                    );

                    if (!breed) {
                        results.textContent =
                            'No additional information found for this breed.';
                        return;
                    }

                    // Use its breed ID to request a matching photo.
                    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=1`, {
                        headers: {
                            'x-api-key': apiKey
                        }
                    })
                        .then(res => res.json())
                        .then(images => {

                            let photo = '';

                            if (images.length > 0) {
                                photo = images[0].url;
                            }

                            let photoHTML = '';

                            if (photo !== '') {
                                photoHTML = `<img src="${photo}" alt="${cat.breed}">`;
                            } else {
                                photoHTML = '<p>No photo available.</p>';
                            }

                            results.innerHTML = `
                                <div class="result-card">
                                    <h2>${cat.breed}</h2>

                                    ${photoHTML}

                                    <p><strong>Country:</strong> ${cat.country}</p>
                                    <p><strong>Coat:</strong> ${cat.coat}</p>
                                    <p><strong>Pattern:</strong> ${cat.pattern}</p>
                                    <p><strong>Temperament:</strong> ${breed.temperament || 'Not available'}</p>
                                    <p><strong>Lifespan:</strong> ${breed.life_span || 'Not available'} years</p>
                                </div>
                            `;
                        });
                });
        })
        .catch(error => {
            console.log(error);
            results.textContent = 'Could not retrieve breed information.';
        });
}
