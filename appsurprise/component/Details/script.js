let templateFile = await fetch("./component/Details/template.html");
let template = await templateFile.text();

let detailsMovie = {};

detailsMovie.format = function (obj) {
  let html = template;
  html=html.replace("{{name}}", obj.name)
  html=html.replace("{{image}}", obj.image)
  html=html.replace("{{description}}", obj.description)
  html=html.replace("{{duration}}", obj.length)
  html=html.replace("{{release}}", obj.year)
  html=html.replace("{{director}}", obj.director)
  html=html.replace("{{categorie}}", obj.category)
  html=html.replace("{{age}}", obj.min_age)
  html=html.replace("{{trailer}}", obj.trailer)
  return html;
};


export { detailsMovie };