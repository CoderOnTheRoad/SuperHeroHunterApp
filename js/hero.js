var id= localStorage.getItem("hero-id");
const biography= document.getElementById("bio");
const powerstats=document.getElementById("powerstats");
const appearance=document.getElementById("appearance");
const work= document.getElementById("work");
const connections=document.getElementById("connections");
const image=document.getElementById("hero-image")
const name=document.getElementById("name");

function addDataToDom(res){
    if(res){
        name.innerText=res.name;
        image.src=res.images.lg;
        const bioKeys=Object.keys(res.biography);
        for(let i=0;i<bioKeys.length;i++){
            const li = document.createElement("li");
            li.innerHTML="<p><b>"+bioKeys[i]+":</b> "+res.biography[bioKeys[i]]+"</p>";
            biography.appendChild(li);
        }
        const powerstatsKeys=Object.keys(res.powerstats);
        for(let i=0;i<powerstatsKeys.length;i++){
            const li = document.createElement("li");
            li.innerHTML="<p><b>"+powerstatsKeys[i]+":</b> "+res.powerstats[powerstatsKeys[i]]+"</p>";
            powerstats.appendChild(li);
        }
        const appearanceKeys=Object.keys(res.appearance);
        for(let i=0;i<appearanceKeys.length;i++){
            const li = document.createElement("li");
            li.innerHTML="<p><b>"+appearanceKeys[i]+":</b> "+res.appearance[appearanceKeys[i]]+"</p>";
            appearance.appendChild(li);
        }
        const workKeys=Object.keys(res.work);
        for(let i=0;i<workKeys.length;i++){
            const li = document.createElement("li");
            li.innerHTML="<p><b>"+workKeys[i]+":</b> "+res.work[workKeys[i]]+"</p>";
            work.appendChild(li);
        }
        const  connectionsKeys=Object.keys(res. connections);
        for(let i=0;i< connectionsKeys.length;i++){
            const li = document.createElement("li");
            li.innerHTML="<p><b>"+workKeys[i]+":</b> "+res. connections[ connectionsKeys[i]]+"</p>";
            connections.appendChild(li);
        }
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
      `https://akabab.github.io/superhero-api/api/id/${id}.json`
    );
    xhrRequest.send();
}
window.addEventListener("load",bringHeroResults);
