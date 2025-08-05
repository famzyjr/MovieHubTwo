const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');
const container = document.getElementById('movieDetailContainer');
let Api_keys = '1966e9143c28d8e33a6fe2ddf564d571';
async function getMovieDetails(id){
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${Api_keys}`);
    const movie = await res.json();
container.innerHTML =`
 <div class="movie-description">

      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
       <h1 class='name'>${movie.title}</h1>
     <div class='ss'> 
    
      <p class='review'><strong>Overview:</strong> ${movie.overview.slice(0, 500)}</p>
      <p><strong>Release Date:</strong> ${movie.release_date} ;</p>  
      <p><strong>Rating:</strong> ${movie.vote_average} ;</p>
      </div>
      
      
    </div>
  `;
}

getMovieDetails(movieId);