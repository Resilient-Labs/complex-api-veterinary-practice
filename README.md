# Vet Dosage Calculator

A small web app that takes a pet's weight in pounds, converts it to kilograms, and works out a drug dose in milliliters. It also checks the FDA's veterinary adverse event reports for cases with a similar-weight animal.

<img width="772" height="464" alt="Screenshot 2026-10-26 at 1 33 18 AM" src="https://github.com/user-attachments/assets/f1c2dacb-751f-41d5-83b1-137b8a5350c9" />


Right now it supports one drug: **diazepam** (0.5 mg per kg, 5 mg/mL concentration).

## How it works

1. Pick a drug from the dropdown.
2. Enter the pet's weight in lbs and click **convert**.
3. The app converts lbs to kg using the API Ninjas Unit Conversion API.
4. It multiplies the weight by the drug's dose per kg, then divides by the concentration to get the dose in mL.
5. It searches the openFDA Animal & Veterinary Adverse Event API for reports on the same drug with an animal within 3 kg of that weight.
6. The page shows the dose and the weight of the pet in the report. If there's no match, it says "no matching reports found."

## Built with

- HTML, CSS, and vanilla JavaScript
- [API Ninjas Unit Conversion API](https://api-ninjas.com/api/unitconversion)
- [openFDA Animal & Veterinary API](https://open.fda.gov/apis/animalandveterinary/)

## Project structure

```
index.html
css/
  normalize.css
  style.css
js/
  main.js
```

## Running it

1. Clone the repo.
2. Get a free API key from API Ninjas.
3. Open `js/main.js` and put your key in the `X-Api-Key` header.
4. Open `index.html` in your browser.

## Adding a drug

Add a new entry to `drugsInfo` in `main.js`, then add a matching `<option>` in `index.html`:

```js
const drugsInfo = {
    diazepam: {name: "diazepam", dosageMgkg: 0.5, concentratonMgMl: 5}
}
```
