# Cat Wellness Checker

Type in a cat breed and get its profile: name, average weight, life span, a photo, plus normal feline heart rate and temperature ranges. Three APIs, one page.

**Live site:** https://complex-api-veterinary-practice.vercel.app

![Cat Wellness screenshot](screenshot.jpg)

## How the code works

`getCat()` runs on the search button. It queries TheCatAPI's breed search with your input, takes the first match, and renders the breed name, metric weight, and life span. Then it fans out: `getCatImage()` takes the breed id from that first response and fetches the breed's photo from TheCatAPI's image endpoint, while `getHealthInfo()` independently calls a veterinary vital-signs API and uses `data.data.find(animal => animal.species === 'Cat')` to pull the cat row out of a multi-species dataset, rendering the BPM and Celsius ranges.

The orchestration is what I find interesting here, because the two follow-up calls have different dependency shapes. The photo fetch needs the breed id from call one, so it's chained. The vitals call needs nothing from the first call, so it runs in parallel instead of waiting. Recognizing which calls are dependent and which are independent, and structuring the code to match, is a small optimization that keeps the page from doing sequential work it doesn't have to. Three requests, two APIs, one render, and no wasted waiting.

The hardest part was the vitals API. It returns every species at once, so the whole feature hinged on one `.find()` filtering for cats before anything could render.

TheCatAPI and a veterinary vitals API, plain JavaScript. My code is on the `answer` branch.
