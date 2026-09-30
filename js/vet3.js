document.querySelector('button').addEventListener('click', animals2);

const REGION_MAP = {
  "Northern-Africa": "Northern Africa",
  "Eastern-Africa": "Eastern Africa",
  "Middle-Africa": "Middle Africa",
  "Southern-Africa": "Southern Africa",
  "Western-Africa": "Western Africa",

  "Caribbean": "Caribbean",
  "Central-America": "Central America",
  "North-America": "Northern America",
  "South-America": "South America",

  "Central-Asia": "Central Asia",
  "Eastern-Asia": "Eastern Asia",
  "South-Eastern-Asia": "South-Eastern Asia",
  "Southern-Asia": "Southern Asia",
  "Western-Asia": "Western Asia",

  "Eastern-Europe": "Eastern Europe",
  "Northern-Europe": "Northern Europe",
  "Southern-Europe": "Southern Europe",
  "Western-Europe": "Western Europe",

  "Australia-and-New-Zealand": "Australia and New Zealand",
  "Melanesia": "Melanesia",
  "Micronesia": "Micronesia",
  "Polynesia": "Polynesia",
};

function animals2() {
    const inputValThree = document.querySelector('#three').value;
//use the left side, unless it's null or undefined — in that case, use the right side instead == nullish coalescing operator ??
//const region = REGION_MAP[inputValThree] ?? inputValThree.replaceAll("-", " ");
const url = `https://api.restcountries.com/countries/v5?q=${inputValThree}`;

///subregion/

    fetch(url, {
        headers: { 'Authorization': 'Bearer rc_live_5fc00f46f6d34d4cba1691d81180874c' }
    })

        .then(response => response.json())
        .then(data => {
            const country = data;
            console.log(data);
        })
        .catch(err => console.log(`error ${err}`));
}


// websiteOne - https://restcountries.com/docs
// key - rc_live_5fc00f46f6d34d4cba1691d81180874c





/*. this works do not delete
document.querySelector('button').addEventListener('click', animals);

function animals() {
    const inputValThree = document.querySelector('#three').value;

    const url = `https://api.restcountries.com/countries/v5?`;

    fetch(url, {
        headers: { 'Authorization': 'Bearer rc_live_5fc00f46f6d34d4cba1691d81180874c' }
    })


        .then(response => response.json())
        .then(data => {
            const country = data;
            console.log(data);
        })
        .catch(err => console.log(`error ${err}`));
}

*/