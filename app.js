const input = document.getElementById("inputMovie");
const buttonMovie = document.getElementById("buttonMovie");
const results = document.getElementById("results");
const results2 = document.getElementById("results2");

console.log(input.value);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    currentPage = 0;
    getMovies();
  }
});

buttonMovie.addEventListener("click", function (event) {
  event.preventDefault();
  currentPage = 0;
  getMovies();
});

let currentPage = 0;

let getMovies = () => {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${input.value}`;
  input.value.length <= 0
    ? (results.innerHTML = `<h3 class="info noData">Please enter a movie name</h3>`)
    : fetch(url)
        .then((response) => response.json())
        .then((data) => {
          document.title = data.results[currentPage].title;
          console.log(data.results);
          data.results.length === 0
            ? (results.innerHTML = `<h3 class="info noData">No movies found</h3>`)
            : (results.innerHTML = `
        <div class="info">
          <a title="Next Movie" class="flechaD" id="flechaD">⪼</a>
          <a title="Previous Movie" class="flechaIz" id="flechaIz">⪻</a>
            <h1 id="movieTitle">${data.results[currentPage].title}</h1>
              <img id="image404" src="https://image.tmdb.org/t/p/w200${data.results[currentPage].poster_path}">
              <p id="voteAverage">${data.results[currentPage].vote_average}/10</p>
          <p id="movieOverview">${data.results[currentPage].overview}</p>
          <p id="releaseDate">${data.results[currentPage].release_date}</p>
            </div>
        `);
          removeArrows(data);
          arrowsChangeMovie();
          changeImg(data);
        })
        .catch((error) => {
          console.error(error);
          results.innerHTML = `<h3 class="info noData">No movies found</h3>`;
        });
};

let removeArrows = (data) => {
  let flechaIz = document.getElementById("flechaIz");
  let flechaD = document.getElementById("flechaD");

  currentPage + 1 === data.results.length
    ? flechaD.classList.add("hidden")
    : flechaD.classList.remove("hidden");

  currentPage === 0
    ? flechaIz.classList.add("hidden")
    : flechaIz.classList.remove("hidden");
};

let arrowsChangeMovie = () => {
  let flechaD = document.getElementById("flechaD");
  let flechaIz = document.getElementById("flechaIz");

  flechaD.addEventListener("click", function () {
    currentPage++;
    getMovies();
  });

  flechaIz.addEventListener("click", function () {
    currentPage--;
    getMovies();
  });
};

let changeImg = (data) => {
  data.results[currentPage].poster_path === null
    ? (document.getElementById("image404").src = "./NotFoundMovieNice.png")
    : data.results[currentPage].poster_path;
};
