document.addEventListener("DOMContentLoaded", function () {
  const produit = document.querySelector("body.produit");

  if (produit == null) return; // stop

  // récupérer l'url
  const url = window.location.search;

  // transforme l'url pour pouvoir faire des recherches dessus
  const urltransform = new URLSearchParams(url);

  // récupérer l'id
  const idrecup = urltransform.get("id");

  if (idrecup) {
    const lurl = "http://localhost:3000/api/teddies";
    fetch(`${lurl}/${idrecup}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        console.log(data);
        let resultat = `<div class="leNorbert">
      <div class="image"><img src="${data.imageUrl}" alt="${
          data.name
        }"><a href="produit.html"></a></div>
      <div class="letitre"><h4> ${data.name}</h4>
      <p>${data.description}</p>
      <p>${data.price / 100}€</p></div>
      <label for="quantite">Choisissez votre quantité :</label><form><select id="choixquantite">
      <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
      <option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option></select></form>
      <label for="color-select">Personnalisez sa couleur :</label>
      <select name="color" id="color-select">
      <option value="choix">--Choisissez votre couleur--</option>`;
        for (let i = 0; i < data.colors.length; i++) {
          resultat += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
        resultat += `</select><div id="bouton">
      <a href="panier.html?id=${data._id}">Ajouter au panier</a></div></div>`;

        document.getElementById("oursonchoice").innerHTML = resultat;

        //-------------------------------------la gestion du panier------------------------------------//

        //selection du bouton envoyer au panier//
        const envoyeraupanier = document.querySelector("#bouton");
        console.log(envoyeraupanier);

        //ecouter le bouton et Envoyer le Panier //
        envoyeraupanier.addEventListener("click", (event) => {
          event.preventDefault();
          //recuperation des donnees selectionnees par l'utilisateur//
          const idquantite = document.querySelector("#choixquantite");
          console.log(idquantite);
          const choix = idquantite.value;
          console.log(choix);
          //Récupération des valeurs du formulaire:les donnes qu'on veut envoyer au panier//
          const optionproduit = {
            nomproduit: data.name,
            prixproduit: data.price,
            quantiteproduit: choix,
          };
          console.log(optionproduit);

          //---------------------------------le local storage---------------------------------//

          //stocker la recuperation des valeurs du formulaire dans le local storage//
          //declarer une variable dans laquelle on met les keys et les values//convertir json en js avec parse
          let produitenregistre = JSON.parse(localStorage.getItem("produit"));

          //fonction Fenêtre popup
          const popupconfirmation = () => {
            if (
              window.confirm(`${data.name} quantité: ${choix} a bien été ajouté au panier
            Consulter le panier OK ou revenir à l'accueil ANNULER`)
            ) {
              window.location.href = "panier.html";
            } else {
              window.location.href = "index.html";
            }
          };

          //fonction ajouter un produit selectionné dans le local storage
          const ajoutproduitlocalstorage = () => {
            //ajout dans le tableau de l'objet avec les values choisi par l'utilisateur//
            produitenregistre.push(optionproduit);
            //transformation format json et l'envoyer dans la key produit localstorage//
            localStorage.setItem("produit", JSON.stringify(produitenregistre));
          };

          // s'il y a des prdts enregistrés dans le local storage
          if (produitenregistre) {
            ajoutproduitlocalstorage();
            popupconfirmation();
          }

          // s'il n'y a pas des prdts enregistrés dans le local storage
          else {
            produitenregistre = [];
            ajoutproduitlocalstorage();
            popupconfirmation();
          }
        });
      });
  } else {
    console.log("ko");
  }
});
