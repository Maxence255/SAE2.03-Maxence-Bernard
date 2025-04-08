import { MovieCard } from "../Movie/script.js";

let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function (category) {
    let HTML = template;
    HTML = HTML.replace("{{categoryName}}", category.name);

    let MovieHTML = MovieCard.format(category.movies || []);
    HTML = HTML.replace("{{Cards}}", MovieHTML);

    return HTML;
};

export { MovieCategory };