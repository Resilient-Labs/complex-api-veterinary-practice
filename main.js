class VetBreedApp {
  constructor() {
    this.breeds = [];

    this.form = document.querySelector("#breedForm");
    this.breedSelect = document.querySelector("#breedSelect");
    this.result = document.querySelector("#breedResult");
    this.status = document.querySelector("#status");

    this.form.addEventListener("submit", (event) => {
      this.handleSubmit(event);
    });

    this.loadBreeds();
  }

  async loadBreeds() {
    try {
      this.status.textContent = "Loading breeds...";
      const response = await fetch("https://dogapi.dog/api/v2/breeds");
      if (!response.ok) {
        throw new Error("Could not load breeds.");
      }

      const data = await response.json();

      this.breeds = data.data;
      this.populateBreedSelect();
      this.status.textContent = "";
    } catch (error) {
      console.error(error);

      this.status.textContent = "Sorry, the breeds could not be loaded.";
    }
  }

  populateBreedSelect() {
    this.breedSelect.innerHTML = `<option value="">Choose a breed</option>`;

    this.breeds.sort((a, b) => {
      return a.attributes.name.localeCompare(b.attributes.name);
    });

    this.breeds.forEach((breed) => {
      const option = document.createElement("option");

      option.value = breed.id;

      option.textContent = breed.attributes.name;

      this.breedSelect.appendChild(option);
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const selectedBreedId = this.breedSelect.value;

    if (!selectedBreedId) {
      this.status.textContent = "Please select a breed.";

      return;
    }

    const breed = this.breeds.find((breed) => {
      return breed.id === selectedBreedId;
    });
    if (!breed) {
      return;
    }
    this.status.textContent = "";

    this.displayBreed(breed);

    const breedName = breed.attributes.name;

    await this.loadWikipediaInfo(breedName);
  }

  displayBreed(breed) {
    const info = breed.attributes;

    this.result.classList.remove("hidden");

    document.querySelector("#breedName").textContent = info.name;

    document.querySelector("#breedDescription").textContent =
      info.description || "No description available.";

    document.querySelector("#life").textContent =
      `${info.life?.min ?? "?"} - ${info.life?.max ?? "?"} years`;

    document.querySelector("#maleWeight").textContent =
      `${info.male_weight?.min ?? "?"} - ${info.male_weight?.max ?? "?"} kg`;

    document.querySelector("#femaleWeight").textContent =
      `${info.female_weight?.min ?? "?"} - ${info.female_weight?.max ?? "?"} kg`;

    document.querySelector("#origin").textContent =
      info.origin?.country || "Unknown";

    const coatType = info.coat?.type || "Unknown";

    const coatLength = info.coat?.length || "Unknown";

    document.querySelector("#coat").textContent = `${coatLength} ${coatType}`;

    if (info.traits?.exercise_minutes) {
      document.querySelector("#exercise").textContent =
        `${info.traits.exercise_minutes} minutes/day`;
    } else {
      document.querySelector("#exercise").textContent = "Not available;";
    }

    document.querySelector("#hypoallergenic").textContent = info.hypoallergenic
      ? "Yes"
      : "No";

    if (info.traits?.temperament && info.traits.temperament.length > 0) {
      document.querySelector("#temperament").textContent =
        info.traits.temperament.join(", ");
    } else {
      document.querySelector("#temperament").textContent = "Not available";
    }
  }

  async loadWikipediaInfo(breedName) {
    const wikiSummary = document.querySelector("#wikiSummary");

    const breedImage = document.querySelector("#breedImage");

    wikiSummary.textContent = "Loading additional information...";

    const searchTerm = `${breedName} dog breed`;

    const url =
      "https://en.wikipedia.org/w/api.php" +
      "?action=query" +
      "&format=json" +
      "&origin=*" +
      "&generator=search" +
      `&gsrsearch=${encodeURIComponent(searchTerm)}` +
      "&gsrlimit=1" +
      "&prop=extracts|pageimages" +
      "&exintro=1" +
      "&explaintext=1" +
      "&exsentences=3" +
      "&piprop=thumbnail" +
      "&pithumbsize=500";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Wikipedia request failed.");
      }
      const data = await response.json();

      const pages = data.query?.pages;

      if (!pages) {
        wikiSummary.textContent = "No additional information was found.";

        breedImage.classList.add("hidden");

        return;
      }

      const page = Object.values(pages)[0];

      wikiSummary.textContent =
        page.extract || "No additional information available.";

      if (page.thumbnail?.source) {
        breedImage.src = page.thumbnail.source;

        breedImage.alt = `${breedName} dog`;

        breedImage.classList.remove("hidden");
      } else {
        breedImage.classList.add("hidden");
      }
    } catch (error) {
      console.error(error);

      wikiSummary.textContent =
        "Additional breed information could not be loaded.";
    }
  }
}

new VetBreedApp();
