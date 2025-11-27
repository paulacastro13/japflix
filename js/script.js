let pelisTodas = [];
const api = "https://japceibal.github.io/japflix_api/movies-data.json";

function estrellasMostrar(vote_average) {
    const estrellas = Math.round(vote_average / 2);
    let html = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= estrellas) {
            html += `<span class="fa fa-star checked"></span>`;
        } else {
            html += `<span class="fa fa-star"></span>`;
        }
    }
    return html;
}

fetch(api)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar las películas");
        }
        return response.json();
    })
    .then(data => {
        pelisTodas = data;
    })
    .catch(error => {
        console.error("Error al cargar las películas:", error);
    });

const campoBusqueda = document.getElementById("inputBuscar");
const buscar = document.getElementById("btnBuscar");
const lista = document.getElementById("lista");

buscar.addEventListener("click", function () {
    const texto = campoBusqueda.value.trim().toLowerCase();
    if (texto === "") {
        lista.innerHTML = "";
        lista.innerHTML = `
        <li class="list-group-item bg-secondary text-white">
        Escribe el título de la película, género, eslogan o resúmen para iniciar la búsqueda.
        </li>`;
        return;
    };

    const filtradas = pelisTodas.filter(peli =>
        peli.title.toLowerCase().includes(texto) ||
        peli.genres.join(" ").toLowerCase().includes(texto) ||
        peli.tagline.toLowerCase().includes(texto) ||
        peli.overview.toLowerCase().includes(texto)
    );

    lista.innerHTML = "";

    if (filtradas.length > 0) {
        filtradas.forEach(peli => {
            const li = document.createElement("li");
            li.className = "list-group-item bg-dark text-white border-secondary";
            li.innerHTML = `
        <h5>${peli.title}</h5>
        <em>${peli.tagline}</em>
        <div>${estrellasMostrar(peli.vote_average)}</div>`;
            lista.appendChild(li);
        });
    } else {
        lista.innerHTML = `
      <li class="list-group-item bg-secondary text-white">
        No se encontraron resultados.
      </li>`;
    }
});