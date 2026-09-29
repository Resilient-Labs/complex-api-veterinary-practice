

const baseURL = 'https://api.fda.gov/animalandveterinary/event.json'


 


document.getElementById('btn-results').addEventListener('click',getResults)
function getResults(){
let key = ""
const drugName = document.getElementById('drug-name-input').value
let url = `https://api.fda.gov/animalandveterinary/event.json?search=${drugName}&count=reaction.veddra_term_name.exact`
fetch(url)
.then(resp => resp.json())
.then( data => {
let reactionObj = data.results.slice(0,5)
let topRxns = reactionObj.map(reaction => reaction.term)
console.log(topRxns); 
document.getElementById('top-reactions').innerText = topRxns.join(', ')  
let apiMessage = `The patient is taking ${drugName} and has experienced one or more of these reported adverse events: ${topRxns}. The alternative should be used for the same or similar clinical purpose as ${drugName}. Give a vet tech 3 altrnative medications or therapies to research. For each alternative, use the format: Name: medication name. Used for: what it is commonly used for. Consider: one important consideration. Don't use markdown, asterisks, or bullet points. Make response short and easy to read. Do not include a summary or introduction, start immediately with the first alternative. Don't include dosage.`
fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${key}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "openrouter/free",
    "messages": [
      {
        "role": "user",
        "content": apiMessage
      }
    ],
   
  })
})
.then(res =>res.json())
.then(data => {
    console.log(data.choices[0].message.content)
let drugAlts = data.choices[0].message.content 
document.querySelector('#text-alternatives').innerText = drugAlts
}
 )
})
}