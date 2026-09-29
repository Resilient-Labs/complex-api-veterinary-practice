const url = 'api.zippopotam.us/country/postal-code'
document.querySelector('button').addEventListener('click', findShelter)
function findShelter() {

    let zipEntered = document.querySelector('input').value


    fetch(`https://api.zippopotam.us/us/${zipEntered}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)

            let stateNeeded = data.places[0]['state abbreviation']
            console.log(stateNeeded)


            fetch(`https://petfinnly.com/api/v1/shelters?api_key=pf_ZFmmTYxGMAGXCXQXa3ndq47o46-SfTZHG5PA333qbW8&state=${stateNeeded}`)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                    console.log(data)

                    let container = document.querySelector('.shelterList')

                    for (let i = 0; i < data.data.length; i++) {
                        let nameOfShelter = document.createElement('h2')
                        nameOfShelter.innerText = data.data[i].name
                        container.appendChild(nameOfShelter)

                        let locationAddress = document.createElement('span')
                        locationAddress.innerText = data.data[i].address
                        container.appendChild(locationAddress)

                        let locationPhoneNumber = document.createElement('span')
                        locationPhoneNumber.innerText = data.data[i].phone
                        container.appendChild(locationPhoneNumber)



                    }


                })
        })
        .catch(err => {
            console.log(`error ${err}`)

        })

}


/*(mdn)
const response = await fetch("https://example.org/post", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ username: "example" }),
// …
});*/

