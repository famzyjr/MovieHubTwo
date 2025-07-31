const Results = document.getElementById('result');
const Search  = document.getElementById('searchinput')
const MovieDetails = document.getElementById('movieDetails');
const ApiKey = '677cef6d';

Search.addEventListener('input',async ()=>{
const query = Search.value.trim();
if(query.length < 3){
Results.innerHTML = '';
return;
}
const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${ApiKey}`);
const data = await response.json();
if(data.Search){
Results.innerHTML = data.Search.map(items =>(`
<div class='result-item data-id=${data.imbdID}'>
<img src="${items.Poster}" />(${items.Year})
<div>${items.Title}</div>

</div>
    `)).join('')
}else{
let NotFound = 'Results Not Found';
Results.innerHTML = `<div class='not'>${NotFound}<div>`
}

})
console.log('nake');

// const names = async(query)=>{
//  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${ApiKey}`);
// const data = await res.json();
// console.log(data);
// }

// names('lord')















function setActive(e){
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button
    .classList.remove('active');
    }
    ) 
    e.classList.add('active')
    style.width = '00px'
}