import { url, renderprice } from "../global.js";

document.addEventListener("DOMContentLoaded", function () {
  const panier = document.querySelector("body.panier");

  if (!panier) return; //stop//
  //stocker la recuperation des valeurs du formulaire dans le local storage//
  //declarer une variable dans laquelle on met les keys et les values//convertir json en js avec parse
  let produitenregistre = JSON.parse(localStorage.getItem("produit"));
  console.log(produitenregistre);
  let tabproduit = [];
  if (produitenregistre === null) {
    produitenregistre = [];
  }
  for (let t = 0; t < produitenregistre.length; t++) {
    tabproduit[t] = produitenregistre[t]._id;
  }
  console.log(tabproduit);
  //----------------------------affichage des produits du panier------------//
  // selection de la classe où je vais injecter le code html//
  const positionelement = document.querySelector("#container-produits-panier");
  console.log(positionelement);

  let structureproduitpanier = [];

  //si le panier est vide//
  if (
    produitenregistre === null ||
    produitenregistre === 0 ||
    produitenregistre === []
  ) {
    const paniervide = `
    <div> Le panier est vide </div>
  `;
    positionelement.insertAdjacentHTML("beforeend", paniervide);
  } else {
    //si le panier n'est pas vide//
    for (let k = 0; k < produitenregistre.length; k++) {
      structureproduitpanier =
        structureproduitpanier +
        `   
        <div class="container-recap"> 
        <div class="article">${produitenregistre[k].name}</div>
        <div class="quantite">${produitenregistre[k].quantiteproduit}</div>

        <div class="couleur">${produitenregistre[k].colors}</div>
        <div class="prixunit">${produitenregistre[k].price / 100} €</div>
        <div class="btn-supprimer"><button> Supprimer l'article</button></div>
        <div class="icone"><i class="fas fa-shopping-basket"></i></div>
      </div>`;
    }
    positionelement.insertAdjacentHTML("beforeend", structureproduitpanier);
  }

  //-----------------------------gestion du bouton supprimer l'article------------------------//
  //ajout des references du boutton//
  let btnSupprimer = document.querySelectorAll(".btn-supprimer");
  console.log(btnSupprimer);

  for (let l = 0; l < btnSupprimer.length; l++) {
    btnSupprimer[l].addEventListener("click", (event) => {
      event.preventDefault();

      let nomSupprimer = produitenregistre[l].name;
      console.log(nomSupprimer);

      // avec la methode filter je selectionne les elements à garder et je supprime l'element où le bouton supprime a été cliqué//
      produitenregistre = produitenregistre.filter(
        (el) => el.name !== nomSupprimer
      );
      //envoie la variable dans le local storage
      //transformation format json et l'envoyer dans la key produit localstorage//
      localStorage.setItem("produit", JSON.stringify(produitenregistre));

      //alert pour avertir que le produit a été supprimé du panier//
      window.location.href = "panier.html";
    });
  }
  //------------------------------gestion de l'icone panier---------------------------------//
  //ajout des references du boutton//
  let btnSupprimerx = document.querySelectorAll(".icone");
  console.log(btnSupprimerx);

  for (let l = 0; l < btnSupprimerx.length; l++) {
    btnSupprimerx[l].addEventListener("click", (event) => {
      event.preventDefault();

      let nomSupprimerx = produitenregistre[l].name;
      console.log(nomSupprimerx);

      // avec la methode filter je selectionne les elements à garder et je supprime l'element où le bouton supprime a été cliqué//
      produitenregistre = produitenregistre.filter(
        (el) => el.name !== nomSupprimerx
      );
    });
  }

  //----------------------------------calcul prix total-----------------------//
  let sommeTotal = 0;

  produitenregistre.forEach((produitenregistre) => {
    sommeTotal +=
      (produitenregistre.price * produitenregistre.quantiteproduit) / 100;
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
          </label></br>
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
          </label></br>
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

    //--------------------------------gestion validation formulaire----------------------//

    //regex pour prenom nom //
    const regExPrenomNom = (value) => {
      return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value);
    };
    //regex pour ville //
    const regExVille = (value) => {
      return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value);
    };

    //regex pour email//
    const regExEmail = (value) => {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      );
    };
    //regex pour adresse//
    const regExAdresse = (value) => {
      return /^[A-Za-z0-9\s]{5,50}$/.test(value);
    };
    //controle Validité du prenom//
    function prenomControl() {
      const lePrenom = formulaireValues.prenom;
      if (regExPrenomNom(lePrenom)) {
        return true;
      } else {
        alert(
          "Les chiffres et symboles ne sont pas autorisés \n Ne pas dépasser 3O caractéres, minimun 3 caractéres"
        );
        return false;
      }
    }
    //controle Validité du nom//
    function nomControl() {
      const leNom = formulaireValues.nom;
      if (regExPrenomNom(leNom)) {
        return true;
      } else {
        alert(
          "Les chiffres et symboles ne sont pas autorisés \n Ne pas dépasser 3O caractéres, minimun 3 caractéres"
        );
        return false;
      }
    }

    //controle Validité de l'email//
    function emailControl() {
      const lemail = formulaireValues.email;
      if (regExEmail(lemail)) {
        return true;
      } else {
        alert("Votre email n'est pas valide");
        return false;
      }
    }
    //controle Validité adresse//
    function adresseControl() {
      const ladresse = formulaireValues.adresse;
      if (regExAdresse(ladresse)) {
        return true;
      } else {
        alert("Votre adresse n'est pas valide");
        return false;
      }
    }
    //controle Validité du ville//
    function villeControl() {
      const laVille = formulaireValues.ville;
      if (regExVille(laVille)) {
        return true;
      } else {
        alert(
          "Les chiffres et symboles ne sont pas autorisés \n Ne pas dépasser 3O caractéres, minimun 3 caractéres"
        );
        return false;
      }
    }
    //----------------------------condition pour envoyer le formulaire------------------//
    if (
      prenomControl() &&
      nomControl() &&
      emailControl() &&
      adresseControl() &&
      villeControl() &&
      sommeTotal != 0
    ) {
      //mettre l'objet formulaire values dans le local storage
      localStorage.setItem(
        "formulaireValues",
        JSON.stringify(formulaireValues)
      );
      //mettre le prix total dans le local storage
      localStorage.setItem("sommeTotal", JSON.stringify(sommeTotal));

      // mettre les  valeurs du formulaire et mettre les produits selectionnés dans un objet à envoyer au serveur//
      const aEnvoyer = {
        produitenregistre,
        formulaireValues,
        sommeTotal,
      };
      console.log(aEnvoyer);

      //envoie de l'objet "a envoyer" vers le serveur//
      const body = JSON.stringify({
        contact: {
          firstName: formulaireValues.prenom,
          lastName: formulaireValues.nom,
          address: formulaireValues.adresse,
          city: formulaireValues.ville,
          email: formulaireValues.email,
        },
        products: tabproduit,
        orderId: produitenregistre._id,
      });
      envoiVersServer(body);
    } else {
      alert(
        "Veuillez bien remplir le formulaire et vérifier que votre panier n'est pas vide"
      );
    }
  });

  // -----------------------------------créer un chiffre random pour la commande
  function random(min, max) {
    var result = Math.round(Math.random() * (max - min) + min);
    return result;
  }
  console.log(random(1000000000000000, 900000000000000));
  //mettre le random dans le local storage
  localStorage.setItem("random", random(1000000000000000, 900000000000000));

  //-------------------------  envoie de l'objet "aEnvoyer" vers le serveur
  function envoiVersServer(body) {
    const promise01 = fetch(`${url}/order`, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    //pour voir le resultat du serveur dans la console//
    promise01.then(async (response) => {
      //si la promesse n'est pas résolu
      try {
        const contenu = await response.json();

        if (response.ok) {
          localStorage.setItem(
            "random",
            random(1000000000000000, 900000000000000)
          );

          //aller vers la page confirmation commande//
          window.location = "recap.html";
        } else {
          console.log(`response du serveur : ${response.status}`);
        }
      } catch (e) {
        console.log(e);
        alert(`erreur qui vient du catch() ${e}`);
      }
    });
  }

  // --------------------------------mettre le contenu du local storage dans les champs du formulaire----------------------//
  //prendre la key dans le local storage et la mettre dans une variable
  const dataLocalStorage = localStorage.getItem("formulaireValues");

  //convertir la chaine de caractere en objet js
  const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

  // mettre les values du localstorage dans les champs du formulaire//
  if (dataLocalStorageObjet == null) {
  } else {
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
  }

  //------------------------------------------------
});
