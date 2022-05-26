var ordermodal = document.getElementById("orderModal");
var orderbtn = document.getElementById("orderBtn");

var billmodal = document.getElementById("billModal");
var billbtn = document.getElementById("billBtn");

var orderspan = document.getElementsByClassName("close")[0];
var billspan = document.getElementsByClassName("close")[1];


orderbtn.onclick = function(){
  ordermodal.style.display = "block";
}

billbtn.onclick = function(){
  billmodal.style.display = "block";
}


window.onclick = function(event) {
  if (event.target == ordermodal){
    ordermodal.style.display = "none";
  }

  if(event.target == billmodal){
    billmodal.style.display = "none";
  }
}

orderspan.onclick = function(){
    ordermodal.style.display = "none";
  }

  
billspan.onclick = function(){
    billmodal.style.display = "none";
  }