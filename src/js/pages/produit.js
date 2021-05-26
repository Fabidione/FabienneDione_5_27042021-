document.addEventListener("DOMContentLoaded", function () {
    const produit = document.querySelector("body.produit");
  
    if (produit == null) return; // stop
  
    // récupérer l'url
    const url = window.location.search;

    // transforme l'url pour pouvoir faire des recherches dessus
    const urltransform = new URLSearchParams(url);

    // récupérer l'id
    const idrecup = urltransform.get("id");

     if(idrecup){
       console.log('ok');
       const url='http://localhost:3000/';
      fetch(`${url}api/teddies/${idrecup}`)
      
      .then(function(res) {
        if (res.ok) {
         return res.json();
        }
      })
      .then(function(data){
        console.log(data);
      let resultat= `<div class="leNorbert">
      <div class="image"><img src="${data.imageUrl}" alt="${data.name}"><a href="produit.html"></a></div>
      <div class="letitre"><h4> ${data.name}</h4>
      <p>${data.description}</p>
      <p>${data.price}</p></div>
      <label for="color-select">Personnalisez sa couleur :</label>
      <select name="color" id="color-select">
      <option value="choix">--Choisissez votre couleur--</option>`;
        for(i=0;i<data.colors.length;i++){
        resultat+=`<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
        resultat+=`</select><div class="boutons">
      <a href="panier.html?id=${data._id}">Ajouter au panier</a></div></div>`;
        
      document.getElementById("oursonchoice").innerHTML = resultat;   
     })
    }
     else{
       console.log('ko');
     }
    });

  