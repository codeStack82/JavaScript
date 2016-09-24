/* ----------------------
   FileName: calculteTotal.js
   Date: 8/31/16
   Author: Tyler Hunt
   Note: The book said to write the script in the index.html
   page, but I thought we were supposed to write all code in
   a seperate .js file so here it is....
   ---------------------- */


   function calcTotal(){
       var itemTotal = 0;
       var items = document.getElementsByTagName("input");

       for(var i = 0; i < 5; i++){
           if(items[i].checked){
               itemTotal += (items[i].value * 1);
           }
       }
       /*~~~~~Sets the total in the <p> and appends the ".00"-->*/
       document.getElementById("total").innerHTML = "Your total is $ " +
                            itemTotal + ".00";
   }

   /*~~~~~Gets the submit button by id-->*/
   var submitButton = document.getElementById("sButton");

   /*~~~~~Adds backwards compability to the code~~~~~~~~-->*/
   if(submitButton.addEventListener){
       submitButton.addEventListener("click",calcTotal,false);
   }else if(submitButton.attachEvent){
       submitButton.attachEvent("onclick",calcTotal);
   }
