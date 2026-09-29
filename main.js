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
      const response = await fetch();
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
}
