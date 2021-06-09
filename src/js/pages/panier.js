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
  if (produitenregistre === null || produitenregistre == 0) {
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
        <div><button class="btn-supprimer"> Supprimer l'article</button></div>
      </div>`;
      document.getElementById("container-produits-panier").innerHTML =
        structureproduitpanier;
    }
  }

  //-----------------------------gestion du bouton supprimer l'article------------------------//
  //ajout des references du boutton//
  let btnSupprimer = document.querySelectorAll(".btn-supprimer");
  console.log(btnSupprimer);

  for (let l = 0; l < btnSupprimer.length; l++) {
    btnSupprimer[l].addEventListener("click", (event) => {
      event.preventDefault();

      let nomSupprimer = produitenregistre[l].nomproduit;
      console.log(nomSupprimer);

      // avec la methode filter je selectionne les elements à garder et je supprime l'element où le bouton supprime a été cliqué//
      produitenregistre = produitenregistre.filter(
        (el) => el.nomproduit !== nomSupprimer
      );
      //envoie la variable dans le local storage
      //transformation format json et l'envoyer dans la key produit localstorage//
      localStorage.setItem("produit", JSON.stringify(produitenregistre));

      //alert pour avertir que le produit a été supprimé du panier//
      window.location.href = "panier.html";
    });
  }

  //------------------------------ajout bouton pour vider tout le panier---------------------//
  //code html du bouton//
  const btnViderPanierHtml = `
  <button class="btnviderpanier">Vider le panier</button>`;

  //insertion bouton dans html//
  positionelement.insertAdjacentHTML("beforeend", btnViderPanierHtml);

  //selection de la réference du bouton//
  const btnViderPanier = document.querySelector(".btnviderpanier");

  //Suppression de la key produit//
  btnViderPanier.addEventListener("click", (event) => {
    event.preventDefault;
    //removeitem pour vider le local storage//
    localStorage.removeItem("produit");
    //alert panier vide//
    alert("Le panier a été vidé");
    //rechargement de la page //
    window.location.href = "panier.html";
  });

  //----------------------------------calcul prix total-----------------------//
});
