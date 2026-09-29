//const ebird_api_key = '18699e52-fe29-444e-bac5-6f09c9de025b'
const geocoding_api_key = '6ab55fa363adb593355201dksf01fba'
const location_iq_api_key = 'pk.eeb96a227ecd7597e6c5624f1d74d5ea'

let store_list = document.getElementById('stores')

document.querySelector('button').addEventListener('click', find_pet_stores)



function find_pet_stores() {
    let user_address = document.querySelector('input').value
    //replace commas and spaces with '+' for the correct address format
    // /[\s,]+/g looks for multiple instances of a space or comma across the whole string
    let address_query = user_address.replaceAll(/[\s,]+/g, "+")
    console.log(address_query)

    fetch(`https://geocode.maps.co/search?q=${address_query}&api_key=6ab55fa363adb593355201dksf01fba`)
        .then(res => res.json())
        .then(coordinates => {
            //need to find your location via long and latitude
            console.log(coordinates)
            let latitude = coordinates[0].lat
                //Math.trunc((coordinates[0].lat) * 100) / 100
            let longitude = coordinates[0].lon
                //Math.trunc((coordinates[0].lon) * 100) / 100
            console.log(latitude)
            console.log(longitude)

            fetch(`https://api.locationiq.com/v1/nearby?key=${location_iq_api_key}&lat=${latitude}&lon=${longitude}&radius=10000&tag=shop:pet`)
                .then(res => res.json())
                .then(locations => {
                    console.log(locations)
                    // once you have your locations, place them on the html page
                    console.log(locations[0].display_name)
                    console.log(locations[0].address)

                    store_list.innerHTML = ''
                    for (let i = 0; i < locations.length; i++) {
                        let li = document.createElement('li')
                        console.log(locations[i].display_name)
                        li.append(locations[i].display_name)
                        store_list.appendChild(li)
                    };
                })
            
            // fetch(`https://api.ebird.org/v2/data/obs/geo/recent/notable?lat=${latitude}&lng=${longitude}`, {
            //     method: 'GET',
            //     headers: {
            //         'X-eBirdApiToken': ebird_api_key
            //     }
            // })
            //     .then(res => res.json())
            //     .then(bird_data => {
            //         let rare_birds = []
            //         console.log(bird_data)
            //         console.log(bird_data[0].howMany)
            //         for (i = 0; i < bird_data.length; i++){
            //             if (bird_data[i].howMany > 0)
            //                 rare_birds.push(bird_data[i])
            //         }
            //         console.log(rare_birds)
            //     })
            
        })
        
    
    
    
}

