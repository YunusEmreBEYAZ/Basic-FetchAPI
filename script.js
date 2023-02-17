"use strict"

function searchFor(query){
    const url = `https://api.tvmaze.com/search/shows?q=${query}`
    fetch(url)
    //.then(response => response.json()) -- bu durum fetch requesti jsona çevirir ama hata varsa göremezsin. if statement daha mantıklı
    .then((response) => {
        if(response.ok){
            console.log('SUCCESS')
            return response.json();

        } else {

            console.log('Not succesful Fetch')
        }
    })
    .then((jsonData) => {
        const movieName = jsonData.map(element => element.show.name);
        renderResults(movieName);
        document.getElementById('errorMessage').innerHTML = "";
    })
    .catch((error) =>{
        document.getElementById('errorMessage').innerHTML = error;
        renderResults([]);
    })
}

function renderResults(results) {
    const list = document.getElementById('resultList');
    list.innerHTML = '';
    results.forEach(result => {
        const element = document.createElement('li');
        element.innerHTML = result;
        list.appendChild(element)
    });
}
let searchTimer = 0;

const search = function(){

    const searchFieldElement = document.getElementById('searchField');
    searchFieldElement.addEventListener('keyup', (event) => {
        clearTimeout(searchTimer);

        if(searchFieldElement.value.trim().length === 0) {
            return;
        }

        searchTimer = setTimeout(() => {
            searchFor(searchFieldElement.value)            
        }, 300); 
    })
//     searchFieldElement.onkeyup = (event) => {
//         setTimeout(() => {
//             searchFor(searchFieldElement.value)            
//         }, 2000);

// }
}
window.addEventListener('load', search)
