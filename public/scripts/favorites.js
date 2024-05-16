function toggleFavorite(animalId) {
    return fetch("/api/favorites", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ animalId: animalId })
    });
}