
    document.querySelector('button').addEventListener('click',getBreed)
    function getBreed (){
    // Define your API endpoint and your API key
    const apiKey = 'live_aDoavYxEjmYc4cusKuhnw6GNM8QrWcoOmzWZ7KnnLibUhFYLwWuYlyn0IbHDURQa'
   
    const breed = document.querySelector('input').value
    const url = `https://api.thedogapi.com/v1/breeds/search?q=${breed}`
    //
    fetch(url, {
        method:'GET',
        headers:{
            'x-api-key':apiKey
        }
    })
        .then ( res => res.json())
        .then ( data => {
            console.log(data)

            document.querySelector('h3').textContent = data[0].description
            document.querySelector('.origin').textContent = 'Origin: '+ data[0].origin
            document.querySelector('.breed').textContent = data[0].name.toLowerCase()

            const slug = data[0].name.toLowerCase()
            const url2 = `https://dog.ceo/api/breed/${slug}/images`
                 fetch (url2)
                    .then ( res => res.json())
                    .then ( data => {
                    console.log(data)
                    document.querySelector('img').src = data.message[0] //
          
                    })
                    .catch( err => {
                    console.log( `error ${err}`)
                    });
                
        })
        .catch( err => {
        console.log( `error ${err}`)
    });
}






