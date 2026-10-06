// Build a simple front-end app that uses data returned from one api to make a request to another api to create something that would be beneficial to a veterinary practice.

document.querySelector('button').addEventListener('click', doggy )

function doggy(){
    
        const doggy = document.querySelector('input').value
        const url =`https://dogapi.dog/api/v2/breeds`
        // console.log(inputVal)

//         const response = await fetch(
//         "https://dogapi.dog/api/v2/breeds"
// );
//         const body = await response.json();

// console.log(body);
// }




        fetch(url)
        .then(res => res.json())
        .then((bark) => {
            console.log(bark)
            const breed = bark.data[0].attributes
            document.querySelector('h1'). innerHTML = 
            document.querySelector('.p').innerHTML = breed.description

            // document.querySelector('h1').textContent = bark.data.attributes.name
            // document.querySelector('.h2').textContent = bark.data.attributes.origin
            // document.querySelector('.p').textContent = bark.data.attributes.description

        })
        .catch(err => {
            console.log(`error ${err}`)
        })

    }

    // function dogo(){
    //     const doggy = document.querySelector('input').value
    //     const url = ` const doggy = document.querySelector('input').value`
    // }
