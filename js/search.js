const searchInput=document.getElementById("search-input")
const searchKeyWords= new Array();
const searchResultContainer=document.getElementById("search-results");
const favouriteContainer=document.getElementById("favourite-container");

function checkFavArrExists(){
  const favArr=JSON.parse(localStorage.getItem("favArr"));
  if(favArr==null){
    localStorage.setItem("favArr",JSON.stringify([]));
  }
}
checkFavArrExists();
//Removes all childs from a container
function removePrevious(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    };
}
//takes to the hero card
function showDetails(element){
localStorage.setItem('hero-id',element.lastElementChild.innerText);
    console.log(element.lastElementChild.innerText);
    window.location.href="./hero.html"
}
//render search results on the page
function renderResult(resultArr){
    // searchResultContainer.removeChild();
    const favArr=JSON.parse(localStorage.getItem("favArr"));
    removePrevious(searchResultContainer);
    resultArr.map((hero)=>{
        const li= document.createElement("li");
        li.setAttribute("id",`HeroId-${hero.id}`);
        // li.classList.add("card");
        const constHTML='<div class="card mb-3" style=" width:22vw;margin:auto">'+
        '<div class="row g-0">'+
        '<div class="col-md-2">'+
            '<img src="'+hero.images.md+'" class="img-fluid rounded-start" alt="...">'+
        '</div>'+
        '<div class="col-md-10" style="display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center">'+
            '<div class="card-body" >'+
              '<h5 class="card-title" onClick="showDetails(this.parentElement.parentElement)">'+hero.name+'</h5>'+
            '</div>'+
            '<div class="button-container" style="padding:1px" >'
        let varHTML;
        if(favArr.length!=0){
          console.log(favArr);
          console.log(hero.id)
          let check=favArr.indexOf(hero.id.toString());
          console.log(check);
            if(check!=-1){
              varHTML=
              // '<button type="button" class="btn btn-danger" onClick="removeFromFavourites(this.parentElement.parentElement.lastElementChild)"><i class="bi bi-heart"></button>'+
              //`<i class="fa-solid fa-heart fa-2x" style="color:red;" onClick="removeFromFavourites(this)" id=fav-button-${hero.id}></i>`+
              `<i class="fa-solid fa-heart fa-2x" style="color:red;" data-id="favHeroId-${hero.id}" onClick="removeFromFavourites(this)" id=fav-button-${hero.id}></i>`+
              '</div>'+
              '<div style="display:none">'+hero.id+'</div>'+
              '</div>'+
              '</div>'+
              '</div>';
            }else{
              varHTML=
              // '<button type="button" class="btn btn-success"onClick="addToFavourites(this.parentElement.parentElement.lastElementChild)"><i class="bi bi-heart"></i></button>'+
              `<i class="fa-regular fa-heart fa-2x" style="color:black" onClick="addToFavourites(this.parentElement.parentElement.lastElementChild)"id="fav-button-${hero.id}"></i>`+
              '</div>'+
              '<div style="display:none">'+hero.id+'</div>'+
              '</div>'+
              '</div>'+
              '</div>';
            }  
        }else{
          varHTML=
          // '<button type="button" class="btn btn-success"onClick="addToFavourites(this.parentElement.parentElement.lastElementChild)"><i class="bi bi-heart"></button>'+
          `<i class="fa-regular fa-heart fa-2x" style="color:black" onClick="addToFavourites(this.parentElement.parentElement.lastElementChild)"id="fav-button-${hero.id}"></i>`+
          '</div>'+
          '<div style="display:none">'+hero.id+'</div>'+
          '</div>'+
          '</div>'+
          '</div>';
        }
        const totHTML=constHTML+varHTML;
        li.innerHTML=totHTML;
        searchResultContainer.appendChild(li);
    })

}
//internally calls the renderResult function 
function bringSearchResults(text) {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
      var res = JSON.parse(xhrRequest.response);
      var resultArr=new Array();


      res.map((hero)=>{
        if(hero.name.toLowerCase().includes(text.toLowerCase())){
            resultArr.push(hero);
        }
      })
      // console.log(resultArr);
      renderResult(resultArr);
    };
    xhrRequest.open(
      "get",
      "https://akabab.github.io/superhero-api/api/all.json"
    );
    xhrRequest.send();
}
//brings search result according to typed text in input container
//internally calls the bringSearchResults function
function fetchData(value){
    searchKeyWords.push(value);
    if(value==""){
        return;
    }
    // searchResultContainer.innerHTML("");
    setTimeout(bringSearchResults(searchKeyWords.pop()),400);
    
}
//Adds a hero to favourites
function addToFavourites(data){
  var favArr=localStorage.getItem("favArr");
  if(favArr==null){
    favArr=[];
    localStorage.setItem("favArr",JSON.stringify(favArr));
  }
  favArr=JSON.parse(localStorage.getItem("favArr"));
  for(let i=0;i<favArr.length;i++){
    if(data.innerText===favArr[i]){
      return;
    }
  }
  favArr=[data.innerText,...favArr];
  console.log("from adding",favArr);
  localStorage.setItem("favArr",JSON.stringify(favArr));
  var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
      var res = JSON.parse(xhrRequest.response);
      removePrevious(searchResultContainer)
      let li =addFavouriteCard(res,favArr);
      favouriteContainer.prepend(li);
    }
    xhrRequest.open(
      "get",
      `https://akabab.github.io/superhero-api/api/id/${data.innerText}.json`
    );
    xhrRequest.send();
}

//renders the favourite heroes to the page
function renderFavourites(){
  let favArr=JSON.parse(localStorage.getItem("favArr"));
  console.log("from render",favArr);
    favArr.map((id)=>{
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
      var res = JSON.parse(xhrRequest.response);
      removePrevious(searchResultContainer)
      let li=addFavouriteCard(res,favArr);
      favouriteContainer.appendChild(li);
    }
    xhrRequest.open(
      "get",
      `https://akabab.github.io/superhero-api/api/id/${id}.json`
    );
    xhrRequest.send();
});

}

function addFavouriteCard(res,favArr){
  favArr.map((id)=>{
    if(id==res.id){
      return;
    }
  })
  const li= document.createElement("li");
        // li.classList.add("card");
        li.setAttribute("id",`favHeroId-${res.id}`);
        li.innerHTML=
        '<div class="card mb-3" style=" width:70%;margin:auto">'+
          '<div class="row g-0">'+
            '<div class="col-md-2">'+
                '<img src="'+res.images.md+'" class="img-fluid rounded-start" alt="...">'+
            '</div>'+
            '<div class="col-md-10"style="display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center">'+
                '<div class="card-body"style="overflow:hidden">'+
                  '<h5 class="card-title" onClick="showDetails(this.parentElement.parentElement)">'+res.name+'</h5>'+
                  '<p class="card-text" overflow="hiddeen" style="font-size:10px;">'+res.work.occupation+'</p>'+
                  // '<p class="card-text"><small class="text-muted" overflow="hiddeen">'+res.connections.groupAffiliation+'</small></p>'+
                '</div>'+ 
                '<div class="button-container" style="padding:3px">'+
                      // '<button type="button" class="btn btn-success " onClick="addToFavourites(this.parentElement.parentElement.lastElementChild)">Remove</button>'+
                      // '<button type="button" class="btn btn-danger"onClick="removeFromFavourites(this.parentElement.parentElement.lastElementChild)">Danger</button>'+
                      // `<i class="fa-solid fa-heart fa-2x" style="color:red;" data-id="favHeroId-${res.id}" onClick="removeFromFavourites(this.parentElement.parentElement.lastElementChild)" id=fav-button-${res.id}></i>`+
                      `<i class="fa-solid fa-heart fa-2x" style="color:red;" data-id="favHeroId-${res.id}" onClick="removeFromFavourites(this)" id=fav-button-${res.id}></i>`+
                '</div>'+
                '<div style="display:none">'+res.id+'</div>'+
            '</div>'+
          '</div>'+
        '</div>';
                

  return li;
}
//removes a hero from favourite
function removeFromFavourites(data){
  let favArr=JSON.parse(localStorage.getItem("favArr"));
  let filtered=favArr.filter((value)=>value!=data.getAttribute("data-id").split("-")[1]);
  localStorage.setItem("favArr",JSON.stringify(filtered));
  const heroToRemove=document.getElementById(data.getAttribute("data-id"));
  heroToRemove.remove();
  // location.reload();

}

window.addEventListener("load",renderFavourites);


