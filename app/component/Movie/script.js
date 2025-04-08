let templateFile = await fetch("./component/Movie/template.html");
if (!templateFile.ok) {
  console.error("Erreur lors du chargement de template.html :", templateFile.status);
}
let template = await templateFile.text();

let templateFile2 = await fetch("./component/Movie/templateCard.html");
if (!templateFile2.ok) {
  console.error("Erreur lors du chargement de templateCard.html :", templateFile2.status);
}
let templateCards = await templateFile2.text();

let MovieCard = {};

MovieCard.format = function (obj) {
    let html = template;
    let cardsHTML = "";
    for (let c of obj) {
        let card = templateCards;
        card = card.replace("{{image}}", c.image);
        card = card.replace("{{name}}", c.name);
        card = card.replace("{{onclick}}", `C.handlerDetail(${c.id})`);
        cardsHTML += card;
    }
    html = html.replace("{{cards}}", cardsHTML);
    return html;
};

export { MovieCard };
