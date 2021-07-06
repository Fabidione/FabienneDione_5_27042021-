//page accueil
import { url } from "../global.js";

document.addEventListener("DOMContentLoaded", function () {
  const accueil = document.querySelector("body.accueil");
  if (accueil == null) return; // stop

  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      console.log(data);
      let resultat = "";
      for (let i = 0; i < data.length; i++) {
        resultat += `<div class="leNorbert">
          <div class="image"><img src="${data[i].imageUrl}" alt="${+data[i]
          .name}"><a href="produit.html"></a></div>
          <div class="letitre"><h4> ${data[i].name}</h4>
          <p>${data[i].description}</p>
          <p class="price">${data[i].price / 100}€</p></div>
          <div class="bouton">
          <a href="produit.html?id=${
            data[i]._id
          }">Plus de détails</a></div></div>`;
      }
      document.getElementById("ourson").innerHTML = resultat;
    });
});
