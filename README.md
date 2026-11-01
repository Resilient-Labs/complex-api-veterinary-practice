# Dog Look Up 🐶

A page where you pick a dog breed and get a handout with a photo, key facts, and its temperament.

## Description

This is a project I built to practice using two APIs together. The page fills a dropdown with dog breeds, and when you pick one and click search, it gets a random photo of that breed from one API and the breed's details from another. It then shows everything on a card: the breed name and group, lifespan, weight, height, what it was bred for, and a list of its temperament traits. It uses plain HTML, CSS, and JavaScript with `fetch`, so there is no server to run.

## Screenshot

![A breed card with a photo and facts](assets/images/doggy.png)

## Features

- Dropdown filled automatically with dog breeds, including sub-breeds like "Boston Bulldog"
- Search a breed to get a breed card
- Random photo of that breed each time you search
- Facts: breed group, lifespan, weight, height (in both pounds/inches and kg/cm), and what it was bred for
- Temperament shown as a list of traits
- Friendly messages if the breed list can't load, no breed is chosen, or something goes wrong
- Blue woven wallpaper background

## Tech Used

- HTML
- CSS
- JavaScript
- `fetch` and promises (`.then()` and `.catch()`)
- [Dog CEO API](https://dog.ceo/dog-api/) (breed list and photos)
- [TheDogAPI](https://thedogapi.com/) (breed facts)

## How to Use

This app doesn't need a server. It needs a free TheDogAPI key.

1. Download or clone the project.
2. Make a free account at [thedogapi.com](https://thedogapi.com/) and copy your API key.
3. Open `js/main.js` and replace the value of `dogApiKey` at the top with your key.
4. Open `index.html` in your browser (or use the Live Server extension in VS Code).
5. Wait for the dropdown to say "Choose a breed".
6. Pick a breed and click **search**.

**A note about keys:** this page runs in the browser, so the key is visible to anyone who opens the page's code. Only use a free key you can replace.

## How It Works

1. When the page loads, `main.js` asks the Dog CEO API for the list of all breeds and fills the dropdown. The dropdown and button stay turned off until the list arrives.
2. When you click search, it asks Dog CEO for a random photo of that breed.
3. At the same time, it asks TheDogAPI for that breed's details. If a sub-breed isn't found, it searches the main breed instead.
4. When both answers are back, it fills in the card and shows it.

## What I Learned

- How to use two APIs in one project and wait for both before showing the result
- How to use `fetch` with `.then()` and `.catch()`
- How to send an API key in a request header
- How to build a dropdown from data with JavaScript
- How to show and hide a card with a CSS class
- Why API keys shouldn't be put in code that goes on GitHub

VIEW APP HERE: https://the-vet.onrender.com

## Author

Maya Rose 🌹
