import { url, renderprice } from "../global.js";

document.addEventListener("DOMContentLoaded", function () {
  const recap = document.querySelector("body.recap");

  if (!recap) return; //stop//
  //recupérer l'id de la commande dans le local storage
  let idResponse = JSON.parse(localStorage.getItem("idResponse"));
  console.log(`idresponse : ${idResponse}`);

  //recupérer la somme totale de la commande dans le local storage
  const sommeTotal = localStorage.getItem("sommeTotal");
  console.log(`sommeTotal : ${sommeTotal}`);

  // la structure html de la page recap
  const positionElement3 = document.querySelector("#texte2");

  const strutureHtml = `<h4>Récapitulatif de votre commande</h4>
  <p class="numero">Numéro de votre commande : ${idResponse}</p>
  <p class="montant">Montant total de votre commande : ${sommeTotal} €</p>
</div>`;

  //injection html//
  positionElement3.insertAdjacentHTML("afterend", strutureHtml);

  //effacer le panier
  function enlever(key) {
    localStorage.removeItem(key);
  }
  enlever("sommetotal");
  enlever("idResponse");
  enlever("produit");
  enlever("formulaireValues");
});
