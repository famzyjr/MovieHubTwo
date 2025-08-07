const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');
const container = document.getElementById('movieDetailContainer');
const Loadingindicator = document.getElementById('loadingindicator');
let Api_keys = '1966e9143c28d8e33a6fe2ddf564d571';

Loadingindicator.style.display = 'block';
setTimeout(() => {

  async function getMovieDetails(id) {
    try {
      Loadingindicator.style.display = 'block'
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${Api_keys}`);
      const movie = await res.json();
      container.innerHTML = `
 <div class="movie-description">

      <img class='m' src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    
     <div class='ff'> 
     <h1 class='name'>${movie.title}</h1>
      <p class='review'><strong>Overview:</strong> ${movie.overview.slice(0, 500)}</p>
      <p><strong>Release Date:</strong> ${movie.release_date} ;</p>  
      <p><strong>Rating:</strong> ${movie.vote_average} ;</p>
      </div>
      
      
    </div>
  `;
    } catch (error) {
      error.log;
    } finally {
      Loadingindicator.style.display = 'none';

    }
  }
  getMovieDetails(movieId);
}, 3000)


