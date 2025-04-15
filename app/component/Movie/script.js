let templateFile = await fetch("./component/Movie/template.html");

let template = await templateFile.text();

let templateFile2 = await fetch("./component/Movie/templateCard.html");

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
        card = card.replace("{{handlerFavoris}}", `C.handlerFavoris(${c.id})`);
        card = card.replace(
            "{{handlerDelete}}",`C.handlerdeleteFavoris(${c.id})`
          );
        cardsHTML += card;
    }
    html = html.replace("{{cards}}", cardsHTML);
    return html;
};

export { MovieCard };
