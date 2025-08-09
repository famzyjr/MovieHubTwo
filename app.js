const Results = document.getElementById('result');
const Search = document.getElementById('searchinput')
const MovieDetails = document.getElementById('movieDetails');
const First = document.getElementById('firstSet');
const LoadingIndicator = document.getElementById('loadingIndicator');
const FirstSet = document.getElementById('firstSet');

const ApiKey = '677cef6d';
function setActive(e) {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button
      .classList.remove('active');
  }
  )
  e.classList.add('active')
}
Search.addEventListener('input', async () => {
  const query = Search.value.trim();
  LoadingIndicator.style.display = 'block';
  if (query.length < 3) {
    Results.innerHTML = '';
    return;
  }
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${ApiKey}`);
    const data = await response.json();
    if (data.Search) {
      Results.innerHTML = data.Search.map(items => (`
<div class='result-item data-id=${data.imbdID}'>
<img  src="${items.Poster}" />(${items.Year})
<div>${items.Title}</div>

</div>
    `)).join('')
    } else {
      let NotFound = 'Results Not Found';
      Results.innerHTML = `<div class='not'>${NotFound}<div>`
    }
  } catch (err) {
    err.log
  } finally {
    LoadingIndicator.style.display = 'block'
  }

})



function goToDetails(id) {
  window.location.href = `movie.html?id=${id}`;
}

function bookmarkMovie(id, title, posterPath) {
  const saved = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
  const exists = saved.find(movie => movie.id === id);
  if (exists) {
    alert('Already bookmarked!');
    return;
  }
  saved.push({ id, title, posterPath });
  localStorage.setItem('bookmarkedMovies', JSON.stringify(saved));
  alert(`${title} bookmarked!`);
}
const loAdingindicator = document.getElementById('load')
let ApIkeys = '1966e9143c28d8e33a6fe2ddf564d571';

const Discover = async () => {
 
  try { 
    loAdingindicator.style.display = 'block';
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${ApIkeys}`);
    const data = await response.json();
    console.log(data);
    
    let html = '';

    for (let movie of data.results) {
      const safeTitle = movie.title.replace(/'/g, "\\'");
      html += `
        <div class="movie-card">
          <img class="movie-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" onclick="goToDetails(${movie.id})" />
          <p class='release'>Release: ${movie.release_date}</p>
          <button onclick="bookmarkMovie(${movie.id}, '${safeTitle}', '${movie.poster_path}')">🔖 Bookmark</button>
        </div>
      `;
    }

    FirstSet.innerHTML = html;
  } catch (error) {
    console.error(error);
  } finally {
    loAdingindicator.style.display = 'none';
  }
};

setTimeout(() => {
  Discover() 
}, 2000);
