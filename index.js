document.addEventListener("DOMContentLoaded", () => {

displayPlants()
addPlantFormSubmitListener()

})

function displayPlants() {
    fetch('http://localhost:3000/plants')
        .then((resp) => resp.json())
        .then((plants) => plants.forEach(plant => renderPlant(plant)));
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
     <h4>☀️${plant.sunlight}</h4></div>`;
    
    document.getElementById('cards').appendChild(card);
};

function addPlantFormSubmitListener() {
    const plantForm = document.getElementById("plant-form");

    plantForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewPlant();
    })
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

    fetch("http://localhost:3000/plants", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlant)
    })


    renderPlant(newPlant);
}