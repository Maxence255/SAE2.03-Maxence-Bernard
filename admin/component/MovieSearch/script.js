let templateFile = await fetch("./component/MovieSearch/template.html");
let template = await templateFile.text();

let MovieSearch = {};

MovieSearch.format = function(handlerR){
    let html= template;
    html = html.replace('{{handlerRechercher}}', handlerR);
    return html;
}
MovieSearch.init = function () {
    const searchField = document.getElementById("profile-search");
    const nameField = document.getElementById("profile-name-search");
    const categorieField = document.getElementById("profile-categorie-search");
    const anneeField = document.getElementById("profile-annee-search");
    console.log(select, searchField, nameField, categorieField, anneeField);
  
    // Remplit les champs en fonction du profil sélectionné
    select.addEventListener("change", (event) => {
        const selectedOption = event.target.selectedOptions[0];
        if (selectedOption) {
            searchField.value = selectedOption.value || "";
            nameField.value = selectedOption.dataset.name || "";
            categorieField.value = selectedOption.dataset.categorie || "";
            anneeField.value = selectedOption.dataset.annee || "";
          
        }
    });
  };
export {MovieSearch};

