document.addEventListener("DOMContentLoaded", () => displayPlants())

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
    card.innerHTML = card.innerHTML + plant.name;

    console.log(card);
    
    document.getElementById('cards').appendChild(card);
};