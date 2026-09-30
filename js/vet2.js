

const apiOneContainer = document.querySelector('#apiOneContainer')
const apiTwoContainer = document.querySelector('#apiTwoContainer')


document.querySelector('button').addEventListener('click', animals)


//////////////////////
// API 1 Animal API
//////////////////////
function animals() {
    const inputValTwo = document.querySelector('#one').value

    const url = `https://api.api-ninjas.com/v1/animals?name=${inputValTwo}`

    // Create containers for appened elements


    console.log("INPUT:", inputValTwo)
    console.log("URL:", url)

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'HuL3Nlcmf7sO7VkcLHg4YYfVYqJi3H98gGWkwf7m'
        }
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data)

            // clears past list 
            apiOneContainer.innerHTML = '';

            const section = document.createElement('section')
            

            //////////////////////
            // DISPLAY API 1 RESULTS
            //////////////////////

            const name = document.createElement('h2');
            name.textContent = data[0].name
            // create class to be able to style later in CSS
            name.classList.add('name');

            const scientificName = document.createElement('h4');
            scientificName.textContent = data[0].taxonomy.scientific_name;
            scientificName.classList.add('scientificName');

            const diet = document.createElement('h4');
            /// vv had to change from textContent because I wanted the header to be different from the 'diet'
            // i needed to use innerHTML and use a span element so i can target it in css seperatly
            diet.innerHTML = `<span class="label">Diet:</span> ${data[0].characteristics.diet}`;
            diet.classList.add('diet');

            // const location = document.createElement('h4');
            // location.textContent = data[0].locations[0].replaceAll("-", " ");
            // location.classList.add('location');

            /// nest/append to the paragragh
            section.appendChild(name);
            section.appendChild(scientificName);
            section.appendChild(diet);
            //section.appendChild(location);

            document.querySelector('#apiOneContainer').appendChild(section);
            document.querySelector('#bottomBox').style.display = 'block'
            apiOneContainer.style.display = 'block'
            apiTwoContainer.style.display = 'block'

            //////////////////////
            // GET INFO FOR API 2
            //////////////////////
            const rawLocation = data[0].locations[0]
            const region = rawLocation.replaceAll("-", " ");

            console.log('Regions:', region)

            // // Call API 2 from inside API 1
            animals2(region)
           

        })


        .catch(err => {
            console.log(`error ${err}`)
        })
}
 
////////////////////// 
// API 2 - COUNTRIES
//////////////////////

function animals2(region) {
    console.log('Regions from API 1:', region)

    const url = `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(region)}`;

    fetch(url, {
        headers: { 'Authorization': 'Bearer rc_live_5fc00f46f6d34d4cba1691d81180874c' }
    })

        .then(res => res.json())
        .then(data => {
            console.log('API 2 DATA:', data);
            const country = data;
            console.log('Countries', country);

            apiTwoContainer.innerHTML = '';

            const section = document.createElement('section')


            //////////////////////
            // DISPLAY API 2 RESULTS
            //////////////////////

            const location = document.createElement('h4');
            location.innerHTML = `<span class="label">Region:</span> ${data.data.objects[0].region}`
            // create class to be able to style later in CSS
            location.classList.add('location');
            //location.id.add()

            const subregion = document.createElement('h4');
            subregion.innerHTML = `<span class="label">Subregion:</span> ${data.data.objects[0].subregion}`;
            subregion.classList.add('subregion')

            const cName = document.createElement('h4');
            cName.innerHTML = `<span class="label">Country:</span> ${data.data.objects[0].names.official}`
            cName.classList.add('cName')

            const flagEmoji = document.createElement('h2');
            flagEmoji.textContent = data.data.objects[0].flag.emoji;
            flagEmoji.classList.add('flag');

            const gMaps = document.createElement('a');
            gMaps.textContent = 'View on Google Maps';
            gMaps.href = data.data.objects[0].links.google_maps;
            gMaps.classList.add('map')


            // nest everything into the section
            // section.appendChild(diet)
            section.appendChild(location);
            section.appendChild(subregion);
            section.appendChild(cName);
            section.appendChild(flagEmoji);
            section.appendChild(gMaps);
            //section.appendChild(borders);

            apiTwoContainer.appendChild(section);

        })

        .catch(err => console.log(`error ${err}`));
}


/// create a ul and li and append the list
/// good job girl you fought hard <3





/* API2 - https://restcountries.com/docs
// key - rc_live_5fc00f46f6d34d4cba1691d81180874c */







/*
  <h1>Veterinary Animal Origin Reference Tool</h1>
    Box 2<input id="one" type="text" name="" value="">
    <!-- API 1 RESULTS -->
    <div id="conatainer1" >
        <h2 class="name"></h2>
        <h4 class="scientificName"></h4>
        <!-- <h4 class="slogan"></h4> -->
        <h4 class="diet"></h4>
        <!-- <h4 class="group"></h4> -->
        <h4 class="location"></h4>
    </div>
     <div id="conatainer2">
        <h2 class="region"></h2>
        
    </div>
 */