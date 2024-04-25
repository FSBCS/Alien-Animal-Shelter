function createAnimalCard(animal) {
    const animalCard = document.createElement('div');
    animalCard.classList.add('animal-card');

    const animalImage = document.createElement('img');
    animalImage.src = animal.photoLocation;
    animalImage.alt = animal.name;
    animalCard.appendChild(animalImage);

    const animalName = document.createElement('h2');
    animalName.textContent = animal.name;
    animalCard.appendChild(animalName);

    const animalDescription = document.createElement('p');
    animalDescription.textContent = animal.description;
    animalCard.appendChild(animalDescription);

    const animalSpecies = document.createElement('p');
    animalSpecies.textContent = animal.species;
    animalCard.appendChild(animalSpecies);

    return animalCard;
}

function getAnimals() {
    fetch('api/animal')
        .then(response => response.json())
        .then(animals => {
            const animalContainer = document.querySelector('.animal-container');
            animals.forEach(animal => {
                const animalCard = createAnimalCard(animal);
                animalContainer.appendChild(animalCard);
            });
        });
}

getAnimals();
