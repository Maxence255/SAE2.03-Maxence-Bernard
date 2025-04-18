let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hAbout, profiles) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);
  html = html.replace("{{onclick}}", "C.handlerFavorisList()");

  let options = `<option value="">Choisir un profil</option>`; // Option par défaut
  for (let i = 0; i < profiles.length; i++) {
    let p = profiles[i];
    options += `<option value="${p.id}" data-img="${p.avatar}" data-age="${p.date_naissance}">${p.name}</option>`;
  }

  let image = profiles[0]?.avatar || "";
  let id = profiles[0]?.id || 0;

  html = html.replace("{{options}}", options);
  html = html.replace("{{image}}", image);
  html = html.replace("{{handler}}", "C.handlerProfileChange(this)");
  html = html.replace("{{handlerRechercher}}", "C.handlerRechercher()");
  return html;
};
export { NavBar };
