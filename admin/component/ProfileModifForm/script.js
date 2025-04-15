let templateFile = await fetch('./component/ProfileModifForm/template.html');
let template = await templateFile.text();


let ProfileModifForm = {};

ProfileModifForm.format = function (profiles, handler) {
  let html = template;
  let options = "";
  for (let i = 0; i < profiles.length; i++) {
      const p = profiles[i];
      options += `<option value="${p.id}" data-name="${p.name}" data-avatar="${p.avatar}" data-date_naissance="${p.date_naissance}">${p.name}</option>`;
  }

  html = html.replace("{{options}}", options);
  html = html.replace("{{handler}}", handler);
  return html;
};

// Initialise les champs et les événements du formulaire
ProfileModifForm.init = function () {
  const select = document.getElementById("profile-select-Mod");
  const idField = document.getElementById("profile-id-Mod");
  const nameField = document.getElementById("profile-name-Mod");
  const avatarField = document.getElementById("profile-avatar-Mod");
  const minAgeField = document.getElementById("profile-min-age-Mod");
  console.log(select, idField, nameField, avatarField, minAgeField);

  // Remplit les champs en fonction du profil sélectionné
  select.addEventListener("change", (event) => {
      const selectedOption = event.target.selectedOptions[0];
      if (selectedOption) {
          idField.value = selectedOption.value || "";
          nameField.value = selectedOption.dataset.name || "";
          avatarField.value = selectedOption.dataset.avatar || "";
          minAgeField.value = selectedOption.dataset.date_naissance ? selectedOption.dataset.date_naissance : "";
        
      }
  });
};

export {ProfileModifForm};