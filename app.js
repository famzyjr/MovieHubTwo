const ApiKey = '1966e9143c28d8e33a6fe2ddf564d571';
const FirstSet = document.getElementById('firstSet');
const loAdingindicator = document.getElementById('loAdingindicator');

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

const Discover = async () => {
  // loAdingindicator.style.display = 'block';
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}`);
    const data = await response.json();
    let html = '';

    for (let movie of data.results) {
      const safeTitle = movie.title.replace(/'/g, "\\'");
      html += `
        <div class="movie-card">
          <img class="movie-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" onclick="goToDetails(${movie.id})" />
          <h3>${movie.title}</h3>
          <p>Release: ${movie.release_date}</p>
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
}, 3000);
