    //page accueil

  
  const url='http://localhost:3000/';
    fetch(url+"api/teddies")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(data){
      console.log(data);
      let resultat='';
      for(i=0;i<data.length;i++){
        console.log(`${data[i].imageUrl}`);
        resultat+= `<div class="leNorbert">
          <div class="image"><img src="${data[i].imageUrl}" alt="${+data[i].name}"><a href="produit.html"></a></div>
          <div class="letitre"><h4> ${data[i].name}</h4>
          <p>${data[i].description}</p>
          <p>${data[i].price}</p></div>
          <div class="boutons">
          <a href="produit.html?id=${data[i]._id}">Plus de details</a></div></div>`;
      }
    document.getElementById("ourson").innerHTML = resultat;   

    })
  

















