function createAnimalCard(animal) {
    const animalCard = document.createElement('div');
    animalCard.classList.add('animal-card');
  
    const animalImage = document.createElement('img');
    animalImage.src = animal.photoLocation;
    animalImage.alt = animal.name;
    animalImage.classList.add('animalImage'); // Apply specific styling to the image
    animalCard.appendChild(animalImage);
  
    const animalName = document.createElement('h2');
    animalName.textContent = animal.name;
    animalName.classList.add('animalName'); // Apply specific styling to the name
    animalCard.appendChild(animalName);
  
    const animalDescription = document.createElement('p');
    animalDescription.textContent = animal.description;
    animalDescription.classList.add('animalDescription'); // Apply specific styling to the description
    animalCard.appendChild(animalDescription);
  
    return animalCard;
  }
  
  function getAnimals() {
<<<<<<< HEAD
    fetch("/api/animal")
=======
    fetch('/api/animal')
>>>>>>> 9b210cbfec80158019c5b216a6768fd0f8712dfd
      .then(response => response.json())
      .then(animals => {
        const animalContainer = document.querySelector('#animal-container');
        animals.forEach(animal => {
          const animalCard = createAnimalCard(animal);
          animalContainer.appendChild(animalCard);
        });
      })
      .catch(error => {
        console.error('Error fetching animals:', error);
      });
  }
<<<<<<< HEAD

=======
  
  // Call getAnimals to fetch and display animal data
>>>>>>> 9b210cbfec80158019c5b216a6768fd0f8712dfd
  getAnimals();