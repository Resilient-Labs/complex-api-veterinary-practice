# Vet Assist Dog Breed Health & Image Lookup

A web application that combines FDA veterinary adverse event reports with the Dog CEO API to fetch health incident data and a photo for a selected dog breed.

---

## Features

- **FDA Adverse Event Data:** Searches FDA veterinary reports to display reported symptoms, drug ingredients, brand names, and health outcomes for a specific breed.
- **Dynamic Breed Matching:** Formats and cleans FDA breed names to seamlessly fetch matching images from the Dog CEO API.
- **Random Breed Image:** Displays a random photo of the searched dog breed alongside its health report data.

---

## APIs Used

- **openFDA Animal & Veterinary API:** `https://api.fda.gov/animalandveterinary/event.json`
- **Dog CEO Dog API:** `https://dog.ceo/api/breed/{breed}/images/random`

---

## How It Works

1. The user inputs a dog breed into `#dogInput` and clicks the `#dogBtn` button.
2. The application queries the openFDA API for the top veterinary adverse event report linked to that breed.
3. It updates the DOM with reported symptoms (`veddra_term_name`), drug information (active ingredients and brand name), and medical outcome.
4. The breed name from the FDA response is parsed and formatted to match the Dog CEO API breed structure.
5. A secondary request fetches a random image of the breed from Dog CEO and renders it in the `#placeHere` element.

---

<img width="2829" height="1571" alt="image" src="https://github.com/user-attachments/assets/55f373cf-12db-409a-9f7b-016fbb79e55e" />

