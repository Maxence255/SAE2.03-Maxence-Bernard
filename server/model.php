<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "bernard196");
define("DBLOGIN", "bernard196");
define("DBPWD", "bernard196");

function getAllMovies(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    // Requête SQL de mise à jour du menu avec des paramètres
    $sql = "select id, name, image from Movie";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère le nombre de lignes affectées par la requête
    $res = $stmt->fetchAll(PDO::FETCH_OBJ); 
    return $res; // Retourne le nombre de lignes affectées
}

function updateMovie($n, $y, $l, $d, $dr, $c, $i, $t, $a){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    // Requête SQL de mise à jour du menu avec des paramètres
    $sql = "REPLACE INTO Movie (name, year, length, description, director, id_category, image, trailer, min_age) 
            VALUES (:name, :year, :length, :description, :director, :id_category, :image, :trailer, :min_age)";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Lie les paramètres aux valeurs
    $stmt->bindParam(':name', $n);
    $stmt->bindParam(':year', $y);
    $stmt->bindParam(':length', $l);
    $stmt->bindParam(':description', $d);
    $stmt->bindParam(':director', $dr);
    $stmt->bindParam(':id_category', $c);
    $stmt->bindParam(':image', $i);
    $stmt->bindParam(':trailer', $t);
    $stmt->bindParam(':min_age', $a);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère le nombre de lignes affectées par la requête
    $res = $stmt->rowCount(); 
    return $res; // Retourne le nombre de lignes affectées
}
function getMovieDetail($id) {
    try {
        
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        
        $sql = "SELECT 
                    Movie.id, 
                    Movie.name, 
                    Movie.director, 
                    Movie.year, 
                    Movie.length, 
                    Movie.description, 
                    Movie.image, 
                    Movie.trailer, 
                    Movie.min_age, 
                    Movie.id_category, 
                    Category.name AS category
                FROM Movie
                JOIN Category ON Movie.id_category = Category.id
                WHERE Movie.id = :id";

        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        
        $movieDetail = $stmt->fetch(PDO::FETCH_OBJ);

        return $movieDetail; 
    } catch (Exception $e) {
        error_log("Erreur SQL : " . $e->getMessage()); // Log dans les erreurs PHP
        return false;
    }
}
function getMoviesCategory() {
    try {
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        // Requête SQL pour récupérer les films groupés par catégorie
        $sql = "SELECT 
                    Category.id AS category_id, 
                    Category.name AS category_name, 
                    Movie.id AS movie_id, 
                    Movie.name AS movie_name, 
                    Movie.image AS movie_image
                FROM Movie
                JOIN Category ON Movie.id_category = Category.id
                ORDER BY Category.name, Movie.name";

        $stmt = $cnx->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);

        // Regrouper les films par catégorie
        $categories = [];
        foreach ($rows as $row) {
            if (!isset($categories[$row->category_id])) {
                $categories[$row->category_id] = [
                    "name" => $row->category_name,
                    "movies" => []
                ];
            }
            $categories[$row->category_id]["movies"][] = [
                "id" => $row->movie_id,
                "name" => $row->movie_name,
                "image" => $row->movie_image
            ];
        }

        return array_values($categories); // Retourne un tableau indexé
    } catch (Exception $e) {
        error_log("Erreur SQL : " . $e->getMessage());
        return false;
    }
}
function addProfile($name, $avatar, $date_naissance) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);

    // Utilisation de REPLACE INTO pour insérer ou remplacer une ligne
    $sql = "REPLACE INTO Profil (name, avatar, date_naissance) 
            VALUES (:name, :avatar, :date_naissance)";

    $stmt = $cnx->prepare($sql);

    // Liaison des paramètres
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':avatar', $avatar);
    $stmt->bindParam(':date_naissance', $date_naissance);

    $stmt->execute();
    $res = $stmt->rowCount();
    return $res; // Retourne le nombre de lignes affectées par l'opération
}
function readProfile() {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "select id, name, avatar, date_naissance from Profil";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}