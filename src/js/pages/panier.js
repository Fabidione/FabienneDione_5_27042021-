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

  //----------------------------------calcul prix total-----------------------//
  let sommeTotal = 0;

  produitenregistre.forEach((produitenregistre) => {
    sommeTotal +=
      (produitenregistre.prixproduit * produitenregistre.quantiteproduit) / 100;
  });
  console.log(sommeTotal);

  // le code html du prix total
  const affichagePrix = `<div class="container-total">
  <div class="prix-total">Prix total : ${sommeTotal} €</div>
  </div>`;
  //insertion bouton dans html//
  positionelement.insertAdjacentHTML("beforeend", affichagePrix);

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
    event.preventDefault();
    //removeitem pour vider le local storage//
    localStorage.removeItem("produit");
    //alert panier vide//
    alert("Le panier a été vidé");
    //rechargement de la page //
    window.location.href = "panier.html";
  });

  //-------------------------------------formulaire---------------------------

  const afficherFormulaireHtml = () => {
    //selection element du dom pour le positionnement du formulaire//
    const positionElement2 = document.querySelector(
      "#container-produits-panier"
    );
    const structureFormulaire = `
    <div id="formulaire">    
      <h3>Pour valider votre commande merci de remplir ce formulaire :</h3>
      <form action="#">
        <div class="prenom">
          <label for="prenom"> 
            Votre prénom
          </label>
          <input type="text" name ="prenom" id="prenom" required />
        </div>
        <div class="nom">
          <label for="nom"> 
            Nom
          </label>
          <input type="text" name="nom" id="nom" required />
        </div>
        <div class="adresse">
          <label for="adresse">
            Votre adresse 
          </label>
          <input type="text" name="adresse" id="adresse" required />
        </div>
        <div class="ville">
          <label for="ville">
            Votre ville
          </label>
          <input type="text" name="ville" id="ville" required />
        </div>
        <div class="email">
          <label for="email">
            Votre adresse email
          </label>
          <input type="text" name="email"  id="email" required />
        </div>
        <div class="validercom">
          <a href="recap.html">
            <button id="envoyerformulaire" type="submit" name="envoyerFormulaire">
              Valider votre commande
            </button>
          </a>
        </div>
      </form>
    </div>`;

    //injection html//
    positionElement2.insertAdjacentHTML("afterend", structureFormulaire);
  };
  //affichage du formulaire//
  afficherFormulaireHtml();

  //selectionner bouton envoyer//
  const btnEnvoyerFormulaire = document.querySelector("#envoyerformulaire");

  // addeventlistener
  btnEnvoyerFormulaire.addEventListener("click", (event) => {
    event.preventDefault();

    //Récupérer valeurs du formulaire
    const formulaireValues = {
      prenom: document.querySelector("#prenom").value,
      nom: document.querySelector("#nom").value,
      adresse: document.querySelector("#adresse").value,
      ville: document.querySelector("#ville").value,
      email: document.querySelector("#email").value,
    };

    //mettre l'objet formulaire values dans le local storage
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));

    // mettre les  valeurs du formulaire et mettre les produits selectionnés dans un objet à envoyer au serveur//
    const aEnvoyer = {
      produitenregistre,
      formulaireValues,
    };
    console.log(aEnvoyer);
  });

  // --------------------------------mettre le contenu du local storage dans les champs du formulaire----------------------//
  //prendre la key dans le local storage et la mettre dans une variable
  const dataLocalStorage = localStorage.getItem("formulaireValues");

  //convertir la chaine de caractere en objet js
  const dataLocalStorageObjet = JSON.parse(dataLocalStorage);
  console.log(dataLocalStorageObjet);

  //mettre les values du localstorage dans les champs du formulaire//
  document
    .querySelector("#prenom")
    .setAttribute("value", dataLocalStorageObjet.prenom);
  document
    .querySelector("#nom")
    .setAttribute("value", dataLocalStorageObjet.nom);
  document
    .querySelector("#adresse")
    .setAttribute("value", dataLocalStorageObjet.adresse);
  document
    .querySelector("#ville")
    .setAttribute("value", dataLocalStorageObjet.ville);
  document
    .querySelector("#email")
    .setAttribute("value", dataLocalStorageObjet.email);
  console.log(dataLocalStorageObjet);
});
