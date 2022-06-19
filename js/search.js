const searchInput=document.getElementById("search-input")
const searchKeyWords= new Array();
const searchResultContainer=document.getElementById("search-results");

function removePrevious() {
    while (searchResultContainer.firstChild) {
        searchResultContainer.removeChild(searchResultContainer.firstChild)
    };
}
function showDetails(element){
localStorage.setItem('hero-id',element.lastElementChild.innerText);
    console.log(element.lastElementChild.innerText);
    window.location.href="./hero.html"
}
function renderResult(resultArr){
    // searchResultContainer.removeChild();
    removePrevious();
    resultArr.map((hero)=>{
        const li= document.createElement("li");
        // li.classList.add("card");
        li.innerHTML='<div class="card mb-3" style=" width:45vw">'+
        '<div class="row g-0">'+
        '<div class="col-md-4">'+
            '<img src="'+hero.images.md+'" class="img-fluid rounded-start" alt="...">'+
        '</div>'+
        '<div class="col-md-8">'+
            '<div class="card-body">'+
              '<h5 class="card-title" onClick="showDetails(this.parentElement.parentElement)">'+hero.name+'</h5>'+
              '<p class="card-text" overflow="hiddeen">'+hero.work.occupation+'</p>'+
              '<p class="card-text"><small class="text-muted" overflow="hiddeen">'+hero.connections.groupAffiliation+'</small></p>'+
            '</div>'+
            
            '<div class="button-container row" style="width:100px;position:absolute;bottom:5px;right:20px;">'+
            // style="width:"
                // '<button type="button" class="btn btn-success col-md-6">Success</button>'+
                '<button type="button" class="btn btn-danger" onClick="addToFavourites(hero)">Danger</button>'+
            '</div>'+
            '<div style="display:none">'+hero.id+'</div>'+
        '</div>'+
        '</div>'+
      '</div>';
        searchResultContainer.appendChild(li);
    })

}

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
      console.log(resultArr);
      renderResult(resultArr);
    };
    xhrRequest.open(
      "get",
      "https://akabab.github.io/superhero-api/api/all.json"
    );
    xhrRequest.send();
  }

function fetchData(value){
    searchKeyWords.push(value);
    if(value==""){
        return;
    }
    // searchResultContainer.innerHTML("");
    setTimeout(bringSearchResults(searchKeyWords.pop()),400);
    
}