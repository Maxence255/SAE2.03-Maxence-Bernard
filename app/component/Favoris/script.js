let templateFile = await fetch("./component/Favoris/template.html");
let template = await templateFile.text();

let Favoris = {};

Favoris.format = function (obj) {
    let html = template;
    html=html.replace("{{card}}", obj.card)
    return html;
};

export { Favoris };
