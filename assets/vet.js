
document.querySelector('.button').addEventListener('click', animalHos);

function animalHos(){

    const city = document.querySelector('.city').value;
    const stateCode = document.querySelector('.state').value;


    const apiOne = `https://api.zippopotam.us/us/${stateCode}/${city}`;

    fetch(apiOne)
        .then(res => res.json())
        .then(coord => {
            console.log(coord)

            const long = coord.places[0].longitude;
            const lati = coord.places[0].latitude;

            findHospital(long,lati)     // Include long and lati params in function for 2nd api to work
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

}

function findHospital(long,lati){

    const apiKey = '889525d0d4284f278355330b69f461fb';

    const apiTwo = `https://api.geoapify.com/v2/places?categories=pet.veterinary&filter=circle:${long},${lati},15000&bias=proximity:${long},${lati}&limit=20&apiKey=${apiKey}`

    fetch(apiTwo)                                                      //////////////////////////////////////////////
        .then(res => res.json())                                       // Filter list of arrays to shoe only names //
        .then(wumbo => {                                               //////////////////////////////////////////////
            // console.log(wumbo)
            const wumboNames = wumbo.features.filter((feature)  => feature.properties.name !== undefined); //Filters list to show only objects that have a property.name
            console.log(wumboNames);

            const wumboAddy = wumboNames[0].properties.address_line2.replace(`, United States of America`, '');

            document.querySelector('.results').innerHTML = `${wumboNames[0].properties.name} is the closet Animal Hospital, located at ${wumboAddy}. The 4 next closest Animal Hospitals are ${wumboNames[1].properties.name}, ${wumboNames[2].properties.name}, ${wumboNames[3].properties.name}, & ${wumboNames[4].properties.name}.`


        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}