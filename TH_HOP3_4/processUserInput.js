/* ----------------------
   FileName: processUserInput.js
   Date: 8/31/16
   Author: Tyler Hunt
   Note: The book said to write the script in the index.html
   page, but I thought we were supposed to write all code in
   a seperate .js file so here it is....
   ---------------------- */

var i = 1;
var listItem = "";
var submitButton = document.getElementById("button");

function processInput(){
    if(i <= 5){
        /*Build id for list id*/
        listItem = "item" + i;

        /*Get toolBox value*/
        var toolBox = document.getElementById("toolBox").value;
        //console.log("toolBox = " + toolBox);

        /*Set listItem to toolBox value*/
        document.getElementById(listItem).innerHTML = toolBox;

        //Clear textbox input
        document.getElementById("toolBox").value = "";
    }
    if(i === 5){
        //Closing comment
        document.getElementById("resultsExpl").innerHTML = "Thanks for"
         + " your suggestions!";

         //Clear textbox input
         document.getElementById("toolBox").value = "";


    }
    //Increment i
    i++;
}

    /*~~~~~Adds backwards compability to the code~~~~~
    ~~~~~~~Add Event Listeners~~~~~~~~~~~~~~~~~~~~-->*/
  if(submitButton.addEventListener){
      submitButton.addEventListener("click",processInput,false);
  }else if(submitButton.attachEvent){
      submitButton.attachEvent("onclick",processInput);
  }
