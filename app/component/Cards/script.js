let templateFile = await fetch("./component/Cards/template.html");
let template = await templateFile.text();

let Cards = {};

Cards.format = function (hAbout, hHome) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);
  return html;
};

export { Cards };
