function toggleFavorite(animalId) {
    fetch("/api/favorites", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ animalId: animalId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Favorite updated successfully');
            } else {
                console.error('Error updating favorite:', data.message);
            }
        })
        .catch(error => {
            console.error('Error updating favorite:', error);
        });
}