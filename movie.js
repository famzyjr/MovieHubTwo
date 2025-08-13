const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');
const container = document.getElementById('movieDetailContainer');
const Loadingindicator = document.getElementById('loadingindicator');
let open  = document.getElementById('open');
let BTN = document.getElementById('btn')
let Closebtn = document.getElementById('closbtn');
let Api_keys = '1966e9143c28d8e33a6fe2ddf564d571';

Loadingindicator.style.display = 'block';
function setActive(e) {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button
      .classList.remove('active');
  }
  )
  e.classList.add('active')
}
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
      <h2 class='review'><strong>Discription:</strong> ${movie.overview.slice(0, 500)}</h2>
      <p><strong>Release Date:</strong> ${movie.release_date} ;</p>  
      <p><strong>Rating:</strong> ${movie.vote_average} ;</p>
      </div>
      
      
    </div>
  `
    } catch (error) {
      let err = 'No Result Found'
      error.log;
      container.innerHTML = `<div class='noResults'><p>😑${err}</p></div>`
    } finally {
      Loadingindicator.style.display = 'none';

    }
  }
  const Sidebar =() =>{
   open.style.display = 'block';
  }
  const close =()=>{
    open.style.display = 'none';
  }
  BTN.onclick =()=> Sidebar()
 Closebtn.onclick =()=> close()
  getMovieDetails(movieId);
}, 3000)




const API_KEY = '1966e9143c28d8e33a6fe2ddf564d571';
const keywordId = 123;  // example keyword ID
const url = `https://api.themoviedb.org/3/keyword/${keywordId}discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data.results); // array of movies tagged with that keyword
  })
  .catch(err => console.error(err));
