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

    

    const likeButton = document.createElement('i');
    likeButton.classList.add('fas', 'fa-heart', 'likeButton');
    if (animal.isFavorite) {
        likeButton.classList.add('liked'); // Add 'liked' class if the animal is a favorite
    }
    likeButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from triggering on the animalCard
        toggleFavorite(animal.id)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Toggle 'liked' class based on the new favorite status
                    likeButton.classList.toggle('liked');
                } else {
                    console.error('Error updating favorite:', data.message);
                }
            })
            .catch(error => {
                console.error('Error updating favorite:', error);
            });
    });
    animalCard.appendChild(likeButton);
  
    return animalCard;
  }
  
  function getAnimals() {
    fetch("/api/animal")
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
  getAnimals();
