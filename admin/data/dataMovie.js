
// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "../";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataMovie = {};

 /**
     * Fetches data from the server based on the specified day.
     * @param {string} week
     * @param {string} day - The day parameter to be sent to the server.
     * @returns The response from the server.
     * 
     * DataMovie.request permet de récupérer des données depuis le serveur.
     * Elle prend en paramètre un jour (lundi mardi...) de la semaine et 
     * renvoie les données contenues dans la réponse du serveur (data).
     */
DataMovie.request = async function(week,day){
    // fetch permet d'envoyer une requête HTTP à l'URL spécifiée. 
    // L'URL est construite en concaténant HOST_URL à "/server/script.php?direction=" et la valeur de la variable dir. 
    // L'URL finale dépend de la valeur de HOST_URL et de dir.
    let answer = await fetch(HOST_URL + "/server/script.php?todo=read&jour=" + day  + "&semaine=" + week);
    // answer est la réponse du serveur à la requête fetch.
    // On utilise ensuite la méthode json() pour extraire de cette réponse les données au format JSON.
    // Ces données (data) sont automatiquement converties en objet JavaScript.
    let data = await answer.json();
    // Enfin, on retourne ces données.
    return data;
}

/** DataMovie.update
 * 
 * Prend en paramètre un objet FormData (données de formulaire) à envoyer au serveur.
 * Ces données sont incluses dans une requête HTTP en méthode POST.
 * Une requête POST au lieu de GET n'affiche pas les données dans l'URL (plus discret).
 * Les données sont placées dans le corps (body) de la requête HTTP. Elles restent visibles mais
 * en utilisant les outils de développement du navigateur (Network > Payload).
 * La requête comprend aussi un paramètre todo valant update pour indiquer au serveur qu'il
 * s'agit d'une mise à jour (car on a codé le serveur pour qu'il sache quoi faire en fonction de la valeur de todo).
 * 
 * @param {*} fdata un objet FormData contenant les données du formulaire à envoyer au serveur.
 * @returns la réponse du serveur.
 */
DataMovie.update = async function (fdata) {
    // fetch possède un deuxième paramètre (optionnel) qui est un objet de configuration de la requête HTTP:
    //  - method : la méthode HTTP à utiliser (GET, POST...)
    //  - body : les données à envoyer au serveur (sous forme d'objet FormData ou bien d'une chaîne de caractères, par exempe JSON)
    let config = {
        method: "POST", // méthode HTTP à utiliser
        body: fdata // données à envoyer sous forme d'objet FormData
    };
    let answer = await fetch(HOST_URL + "/server/script.php?todo=updatemovie", config);
    let data = await answer.json();
    return data;
}


/** DataMovie.delete
 * 
 *  fait une requête HTTP au serveur pour demander la suppression d'un Movie
 *  @param {*} fdata un objet FormData contenant les données du formulaire à envoyer au serveur (semaine et jour)
 *  @returns la réponse du serveur.
*/
DataMovie.delete = async function (fdata) {
    let config = {
        method: "POST",
        body: fdata
    };
   
    let answer = await fetch(HOST_URL + "/server/script.php?todo=delete", config);
    let data = await answer.json();
    return data;
}

DataMovie.rechercherMovies = async function (searchQuery) {
  let response = await fetch(
    `${HOST_URL}/server/script.php?todo=rechercherMovies&query=${encodeURIComponent(
      searchQuery
    )}`
  );

  console.log("Réponse brute du serveur :", response);

  if (!response.ok) {
    console.error("Erreur HTTP :", response.status);
    return [];
  }

  let data = await response.json();
  console.log("Données JSON :", data);
  return data;
};

export {DataMovie};




/* Rappel : async / await ?
    
   Il y a des instructions qui prennent du temps sans qu'on puisse prédire combien.
   fetch (et answer.json() ) en font partie.
   Il n'est en effet pas possible de savoir combien de temps le serveur prendra à nous répondre.
   Peut-être même qu'il est en panne et ne répondra pas du tout !
   Le mot clé await permet de dire à javascript qu'il faut ATTENDRE la réponse du serveur avant de 
   poursuivre l'exécution du code (sinon on va vouloir lire les données avant de les avoir reçues).
   Et pour pouvoir utiliser await, il faut ajouter le mot clé async à la fonction.

*/
