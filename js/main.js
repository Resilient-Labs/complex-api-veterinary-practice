//Goal: Build a simple front-end app that uses data returned from one api to make a request to another api to create something that would be beneficial to a veterinary practice.

//App Display page
class Display { 
    constructor() { 
        this.status = document.getElementById("status"); 
        this.breedSection = document.getElementById("breed-section");
        this.name = document.getElementById("breed-name");
        this.description = document.getElementById("breed-description");
        this.medicationsList = document.getElementById("medications-list");
      
    }
    showMessage(message) { 
        this.status.textContent = message; 
    }


//
showBreed(breed) { 
    const info = breed.attributes; 

    this.name.textContent = info.name; 
    this.description.textContent = info.description; 
}

showMedications(medications) { 
    this.medicationsList.innerHTML = ""; 

    medications.forEach(medications => { 
        const item = document.createElement("li"); 
        item.textContent = medications.term + " (" + medications.count + " reports)"; 
        this.medicationsList.appendChild(item);

    }); 

    }
}

//FDA API - using the breed name from DOG API 
class MedicationAPI { 
    constructor(display) { 
        this.display = display;
    }

    search(breedName) { 
        const firstWord = breedName.split(" ")[0].toLowerCase(); 
        
        fetch("https://api.fda.gov/animalandveterinary/event.json?search=animal.breed.breed_component:" + firstWord + "&count=drug.active_ingredients.name.exact&limit=5")
        .then(res => res.json())
        .then(data => { 
            if (!data.results) { 
                this.display.showMedications([]); 
                this.display.showMessage("Breed found. No FDA reports were found");
                return
            }

            this.display.showMedications(data.results); 
            this.display.showMessage("Breed found. Check FDA cited medications below.");
        })

        .catch(() => this.display.showMessage("Could not connect to API."));

    }
}

//Dog Breed API 
class BreedAPI { 
    constructor(display, medicationAPI) { 
        this.display = display; 
        this.medicationAPI = medicationAPI;
    }

    search(searchTerm) { 
        this.display.showMessage("Searching...");        

        fetch("https://dogapi.dog/api/v2/breeds")
        .then(res => res.json())
        .then(data => { 
           const breed = data.data.find(dog => dog.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())); 

           if (!breed) { 
            this.display.showMessage("Breed not found."); 
            return; 
            }

            this.display.showBreed(breed)
            this.display.showMessage("Breed found.Checking FDA reports..."); 

            //pass the breed name from API #1 to API #2
            this.medicationAPI.search(breed.attributes.name);
        })

        .catch(() => this.display.showMessage("Could not connect."));

    }
} 

class App { 
    constructor() { 
        this.display = new Display(); 
        this.medicationAPI = new MedicationAPI(this.display); 
        this.breedAPI = new BreedAPI(this.display, this.medicationAPI); 
        this.input = document.getElementById("search-input"); 

        document.getElementById("search-button").addEventListener("click", () => 
            this.search()); 

    }
    search() { 
        const searchTerm = this.input.value.trim();

        if (searchTerm === "") { 
            this.display.showMessage("Please enter a dog breed.");
            return;
        }

        this.breedAPI.search(searchTerm);

    }
}   

new App();



