// alert('works')


const dogApiKey = "live_Gn7WjNsqSE5sJSuzYJCuvyamMDtFz4i3JzLKCltwJnHAA1u0R5LQLTkCeZHEJMZj";

const dogCeoUrl = "https://dog.ceo/api";
const dogApiUrl = "https://api.thedogapi.com/v1";

const form = document.getElementById("breed-form");
const select = document.getElementById("breed-select");
const makeBtn = document.getElementById("make-btn");
const message = document.getElementById("message");
const card = document.getElementById("card");



fetch(dogCeoUrl + "/breeds/list/all")

	.then(function (response) {
		return response.json();
	})

	.then(function (data) {
		fillDropdown(data.message);
	})

	.catch(function (error) {
		showMessage("Couldn't load the breed list.", true);
		console.error(error);
	});


function fillDropdown(breeds) {

	select.innerHTML = '<option value="">Choose a breed</option>';

	for (const breed in breeds) {
		const subBreeds = breeds[breed];

		if (subBreeds.length === 0) {
			addOption(breed, breed);
		} else {
			for (let i = 0; i < subBreeds.length; i++) {
				addOption(breed + "/" + subBreeds[i], subBreeds[i] + " " + breed);
			}
		}
	}

	select.disabled = false;
	makeBtn.disabled = false;
}

function addOption(value, label) {
	const option = document.createElement("option");
	option.value = value;
	option.textContent = toTitleCase(label);
	select.appendChild(option);
}



form.addEventListener("submit", function (event) {

	event.preventDefault();

	const chosen = select.value;

	if (chosen === "") {
		showMessage("Please choose a breed first.", true);
		return;
	}

	makeHandout(chosen);
});

function makeHandout(chosen) {

	showMessage("Building handout", false);
	card.classList.add("hidden");

	const parts = chosen.split("/");
	const mainBreed = parts[0];
	const subBreed = parts[1];

	const searchName = subBreed ? subBreed + " " + mainBreed : mainBreed;

	const photoUrl = dogCeoUrl + "/breed/" + chosen + "/images/random";


	const photoRequest = fetch(photoUrl)
		.then(function (response) {
			return response.json();
		});

	searchDogApi(searchName)

		.then(function (results) {

			if (results.length === 0 && subBreed) {
				return searchDogApi(mainBreed);
			}
			return results;
		})

		.then(function (results) {
			if (results.length === 0) {
				showMessage("error", true);
				return;
			}

			const details = results[0];

			return photoRequest.then(function (photoData) {
				showCard(details, photoData.message);
				showMessage("", false);
			});
		})

		.catch(function (error) {
			showMessage("Something went wrong.", true);
			console.error(error);
		});
}


function searchDogApi(name) {

	const url = dogApiUrl + "/breeds/search?q=" + encodeURIComponent(name);

	return fetch(url, {
		headers: { "x-api-key": dogApiKey }
	})
		.then(function (response) {

			if (!response.ok) {
				throw new Error("TheDogAPI error " + response.status);
			}
			return response.json();
		});
}



function showCard(details, photoUrl) {

	document.getElementById("card-name").textContent = details.name;


	document.getElementById("card-group").textContent = details.breed_group || "";

	const photo = document.getElementById("card-photo");
	photo.src = photoUrl;
	photo.alt = "A " + details.name;

	document.getElementById("card-lifespan").textContent = details.life_span || "Not listed";

	document.getElementById("card-weight").textContent = formatMeasure(details.weight, "lbs", "kg");
	document.getElementById("card-height").textContent = formatMeasure(details.height, "in", "cm");

	document.getElementById("card-bredfor").textContent = details.bred_for || "Companionship";


	const traits = document.getElementById("card-traits");
	traits.innerHTML = "";

	if (details.temperament) {
		const list = details.temperament.split(",");

		for (let i = 0; i < list.length; i++) {
			const li = document.createElement("li");
			li.textContent = list[i].trim();
			traits.appendChild(li);
		}
	} else {
		traits.innerHTML = "<li>Not listed</li>";
	}

	card.classList.remove("hidden");
}

function formatMeasure(measure, imperialUnit, metricUnit) {
	if (!measure || !measure.imperial) {
		return "Not listed";
	}
	return measure.imperial + " " + imperialUnit + " (" + measure.metric + " " + metricUnit + ")";
}


function showMessage(text, isError) {
	message.textContent = text;
	message.classList.toggle("error", isError);
}

function toTitleCase(text) {
	return text
		.split(" ")
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
}