import { MovieCard } from "../Movie/script.js";

let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function (category) {
    let categoryHtml = template;
    categoryHtml = categoryHtml.replace("{{categoryName}}", category.name);

    let moviesListHtml = MovieCard.format(category.movies || []);
    categoryHtml = categoryHtml.replace("{{Cards}}", moviesListHtml);

    return categoryHtml;
};


export { MovieCategory };