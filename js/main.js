document.querySelector('button').addEventListener('click', getDosage)

const drugsInfo = {
    diazepam: {name: "diazepam", dosageMgkg: 0.5, concentratonMgMl: 5}
}

function getDosage(){
    const drugKey = document.querySelector('select').value
    const drug =  drugsInfo[drugKey]
    console.log(drug)
    let amount = document.querySelector('input').value

    let url = `https://api.api-ninjas.com/v1/unitconversion?amount=${amount}&unit=pound`

    fetch(url, { headers: {'X-Api-Key': '7BZi7vPVAOdSGfhma3oPTess5TA71rwyQ8ymppTN'}


    })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            const weightKg = data.conversions.kilogram
            console.log(weightKg)
            
            const dosage = weightKg * drug.dosageMgkg
            console.log(dosage)
            const concentration = dosage/ drug.concentratonMgMl
            console.log(concentration )

            const minWeight = (weightKg-3).toFixed(1)
            const maxWeight = (weightKg+3).toFixed(1)



            let url_1 = `https://api.fda.gov/animalandveterinary/event.json?search=drug.brand_name:"${drug.name}"+AND+animal.weight.min_value:[${minWeight}+TO+${weightKg+3}.&limit=1`
            
          fetch(url_1)
            .then(res => {
                if(res.status === 404){
                     document.querySelector('h2').innerHTML = "no matching reports found"
                    console.log("no matching reports found")
                     document.querySelector('h3').textContent = `${data.conversions.kilogram} kg`

                    return null; 
                 }
                return res.json()
                })
            .then(data =>{
             if (data) {
            console.log(data)  
            document.querySelector('h2').textContent = `Dosage: ${concentration} ml`
            document.querySelector('h3').textContent = `this is a  case  with a ${weightKg}kg pet.` 

            }

        })
           

})

}
