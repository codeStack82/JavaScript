/*    JavaScript 6th Edition
 *    Chapter 5
 *    Chapter case

 *    Photo gallery
 *    Variables and functions
 *    Author:   Tyler Hunt
 *    Date:     9/25/16

 *    Filename: photos.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrder = [1,2,3,4,5];
var figureCount = 3;

/* shift all images one figure to the left, and change values in photoOrder array to match  */
function rightArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] + 1) === 6) {
         photoOrder[i] = 1;
      } else {
         photoOrder[i] += 1;
      }
      populateFigures();
   }
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] - 1) === 0) {
         photoOrder[i] = 5;
      } else {
         photoOrder[i] -= 1;
      }
      populateFigures();
   }
}

/* open center figure in separate window */
function zoomFig() {
    alert("Zoom Test");
    //var zoomWindow = window.open("zoom.html", "zoomwin", "width=960 height=600");
    //zoomWindow.focus();
}

function populateFigures(){
    var filename;
    var currentFig;

    if(figureCount === 3 ){
        for(var i = 1; i < 4; i++){
            //build image file name
            filename = "../images/IMG_0" + photoOrder[i] + "sm.jpg";
            //set current fig from img tag in page
            currentFig = document.getElementsByTagName("img")[i-1];
            //set current fig src as file name
            currentFig.src = filename
            }
        }
    else{
        for(var i = 0; i < 5; i++){
            filename = "../images/IMG_0" + photoOrder[i] + "sm.jpg"
            currentFig = document.getElementsByTagName("img")[i];
            currentFig.src = filename;
        }
    }
}

function previewFive(){
    //set the article var
    var articleE1 = document.getElementsByTagName("article")[0];

    var lastFigure = document.createElement("figure");
        lastFigure.id = "fig5";
        lastFigure.style.zIndex = "5";
        lastFigure.style.position = "absolute";
        lastFigure.style.right = "45px";
        lastFigure.style.top = "67px";
    var lastImage = document.createElement("img");
        lastImage.width =  "240"
        lastImage.height = "135"
    //add img to fig
    lastFigure.appendChild(lastImage);
    //add fig to article
    articleE1.insertBefore(lastFigure,document.getElementById("rightarrow"));

    //clone fig 5 & reBrand
    var firstFigure = lastFigure.cloneNode(true);
        firstFigure.id = "fig1";
        firstFigure.style.right = "";
        firstFigure.style.left = "45px";
    //add fig1 to article
    articleE1.insertBefore(firstFigure,document.getElementById("fig2"));

    document.getElementsByTagName("img")[0].src = "../images/IMG_0" + photoOrder[0] + "sm.jpg"
    document.getElementsByTagName("img")[4].src = "../images/IMG_0" + photoOrder[4] + "sm.jpg"

    figureCount = 5;

    //remove  & reset 5 to 3
    var numberButton = document.querySelector("#fiveButton p");
    numberButton.innerHTML = "Show fewer images";

    if(numberButton.addEventListener){
        numberButton.removeEventListener("click",previewFive,false);
        numberButton.addEventListener("click",previewThree,false);
    }else if(numberButton.attachEvent){
        numberButton.detachEvent("onclick",previewFive);
        numberButton.attachEvent("onclick",previewThree);
    }
}

function previewThree(){
    var articleE1 = document.getElementsByTagName("article")[0];
    var numberButton = document.querySelector("#fiveButton p");

    articleE1.removeChild(document.getElementById("fig1"));
    articleE1.removeChild(document.getElementById("fig5"));

    figureCount = 3;

    numberButton.innerHTML = "Show more images";

    if(numberButton.addEventListener){
        numberButton.removeEventListener("click",previewThree,false);
        numberButton.addEventListener("click",previewFive,false);
    }else if(numberButton.attachEvent){
        numberButton.detachEvent("onclick",previewThree);
        numberButton.attachEvent("onclick",previewFive);
    }

}

/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners();
   populateFigures();
}

function createEventListeners(){

    var showAllButton = document.querySelector("#fiveButton p")

    if(showAllButton.addEventListener){
        showAllButton.addEventListener("click",previewFive,false);
    }else if (showAllButton.attachEvent) {
        showAllButton.attachEvent("onclick",previewFive);
    }

    //expand center image
    var mainfig = document.getElementsByTagName("img")[1]

    if(mainfig.addEventListener){
        mainfig.addEventListener("click",zoomFig,false);
    }else if (mainfig.attachEvent) {
        mainfig.attachEvent("onclick",zoomFig);
    }

    //Left arrow listener
    var leftarrow = document.getElementById("leftarrow");

    if(leftarrow.addEventListener){
        leftarrow.addEventListener("click",leftArrow,false);
    }else if (leftarrow.attachEvent) {
        leftarrow.attachEvent("onclick",leftArrow);
    }

    //Right arrow listener
    var rightarrow = document.getElementById("rightarrow");

    if(rightarrow.addEventListener){
        rightarrow.addEventListener("click",rightArrow,false);
        //alert("-->")
    }else if (rightarrow.attachEvent) {
        rightarrow.attachEvent("onclick",rightArrow);
    }
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}
