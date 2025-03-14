let boton = document.getElementById("boton");
boton.addEventListener("click", function() {
    let title = document.getElementById("movieTitle").value;
    let genre = document.getElementById("movieGenre").value;
    let year = document.getElementById("movieYear").value;
    let rating = document.getElementById("movieRating").value;

    if (title === "" || genre === "" || year === "" || rating === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let movies = localStorage.getItem("movies");

    let moviesArray = movies ? JSON.parse(movies) : [];
    
    moviesArray.push({ title, genre, year, rating });
    localStorage.setItem("movies", JSON.stringify(moviesArray));

    // Limpiar los campos después de agregar la película
    document.getElementById("movieTitle").value = "";
    document.getElementById("movieGenre").value = "";
    document.getElementById("movieYear").value = "";
    document.getElementById("movieRating").value = "";
    console.log(moviesArray);
    // Mostrar mensaje de confirmación
    alert("Película agregada correctamente");

    
});



