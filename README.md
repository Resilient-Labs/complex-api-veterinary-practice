# 🐾 Bloomington Shelter Animal Explorer

A simple front-end app that displays Bloomington animal shelter records and lets users learn about each animal's breed. It was created for a veterinary practice API assignment and could help staff and clients explore shelter records and general breed information.

<img width="817" height="390" alt="Screenshot 2026-10-11 at 2 09 32 AM" src="https://github.com/user-attachments/assets/30daf7cc-3ea4-4230-a160-de76c6892298" />

## Languages used

- **HTML5:** Structures the page, buttons, and results area.
- **CSS3:** Styles the page and adjusts the layout for different screen sizes.
- **JavaScript:** Requests API data, handles button clicks, and displays animal records and breed summaries.

## How it works

1. Click **Show Animals** to request five records from Bloomington's animal data API.
2. View each animal's name, breed, reported age, and recorded shelter activity.
3. Click **Learn about this breed** to send the breed name from that record to Wikipedia's summary API.
4. Read the returned summary and follow its Wikipedia source link.

The second API request uses the breed returned by the first API, meeting the assignment's requirement to connect two APIs.

## APIs used

- [Bloomington Animal Shelter Animals](https://data.bloomington.in.gov/resource/up5q-gxym.json?$limit=5): Provides shelter records.
- [Wikipedia summary API example](https://en.wikipedia.org/api/rest_v1/page/summary/German_Shepherd): Provides a summary for a matching breed article.

The app sends these requests without API keys. Internet access is required.

## Run locally

1. Clone or download this repository and select the `answer` branch if the project files are not on the default branch.
2. Open the project folder in VS Code.
3. Open `vetIndex.html` using Live Server.
4. Click **Show Animals**, then try a breed information button.

No package installation or build step is required.

## Project files

- `vetIndex.html` — page structure.
- `CSS/complexVetAPI.css` — page styling.
- `JS/complexVetApi.js` — API requests and page interactions.



