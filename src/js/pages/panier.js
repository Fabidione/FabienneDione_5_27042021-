document.addEventListener("DOMContentLoaded", function () {
  const panier = document.querySelector("body.panier");

  if (!panier) return; //stop//
  //stocker la recuperation des valeurs du formulaire dans le local storage//
  //declarer une variable dans laquelle on met les keys et les values//convertir json en js avec parse
  let produitenregistre = JSON.parse(localStorage.getItem("produit"));
  console.log(produitenregistre);

  //----------------------------affichage des produits du panier------------//
  // selection de la claisse où je vais injecter le code html//
  const positionelement = document.querySelector("#container-produits-panier");
  console.log(positionelement);

  let structureproduitpanier = [];

  //si le panier est vide//
  if (produitenregistre === null) {
    const paniervide = `
  <div class="container-panier-vide">
    <div> Le panier est vide </div>
  </div>`;
    document.getElementById("container-produits-panier").innerHTML = paniervide;
  } else {
    //si le panier n'est pas vide//
    for (let k = 0; k < produitenregistre.length; k++) {
      structureproduitpanier =
        structureproduitpanier +
        `
      <div class="container-recap">
        <div class="article">${produitenregistre[k].nomproduit}</div>
        <div class="quantite">${produitenregistre[k].quantiteproduit}</div>
        <div class="prixunit">${produitenregistre[k].prixproduit / 100} €</div>
        <div>Supprimer l'article</div>
      </div>`;
      document.getElementById("container-produits-panier").innerHTML =
        structureproduitpanier;
    }
  }
});
