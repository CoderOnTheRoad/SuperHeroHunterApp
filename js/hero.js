var id= localStorage.getItem("hero-id");
const biography= document.getElementById("bio");
const powerstats=document.getElementById("powerstats");
const appearance=document.getElementById("appearance");
const work= document.getElementById("work");
const connections=document.getElementById("connections");
const image=document.getElementById("hero-image")


function addDataToDom(data){
    if(data){

    }
}

function bringHeroResults() {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
      var res = JSON.parse(xhrRequest.response);
      addDataToDom(res);
    };
    xhrRequest.open(
      "get",
      `https://akabab.github.io/superhero-api/api/${id}.json`
    );
    xhrRequest.send();
}
window.addEventListener("load",bringHeroResults);
