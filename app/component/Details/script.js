let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let detailsMovie = {};

detailsMovie.format = function (obj) {
  let html = template;
  html=html.replace("{{name}}", obj.name)
  html=html.replace("{{image}}", obj.image)
  html=html.replace("{{description}}", obj.description)
  html=html.replace("{{duration}}", obj.duration)
  html=html.replace("{{release}}", obj.release)
  html=html.replace("{{director}}", obj.director)
  html=html.replace("{{categorie}}", obj.categorie)
  html=html.replace("{{age}}", obj.age)
  html=html.replace("{{trailer}}", obj.trailer)
  return html;
};


export { detailsMovie };

async function showDetails(movieId) {
  try {
      // Effectue une requête pour récupérer les détails du film
      const response = await fetch(`https://mmi.unilim.fr/~bernard196/SAE2.03-Maxence-Bernard/server/script.php?todo=getmovie&id=${movieId}`);
      const data = await response.json();

      // Utilise detailsMovie.format pour générer le HTML
      const html = detailsMovie.format(data);

      // Remplace le contenu principal par la nouvelle template
      const container = document.getElementById('main-container'); // Conteneur principal
      container.innerHTML = html;
  } catch (error) {
      console.error('Erreur lors de la récupération des détails du film :', error);
  }
}