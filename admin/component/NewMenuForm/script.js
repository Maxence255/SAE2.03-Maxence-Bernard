let templateFile = await fetch("./component/NewMenuForm/template.html");
let template = await templateFile.text();

let NewMenuForm = {};

// NewMenuForm.autoFill = function(menu){
//     let inputTitre = document.querySelector("input[name=Titre]"); 
//     inputTitre.value = menu.titre;
//     let inputRéalisateur = document.querySelector("input[name=Réalisateur]"); 
//     inputRéalisateur.value = menu.réalisateur;
//     let inputAnnée = document.querySelector("input[name=Année]"); 
//     inputAnnée.value = menu.année;
//     let inputDurée = document.querySelector("input[name=Durée]"); 
//     inputDurée.value = menu.durée;
//     let inputDescription = document.querySelector("input[name=Description]"); 
//     inputDescription.value = menu.description;
//     let inputCatégorie = document.querySelector("input[name=Catégorie]"); 
//     inputCatégorie.value = menu.catégorie;
//     let inputImage = document.querySelector("input[name=Image]"); 
//     inputImage.value = menu.image;
//     let inputURL = document.querySelector("input[name=URL]"); 
//     inputURL.value = menu.url;
//     let inputAge = document.querySelector("input[name=Age]"); 
//     inputAge.value = menu.age;
// }

NewMenuForm.format = function(handlerU){
    let html= template;
    html = html.replace('{{handlerUpdate}}', handlerU);
    return html;
}
export {NewMenuForm};

