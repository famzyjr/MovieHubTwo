const Results = document.getElementById('result');
const Search  = document.getElementById('searchinput')
const MovieDetails = document.getElementById('movieDetails');
const First = document.getElementById('firstSet');

const LoadingIndicator = document.getElementById('loadingIndicator');
const FirstSet = document.getElementById('firstSet');

const ApiKey = '677cef6d';
function setActive(e){
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button
    .classList.remove('active');
    }
    ) 
    e.classList.add('active')
}
Search.addEventListener('input',async ()=>{
const query = Search.value.trim();
LoadingIndicator.style.display = 'block';
if(query.length < 3){
Results.innerHTML = '';
return;
}
try{
const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${ApiKey}`);
const data = await response.json();
if(data.Search){
Results.innerHTML = data.Search.map(items =>(`
<div class='result-item data-id=${data.imbdID}'>
<img  src="${items.Poster}" />(${items.Year})
<div>${items.Title}</div>

</div>
    `)).join('')
}else{
let NotFound = 'Results Not Found';
Results.innerHTML = `<div class='not'>${NotFound}<div>`
}
}catch(err){
    err.log
}finally{
LoadingIndicator.style.display = 'none'
}

})

let Api_keys = '1966e9143c28d8e33a6fe2ddf564d571';
let html = '';

const  Discover = async ()=>{
const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Api_keys}`);
const Movie = await response.json();
console.log(Movie.results);
for( let movie of Movie.results ){
html += `
  <div class="movie-card">
    <img class="movie-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    <h3 class="movie-title"><i class="fa star fa-star-o" style="font-size:20px "></i> ${movie.
popularity
}
  </h3>
    <p class="movie-year">Release: ${movie.release_date}</p>
  </div>
`;

}
FirstSet.innerHTML = html;
}
Discover()

// ${items.title}
// ${items.
// overview}
/* <img  class='s' src="https://image.tmdb.org/t/p/w500${items.poster_path}" alt="${items.title}" /> */