// GLOBAL CONSTANTS
const api_key = "f701797cdb03e55f69ad418eb69d1668";
const baseUrl = "https://api.themoviedb.org/3/";
let pageNum = 1;

//GLOBAL CONSTANTS FOR DOM
const form = document.querySelector(".form");
const submit = document.querySelector("#submit");
const movieGrid = document.querySelector("#movies-grid");
const movieCard = document.querySelector(".movie-card");
const loadMoreEl = document.querySelector("#load-more-movies-btn");
const closeEl = document.querySelector("#close-search-btn");
const nowPlayingEl = document.querySelector(".nowplaying");
const searchInputEl = document.querySelector("#search-input");
const popupEl = document.querySelector(".popupdiv");
//const scrollBtn = document.querySelector("scroll-to-top-btn");

// SAVE SEARCH WORD 
let searchWord = "";

//ALL ADD EVENT LISTENERS
form.addEventListener("submit", getResults);
loadMoreEl.addEventListener("click", loadMore);
closeEl.addEventListener("click", initialLoad);
//scrollBtn.addEventListener("click", scrollToTop);

// initial Screen with now playing movies
initialLoad();

// GET RESULTS FOR "NOW PLAYING" MOVIES
async function initialLoad() {
   searchInputEl.value = "";
   closeEl.style.display = "none";
   //scrollBtn.style.display="none";
   loadMoreEl.style.display = "none";
   nowPlayingEl.style.display = "block";
   movieGrid.innerHTML = "";
   searchWord = "";
   let apiUrl = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-04-09&primary_release_date.lte=2022-06-09&api_key=f701797cdb03e55f69ad418eb69d1668";
   results(apiUrl);
}

async function results(apiUrl) {
   let response = await fetch(apiUrl);
   let responseData = await response.json();
   generateResults(responseData);
}

// GET RESULTS FOR SEARCHBAR
async function getResults (evt) {
   closeEl.style.display = "block";
   loadMoreEl.style.display = "block";
   nowPlayingEl.style.display = "none";
   evt.preventDefault();
   if (evt.target.searchbar != null) {
      movieGrid.innerHTML = "";
      searchWord = evt.target.searchbar.value.toLowerCase();
   }
   let apiUrl = "https://api.themoviedb.org/3/search/movie?page=" + pageNum + "&api_key=f701797cdb03e55f69ad418eb69d1668" + "&query=" + searchWord;
   results(apiUrl);
}
// const learnMoreEl = document.querySelector("#learnmorediv");

// TAKES ALL DATA TO INJECT THE MOVIES INTO HTML
function generateResults(moviedata) {  
   moviedata.results.forEach(function(result){
      let pic = "";
      if (result.poster_path == null) {
         pic = "movienotposter.png";
      } else {
         pic = "https://image.tmdb.org/t/p/w500/" + result.poster_path;
      }
      movieGrid.innerHTML += `
         <div class="movie-card" onclick="learnMoreOpen(${result.id})" >
            <img class="movie-poster" src="${pic}" ></img> 
            <div class="rating">
               <img class="star" src="star.png"></img>
               <h6 class="movie-votes">${result.vote_average}</h6>
            </div>
            <h4 class="movie-title">${result.title}</h4>
         </div>
      `
   })
}

// LOAD MORE BUTTON - NEW 20 MOVIES DISPLAYED
function loadMore(evt) {
   pageNum++;
   getResults(evt);
}

async function learnMoreOpen(id) {
   var response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
   var responseData = await response.json();
   let element = document.getElementById("popupdiv");
   element.innerHTML += `
      <div class="popup">
         <div onclick="learnMoreClose()" class="CloseIcon">&#10006;</div>
         <img class="popupimg" src="https://image.tmdb.org/t/p/w500/${responseData.backdrop_path}" ></img>
         <div class="movie-titles">
            <h3>${responseData.title} |</h3>
            <img class="starTitle" src="star.png"></img>
            <h3>${responseData.vote_average} | </h3>
            <h3 class="date"> ${responseData.release_date}</h3>
         </div>
         <p>${responseData.overview}</p>
      </div>   
   `
   element.style.display = "block";
 }

 function learnMoreClose() {
   let element = document.getElementById("popupdiv");
   element.innerHTML = "";
   element.style.display = "none";
 }


