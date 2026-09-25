
 const placeName = document.querySelector("#placeState")
 const temp = document.querySelector("#temp")
 const statusOfTemp = document.querySelector("#status")
 const descriptionContainer = document.querySelector("#description")
 
const vetContent = document.querySelector(".vet-content")

// get the input
const zipInput = document.querySelector("#zipCode")

// button to trigger event
document.querySelector("button").addEventListener("click",getMeWalkReport)


// status array for the pets

const statusArray=[
    "Hot pavement risk", 
    "Safe for walks" , 
    "keep it short",
    "Too-cold"
]
// use my first api to pass my zip code and get lat and long

function getMeWalkReport(){
    const zip_code = zipInput.value

    const url = `http://api.zippopotam.us/us/${zip_code}`

    fetch(url)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        const {latitude,longitude , ['place name']:name, ['state abbreviation']:state} = data.places[0]

    // pass latitude and longitude to the getTemperature
        getTemperature(latitude,longitude)

       placeName.textContent = name + "," + state
        console.log(latitude,longitude)
    })

}

// use my data from the first api(lat and long) and pass it as param to the second api
function getTemperature(lat,long){

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,temperature_2m_min`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        const {time,temperature_2m,temperature_2m_min} = data.current

        // convert it to far
        const tempInFahranheit = Number((temperature_2m * 1.8 + 32).toFixed(1))
        const tempColdInFahranheit = Number((temperature_2m_min * 1.8 + 32).toFixed(1))
        
        temp.textContent = `${tempInFahranheit}°F`
        console.log(time,tempInFahranheit)

        console.log(data)
        getStatus(tempInFahranheit,tempColdInFahranheit)
    })
}

// Below 32°F	Too cold. Keep walks short, and consider a coat for small or short-haired dogs.
// 32–75°F	Safe for normal walks.
// 76–85°F	Warm. Keep walks shorter, and bring water.
// Above 85°F	Hot pavement risk. Walk early morning or even

// get status based on the temperature
function getStatus(temperature,temperatureCold){
    if(temperature>85){
    statusOfTemp.textContent = statusArray[0]
    descriptionContainer.textContent = `Its ${temperature}°F today. Hot pavement risk. Walk early morning or evening, and stay on grass.`
    vetContent.classList.add("hot")
    } 

    else if(temperature>=76 && temperature<=85){
    statusOfTemp.textContent = statusArray[1]
    descriptionContainer.textContent = `Its ${temperature}°F today. Keep dog walks shorter and bring water for your dog.`
      vetContent.classList.add("keep-it-short")
    } 
    else if(temperature>=32 && temperature<=75){
    statusOfTemp.textContent = statusArray[2]
    descriptionContainer.textContent = `Its ${temperature}°F today. Safe for normal walks.`
      vetContent.classList.add("safe")
    } 
    else{
    statusOfTemp.textContent = statusArray[3]
    descriptionContainer.textContent = `Its ${temperatureCold}°F today. Too cold. Keep walks short, and consider a coat for small or short-haired dogs.`
      vetContent.classList.add("tooCold")
    }

}