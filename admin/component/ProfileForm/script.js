let templateFile = await fetch('./component/ProfileForm/template.html');
let template = await templateFile.text();


let ProfileForm = {};

ProfileForm.format = function (profiles, handler) {
  let html = template;
  let options = "";
  for (let i = 0; i < profiles.length; i++) {
      const p = profiles[i];
      options += `<option value="${p.id}" data-name="${p.name}" data-avatar="${p.avatar}" data-age="${p.min_age}">${p.name}</option>`;
  }

  html = html.replace("{{options}}", options);
  html = html.replace("{{handler}}", handler);
  return html;
};

// Initialise les champs et les événements du formulaire
ProfileForm.init = function () {
  const select = document.getElementById("profile-select");
  const idField = document.getElementById("profile-id");
  const nameField = document.getElementById("profile-name");
  const avatarField = document.getElementById("profile-avatar");
  const minAgeField = document.getElementById("profile-min-age");

  // Remplit les champs en fonction du profil sélectionné
  select.addEventListener("change", (event) => {
      const selectedOption = event.target.selectedOptions[0];
      if (selectedOption) {
          idField.value = selectedOption.value || "";
          nameField.value = selectedOption.dataset.name || "";
          avatarField.value = selectedOption.dataset.avatar || "";
          minAgeField.value = selectedOption.dataset.age || "";
      }
  });
};

export {ProfileForm};
// // Chargement du fichier HTML contenant le modèle du formulaire
// let templateFile = await fetch('./component/ProfileForm/template.html'); // On récupère le fichier template.html
// let template = await templateFile.text(); // On lit le contenu du fichier sous forme de texte

// // Création de l'objet ProfileForm pour gérer le formulaire
// let ProfileForm = {};

// // Méthode pour générer le HTML du formulaire avec les profils
// ProfileForm.format = function (profiles, handler) {
//     // On commence avec le contenu du template
//     let html = template;

//     // On crée une chaîne de caractères pour les options du menu déroulant
//     let options = "";
//     for (let i = 0; i < profiles.length; i++) {
//         const profile = profiles[i]; // On récupère chaque profil
//         // On ajoute une option pour chaque profil avec ses données
//         options += `<option value="${profile.id}" 
//                             data-name="${profile.name}" 
//                             data-avatar="${profile.avatar}" 
//                             data-age="${profile.min_age}">
//                         ${profile.name}
//                     </option>`;
//     }

//     // On remplace les placeholders dans le template par les données
//     html = html.replace("{{options}}", options); // Remplace {{options}} par les options générées
//     html = html.replace("{{handler}}", handler); // Remplace {{handler}} par le nom de la fonction de gestion

//     // On retourne le HTML complet du formulaire
//     return html;
// };

// // Méthode pour initialiser le formulaire et gérer les interactions
// ProfileForm.init = function () {
//     // On récupère les éléments HTML du formulaire
//     const select = document.getElementById("profile-select"); // Menu déroulant
//     const idField = document.getElementById("profile-id"); // Champ pour l'ID
//     const nameField = document.getElementById("profile-name"); // Champ pour le nom
//     const avatarField = document.getElementById("profile-avatar"); // Champ pour l'avatar
//     const minAgeField = document.getElementById("profile-min-age"); // Champ pour l'âge minimum

//     // On ajoute un événement pour détecter les changements dans le menu déroulant
//     select.addEventListener("change", (event) => {
//         // On récupère l'option sélectionnée
//         const selectedOption = event.target.selectedOptions[0];
//         if (selectedOption) {
//             // On met à jour les champs avec les données du profil sélectionné
//             idField.value = selectedOption.value || ""; // ID du profil
//             nameField.value = selectedOption.dataset.name || ""; // Nom du profil
//             avatarField.value = selectedOption.dataset.avatar || ""; // Avatar du profil
//             minAgeField.value = selectedOption.dataset.age || ""; // Âge minimum du profil
//         }
//     });
// };

// // On exporte l'objet ProfileForm pour pouvoir l'utiliser dans d'autres fichiers
// export { ProfileForm };