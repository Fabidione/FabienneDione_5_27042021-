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
    fetch("http://localhost:3000/api/cameras'+liste[i].id'");
  });

  