document.addEventListener("DOMContentLoaded", function () {
  const panier = document.querySelector("body.panier");

  if (!panier) return; //stop//
  //stocker la recuperation des valeurs du formulaire dans le local storage//
  //declarer une variable dans laquelle on met les keys et les values//convertir json en js avec parse
  let produitenregistre = JSON.parse(localStorage.getItem("produit"));
  console.log(produitenregistre);
});
