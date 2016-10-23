/*    JavaScript 6th Edition
    Chapter 7
    Hands-on Project 7-4

    Author: Tyler Hunt
    Date:   10/15/16

    Filename: index.htm
*/
"use strict"

var delivSummary = document.getElementById("deliverTo");

//Create deliv obj
function delivInfo(name, address, city, email, phone){
  this.orderName = name
  this.orderAddress = address
  this.orderCity = city
  this.orderEmail = email
  this.orderPhone = phone
}

var foodSummary = document.getElementById("order");

//Create food obj
var foodInfo = {};

//get values
var new_name = document.getElementById("nameinput");
var new_address = document.getElementById("addrinput");
var new_city = document.getElementById("cityinput");
var new_email = document.getElementById("emailinput");
var new_phone = document.getElementById("phoneinput");

//make new instance pizza deliv obj
var DelivInfo = new delivInfo(new_name, new_address, new_city, new_email, new_phone);

function processDeliveryInfo(){
  for (var prop in DelivInfo){
    console.log(DelivInfo[prop].value);
    delivSummary.innerHTML += "<p>" + DelivInfo[prop].value + "</p>";
  }//eoFor
}//eoPDI

function processFood(){
  var crust = document.getElementsByName("crust");
  var psize = document.getElementsByName("size");
  var toppings = document.getElementsByName("toppings");
  var instr = document.getElementById("instructions");

  //get crust option
  if(crust[0].checked){
    foodInfo.crust = crust[0].value;
      foodSummary.innerHTML += "<p><span>Crust</span>: " + foodInfo.crust + "</p>";
  }else  {
    foodInfo.crust = crust[1].value;
      foodSummary.innerHTML += "<p><span>Crust</span>: " + foodInfo.crust + "</p>";
  }//endIf1

  //get pizza size~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  foodInfo.size = size.options[size.selectedIndex].text;
    foodSummary.innerHTML += "<p><span>Size</span>: " + foodInfo.size + "</p>";

  //get toppings~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  foodSummary.innerHTML += "<p><span>Toppings</span></p>";

  foodSummary.innerHTML += "<ul>";
    //add additional topping if selected
    for(var i = 0; i < 5; i++){
      if(toppings[i].checked){
        foodInfo.toppings += toppings[i].value
        foodSummary.innerHTML += "<li>" + toppings[i].value + "</li>";
      }//eoIf
    }//eoFor
  foodSummary.innerHTML += "</ul>";

  //get instructions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  if(instr.value !== ""){
    foodInfo.instr = instr.value;
      foodSummary.innerHTML += "<p><span>Instructions</span>: " + foodInfo.instr + "</p>";
  }
  foodSummary.style.display = "block;"



};//eoPF

function previewOrder(){
  processDeliveryInfo();
  processFood();
  document.getElementsByTagName("section")[0].style.display = "block";
  document.getElementById("deliverTo").style.display = "block";
  document.getElementById("order").style.display = "block";
}

//Event listeners
function createEventListeners(){
  var submitButton = document.getElementById("previewBtn");

  if(submitButton.addEventListener){
    submitButton.addEventListener("click", previewOrder,false)
  }else if (submitButton.attachEvent){
  submitButton.attachEvent("onclick",previewOrder)
  }
}//eoCEL

//Create Listeners
function setUpPage(){
  createEventListeners();
}

//On window load
if(window.addEventListener){
  window.addEventListener("load",setUpPage, false);
}else if(window,attachEvent){
  window.attachEvent("onload",setUpPage);
}
