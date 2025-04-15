import { detailsMovie } from "../component/Details/script";

// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~bernard196/SAE2.03-Maxence-Bernard"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataMovies = {};
let DataMovie = {};


DataMovies.requestMovies = async function () {

    let answer = await fetch(HOST_URL + "/server/script.php?todo=readmovies");

    let data = await answer.json();

    return data;
};
DataMovies.requestMovieDetails = async function (movieId) {
    let url = HOST_URL + `/server/script.php?todo=readMovieDetail&id=${movieId}`;
    console.log("URL générée :", url); // Vérifiez l'URL générée
    let answer = await fetch(url);
    let movieDetails = await answer.json();
    return movieDetails;
};
DataMovie.addFavoris = async function (id, profileId) {
    console.log(`Requête envoyée : movieId=${id}, profileId=${profileId}`);
    let response = await fetch(
      `${HOST_URL}/server/script.php?todo=addFavoris&movieId=${id}&profileId=${profileId}`
    );
    let data = await response.json();
    console.log("Réponse du serveur :", data);
    return data;
  };
  
  DataMovie.getFavoris = async function (profileId) {
    let response = await fetch(
      `${HOST_URL}/server/script.php?todo=getFavoris&profileId=${profileId}`
    );
    let data = await response.json();
    return data;
  };
  DataMovie.deleteFavoris = async function (id, profileId) {
    console.log(`Requête envoyée : movieId=${id}, profileId=${profileId}`);
    let response = await fetch(
      `${HOST_URL}/server/script.php?todo=deleteFavoris&movieId=${id}&profileId=${profileId}`
    );
    let data = await response.json();
    console.log("Réponse du serveur :", data);
    return data;
  };
DataMovies.requestMoviesCategory = async function () {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readMoviesCategory");
    let categories = await answer.json();
    return categories;
};
export { DataMovies };
export { DataMovie };