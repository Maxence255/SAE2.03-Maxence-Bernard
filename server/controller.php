<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
require("model.php");

function readMoviesController() {
  // Vérifie si le paramètre 'age' est défini dans la requête
  $age = isset($_REQUEST['age']) ? intval($_REQUEST['age']) : 0;

  // Appelle la fonction du modèle en passant l'âge minimum
  $movies = getMoviesByAge($age);

  return $movies;
}

function updateMoviesController(){
    /* Lecture des données de formulaire
      On ne vérifie pas si les données sont valides, on suppose (faudra pas toujours...) que le client les a déjà
      vérifiées avant de les envoyer 
    */
    $name = $_REQUEST['name'];
    $year = $_REQUEST['year'];
    $length = $_REQUEST['length'];
    $description = $_REQUEST['description'];
    $director = $_REQUEST['director'];
    $id_category = $_REQUEST['id_category'];
    $image = $_REQUEST['image'];
    $trailer = $_REQUEST['trailer'];
    $min_age = $_REQUEST['min_age'];
    // Mise à jour du menu à l'aide de la fonction updateMenu décrite dans model.php
    $ok = updateMovie($name, $year, $length, $description, $director, $id_category, $image, $trailer, $min_age);
    // $ok est le nombre de ligne affecté par l'opération de mise à jour dans la BDD (voir model.php)
    if ($ok!=0){
      return "Le film $name vien d'être ajouter ";
    }
    else{
      return false;
    }
  }

  function readMovieDetailController() {

    if (!isset($_REQUEST['id'])) {
        return false; 
    }
  
    $id = intval($_REQUEST['id']);
    $movie = getMovieDetail($id);
  
    if ($movie) {
        return $movie;
    } else {
        return false;
    }
  }
  function readMoviesCategoryController() {
    $categories = getMoviesCategory();
    return $categories ? $categories : false;
  }
  function addProfileController() {
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : null;
   $name = $_REQUEST['name'];
    $avatar = $_REQUEST['avatar'];
    $date_naissance = $_REQUEST['date_naissance'];
  
    // Appel de la fonction addProfile déclarée dans model.php
    $ok = addProfile($id, $name, $avatar, $date_naissance);
  
    if ($ok != 0) {
        return "$name a été ajouté ou remplacé avec succès";
    } else {
        return "Le profil n'a pas pu être ajouté ou remplacé";
    }
  }
  function readControllerProfile(){
      if (!isset($_REQUEST['id'])) {
    $profiles = readProfile(); 
  }
  else{
    $id = $_REQUEST['id'];
    $profiles = readOneProfile($id); // Appel de la fonction getProfile
  }
 
    return $profiles;
  }
