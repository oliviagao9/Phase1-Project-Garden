let plantList = [];

document.addEventListener("DOMContentLoaded", () => {

displayPlants()
addPlantFormSubmitListener()
addSearchListener()

})

function displayPlants() {
    fetch('http://localhost:3000/plants')
        .then((resp) => resp.json())
        .then((plants) => {
            return plants.forEach(plant =>  {
                plantList.push(plant);
                return renderPlant(plant);
        })});
}

function renderPlant(plant) {

    let card = document.createElement('li');
    card.className = 'card'
    let img = document.createElement('img');
    img.src = plant.image;
    card.appendChild(img);

    card.innerHTML = card.innerHTML +
        `<div class="container"> 
            <h3>${plant.name}</h3> 
            <h4>☀️${plant.sunlight}</h4>
        </div>`;

    document.getElementById('cards').appendChild(card);
};


function addPlantFormSubmitListener() {
    const plantForm = document.querySelector("form");
    plantForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewPlant();
        plantForm.reset();
    })
}

function resetPlantCardDom() {
    document.getElementById('cards').innerHTML = "";
}

function addSearchListener() {
    const searchInput = document.getElementById("searchBar");

    searchInput.addEventListener("keyup", (event) => {
        let searchString = event.target.value;

        if (searchString == "") {
            resetPlantCardDom() 
            return plantList.forEach(plant => renderPlant(plant));
        }

        let filteredPlant = plantList.filter( plant => {

            let includedPlant = plant.name.toLowerCase()
                    .includes(searchString.toLowerCase())   

            return includedPlant;
            
        })

        resetPlantCardDom();
        filteredPlant.forEach(plant => renderPlant(plant));
    });
}


function addNewPlant() {
    const newName = document.getElementById("new-name").value;
    const newImage = document.getElementById("new-image").value;
    const newSunlight = document.getElementById("new-sunlight").value;

    const newPlant = {
        "name": newName,
        "image": newImage,
        "sunlight": newSunlight
    }

    fetch('http://localhost:3000/plants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newPlant)
    })

    plantList.push(newPlant);

    renderPlant(newPlant);
}

