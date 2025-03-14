document.getElementById("btnBuscar").addEventListener("click", function() {
    let busqueda = document.getElementById("cajaBusqueda").value.toLowerCase().trim();
    let movieList = localStorage.getItem("movies");
    let moviesArray;
    if (movieList) {
        moviesArray = JSON.parse(movieList);
    } else {
        moviesArray = [];
    }


    let filterMovies = moviesArray.filter(movie => movie.title.toLowerCase().includes(busqueda));

    let resultsDiv = document.getElementById("resultadoBusqueda");
    resultsDiv.innerHTML = ""; // Limpiar resultados anteriores

    if (filterMovies.length > 0) {
        filterMovies.forEach(movie => {
            let movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            movieCard.innerHTML = `
                <h2>${movie.title}</h2>
                <p><strong>Género:</strong> ${movie.genre}</p>
                <p><strong>Año:</strong> ${movie.year}</p>
                <p><strong>Calificación:</strong> ${movie.rating}</p>
            `;

            resultsDiv.appendChild(movieCard);
        });
    } else {
        resultsDiv.innerHTML = "<p>No se encontraron películas con ese título.</p>";
    }
});