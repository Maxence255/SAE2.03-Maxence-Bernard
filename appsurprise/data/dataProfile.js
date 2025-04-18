let HOST_URL = "../";

let DataProfile = {};

// DataProfile.read = async function () {
//   let answer = await fetch(HOST_URL + "/server/script.php?todo=readProfile");
//   let profile = await answer.json();
//   return profile;
// };

DataProfile.read = async function () {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readProfile");
    
    let Profiles = await answer.json();
    return Profiles;
  };
  
  
  DataProfile.readOne = async function (id) {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readProfile&id=" + id);
    
    let res = await answer.json();
    return res;
  };

export { DataProfile };