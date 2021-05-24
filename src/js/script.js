//Caractéristiques teddies//
function chargement() {
  const liste=teddies;
  console.log(liste);
var resultatfinal='';
for(i=0;i<liste.length;i++){
  var resultat= '<div class="leNorbert">'
  resultat+= '<div class="image"><img src="./backend/images/'+liste[i].imageUrl+'" alt="'+liste[i].name+'"><a href="produit.html"></a></div>';
  resultat+='<div class="letitre"><h4>'+liste[i].name+'</h4>';
  resultat+='<p>'+liste[i].description+'</p>';
  resultat+='<p>'+liste[i].price+'</p>';
  resultat+='<label for="color-select">Personnalisez sa couleur :</label>';
  resultat+='<select name="color" id="color-select">';
  resultat+='<option value="choix">--Choisissez votre couleur--</option>';
  for(j=0;j<liste[i].colors.length;j++){
    resultat+='<option value="'+liste[i].colors[j]+'">'+liste[i].colors[j]+'</option>';
  }
  resultat+='</select>';
  resultat+='<div class="boutons">';
  resultat+='<a href="produit.html">';
  resultat+='<input class="bouton" type="button" value="plus de details">';
  resultat+='</a>';
  resultat+='</div>';
  resultat+='</div>';
  resultatfinal+=resultat;
}

  document.getElementById("ourson").innerHTML = resultatfinal;   }     


  document.addEventListener("DOMContentLoaded", function () {
    const produit = document.querySelector("body.produit");
  
    if (produit == null) return; // stop
  
    // récupérer l'url
    const url = window.location.href;
    console.log(url);

  
    // transforme l'url pour pouvoir faire des recherches dessus
    const urltransform = new URLSearchParams(url);


      // récupérer l'id
    const idrecup = urltransform.searchParams.get("id");
  
    // appeler l'api
    fetch("http://localhost:3000/api/cameras'+liste[i]._id");
  });