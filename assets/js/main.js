document.querySelector("button").addEventListener("click", searchBreed)

function searchBreed(){
    const doggie=document.querySelector("input").value.toLowerCase()

    const dogUrl=`https://dog.ceo/api/breed/${doggie}/images/random`;

    fetch(dogUrl)
    .then(res => res.json())
    .then(data => {
        
        console.log(data)

        
        document.querySelector('img').src=data.message

        //The picture link data from the API #1 has the breed name hiding inside it, so cut the picture link at every / and grab the part with the breed name (example: "retriever-golden")
        const breed = data.message.split("/")[4]

        //Cut at the dash, flip the order & glue the pieces back together with a space. So, it reads like a normal breed name ("retriever-golden" becomes "golden retriever")
        const breedName = breed.split("-").reverse().join(" ")


        const ninjaUrl=`https://api.api-ninjas.com/v1/dogs?name=${breedName}`;

        fetch(ninjaUrl, { headers: {"X-Api-Key": "1xkg9TBXqwAL2e4P12LSz4BRBVYZQZurAenAwqwF"}})
        .then(res => res.json())
        .then(info => {
        
        console.log(info)

        document.querySelector(".dog").textContent=doggie
        document.querySelector(".maleHeightMax").textContent="Male Max-Height: "+info[0].max_height_male+" in."
        document.querySelector(".femaleHeightMax").textContent="Female Max-Height: "+info[0].max_height_female+" in."
        document.querySelector(".maleHeightMin").textContent="Male Min-Height: "+info[0].min_height_male+" in."
        document.querySelector(".femaleHeightMin").textContent="Female Min-Height: "+info[0].min_height_female+" in."
        document.querySelector(".maleWeightMax").textContent="Male Max-Weight: "+info[0].max_weight_male+" lbs."
        document.querySelector(".femaleWeightMax").textContent="Female Max-Weight: "+info[0].max_weight_female+" lbs."
        document.querySelector(".maleWeightMin").textContent="Male Min-Weight: "+info[0].min_weight_male+" lbs."
        document.querySelector(".femaleWeightMin").textContent="Female Min-Weight: "+info[0].min_weight_female+" lbs."
        document.querySelector(".minLife").textContent="Minimum Life-Expectancy: "+info[0].min_life_expectancy+" years"
        document.querySelector(".maxLife").textContent="Maximum Life-Expectancy: "+info[0].max_life_expectancy+" years"

        })
        
    .catch(err => {
        console.log(`error ${err}`)
    })
    })
}