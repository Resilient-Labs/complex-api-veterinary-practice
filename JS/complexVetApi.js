// Find the HTML elements.
const searchButton = document.querySelector("#searchBtn");
const statusMessage = document.querySelector("#status");
const animalResults = document.querySelector("#animalResults");

// Load shelter records when the button is clicked.
searchButton.addEventListener("click", getAnimals);


// FIRST API: Get records from Bloomington's animal shelter.
async function getAnimals() {
    // Clear previous results.
    animalResults.textContent = "";
    statusMessage.textContent = "Loading shelter records...";
    searchButton.disabled = true;

    try {
        // Request five animal records.
        const animalUrl =
            "https://data.bloomington.in.gov/resource/up5q-gxym.json?$limit=5";

        const response = await fetch(animalUrl);

        // Stop if the server reports a problem.
        if (!response.ok) {
            throw new Error("Could not load shelter records.");
        }

        // Read the response as JavaScript data.
        const animals = await response.json();

        if (animals.length === 0) {
            statusMessage.textContent = "No animal records found.";
            return;
        }

        // Create a results card for each animal.
        for (const animal of animals) {
            const card = document.createElement("div");

            // Show the animal's name.
            const name = document.createElement("h2");
            name.textContent = animal.name || "Name unavailable";
            card.appendChild(name);

            // Show the breed.
            const breed = document.createElement("p");
            breed.textContent = "Breed: " + (animal.breed || "Unknown");
            card.appendChild(breed);

            // Show the age reported in the record.
            const age = document.createElement("p");
            age.textContent = "Reported age: " + (animal.age || "Unknown");
            card.appendChild(age);

            // Show the recorded shelter activity.
            // This is not a guarantee of current adoption availability.
            const activity = document.createElement("p");
            activity.textContent =
                "Recorded activity: " + (animal.movement_type || "Not provided");
            card.appendChild(activity);

            // Only offer a breed lookup if the record has a breed.
            if (animal.breed) {
                const breedButton = document.createElement("button");
                breedButton.type = "button";
                breedButton.textContent = "Learn about this breed";

                // Wikipedia's information will appear in this paragraph.
                const breedInfo = document.createElement("p");

                // Pass the FIRST API's breed to the SECOND API function.
                breedButton.addEventListener("click", function () {
                    getBreedInfo(animal.breed, breedInfo, breedButton);
                });

                card.appendChild(breedButton);
                card.appendChild(breedInfo);
            }

            // Add the completed card to the page.
            animalResults.appendChild(card);
        }

        statusMessage.textContent =
            "Shelter records loaded. These include animals already adopted.";

    } catch (error) {
        statusMessage.textContent =
            "Unable to load shelter records. Please try again.";

        console.error(error);

    } finally {
        // Allow another search after success or failure.
        searchButton.disabled = false;
    }
}


// SECOND API: Request a Wikipedia summary for the animal's breed.
async function getBreedInfo(breed, paragraph, button) {
    paragraph.textContent = "Loading breed information...";
    button.disabled = true;

    try {
        // Prepare the breed name for use in the URL.
        const breedForUrl = encodeURIComponent(breed);

        const breedUrl =
            "https://en.wikipedia.org/api/rest_v1/page/summary/" +
            breedForUrl;

        const response = await fetch(breedUrl);

        // Some breeds, especially mixes, have no matching article.
        if (response.status === 404) {
            paragraph.textContent = "Breed information unavailable.";
            return;
        }

        if (!response.ok) {
            throw new Error("Could not load breed information.");
        }

        const breedData = await response.json();

        // Skip missing summaries and pages with multiple possible meanings.
        if (!breedData.extract || breedData.type === "disambiguation") {
            paragraph.textContent = "Breed information unavailable.";
            return;
        }

        // Display the summary as text.
        paragraph.textContent = breedData.extract + " ";

        // Add a source link so readers can check the article.
        const sourceLink = document.createElement("a");
        sourceLink.textContent = "Read on Wikipedia";
        sourceLink.href =
            "https://en.wikipedia.org/wiki/" +
            encodeURIComponent(breedData.title);

        paragraph.appendChild(sourceLink);

    } catch (error) {
        paragraph.textContent =
            "Unable to load breed information. Please try again.";

        console.error(error);

    } finally {
        button.disabled = false;
    }
}