/*
   JavaScript 6th Edition
   Chapter 6
   Chapter case

   Snoot Flowers order form
   Author: Tyler Hunt
   Date:   10/10/16

   Filename: snoot.js
*/
///////////////////////////////////////////////////////////////////////////////
//~~~~~~~~~~~Chapter 6: Enhancing and Validating Forms- Order Form~~~~~~~~~~~//
///////////////////////////////////////////////////////////////////////////////

"use strict"

var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;

function setUpDays(){
  var dates = document.getElementById("delivDy").getElementsByTagName("option");
  //adds 29th
  twentyNine.appendChild(dates[28].cloneNode(true));

  //adds 29th & 30th
  thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));

  //adds 29th - 31st
  thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
      thirtyOne.appendChild(dates[30].cloneNode(true));
  }

function updateDays(){
  var deliveryDay = document.getElementById("delivDy");
  var dates = deliveryDay.getElementsByTagName("option");
  var deliveryMonth = document.getElementById("delivMo");
  var deliveryYear = document.getElementById("delivYr");
  var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;

  //clear dates >= 29 from otions
  while(dates[28]){
    deliveryDay.removeChild(dates[28]);
  }

  //set default year to min avail year
  if(deliveryYear.selectedIndex === -1){
    deliveryYear.selectedIndex = 0;
  }

  if(selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2018"){
    deliveryDay.appendChild(twentyNine.cloneNode(true));
  }
  else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9"
            || selectedMonth=== "11") {
    deliveryDay.appendChild(thirty.cloneNode(true));
  }
  else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7"
            || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
    deliveryDay.appendChild(thirtyOne.cloneNode(true))
  }

}//eo_UpdateDays


function zeroPlaceHolder(){
    var messageBox = document.getElementById("customText")
    messageBox.style.color = "black";
    if(messageBox.value === messageBox.placeholder){
      messageBox.value = "";
    }
}

//Function ot check placeholder
function checkPlaceHolder(){
    var messageBox = document.getElementById("customText");

    if (messageBox.value === ""){
      messageBox.style.color = "rbg(178,184,183)";
      messageBox.value = messageBox.placeholder;
    }
}

//Function generate placeholder text in older browsers
function generatePlaceHolder(){
   // if browser version doesn't support modernizer IE8
    if(!Modernizr.input.placeholder){
      var messageBox = document.getElementById("customText");
      messageBox.value = messageBox.placeholder;
      messageBox.style.color = "rgb(178,184,183)"

      //Event Listener
      if(messageBox.addEventListener){
        messageBox.addEventListener("focus",zeroPlaceHolder,false);
        messageBox.addEventListener("blur",checkPlaceHolder,false);
      }else if (messageBox.attachEvent) {
        messageBox.attachEvent("onfocus",zeroPlaceHolder);
        messageBox.attachEvent("onblur",checkPlaceHolder);
      }
    }
}

//Function auto check a checkbox if text is entered
function autoCheckCustom(){
  var messageBox = document.getElementById("customText")
  if(messageBox.value !== "" && messageBox.value !== messageBox.placeholder){
    document.getElementById("custom").checked = "checked";
  }
}

//Function duplicates billing address if checked
function copyBillingAddress(){
  var billingInputElements = document.querySelectorAll("#billingAddress input");
  var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");

  if(document.getElementById('sameAddr').checked){
    for(var i = 0; i < billingInputElements.length; i++){
      deliveryInputElements[i + 1].value = billingInputElements[i].value;
    }
    document.querySelector("#deliveryAddress select").value =
    document.querySelector("#billingAddress select").value;
  }else{
    for(var i = 0; i < billingInputElements.length; i++){
      deliveryInputElements[i + 1].value = "";
    }
    document.querySelector("#deliveryAddress select").selectedIndex = -1;
  }
}//eoCBA

//function validates Address
function validateAddress(fieldsetId){
  var inputElements  = document.querySelectorAll("#"+fieldsetId+" input");
  var errorDiv = document.querySelectorAll("#"+fieldsetId+" .errorMessage")[0];
  var isDeliveryChecked = document.getElementById('sameAddr').checked;
  var fieldsetValidity = true;
  var elementCount = inputElements.length;
  var currentElement;

  try{
    //  loop throught address fields and check validity
    for(var i = 0; i < elementCount; i++){
      currentElement = inputElements[i];

      //  set field bkgrd to pink if invalid
      if(currentElement.value === ""){
        currentElement.style.background = "rgb(255,233,233)";
        fieldsetValidity = false;
      }else{
      // Else set back to white
        currentElement.style.background = "white";
      }//endIf1
    }//endfor

    currentElement = document.querySelector("#"+fieldsetId+" select");

    if(currentElement.selectedIndex === 0){
      currentElement.style.border = "1px solid red";
      fieldsetValidity = false;
    }else{
      currentElement.style.border = "";
    }

    if(fieldsetValidity === false){
        if(fieldsetId === "billingAddress"){
          throw "Please complete all the Billing Address information";
        }else if(fieldsetId === "deliveryAddress" && isDeliveryChecked.checked){
          throw "Please complete all the Delivery Address information";
        }
      }else{
        errorDiv.style.display = "none";
        errorDiv.innerHTML ="";
      }
  }catch(msg){
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    formValidity = false;
  }
}//eoVA

//function validates Deliv Address
function validateDeliveryDate(){
  var selectElements = document.querySelectorAll("#deliveryDate select");
  var errorDiv = document.querySelector("#deliveryDate .errorMessage");
  var fieldsetValidity = true;
  var elementCount = selectElements.length;
  var currentElement;

  try{
    //loop throught address fields and check validity

    for(var i = 0; i < elementCount; i++){
      currentElement = selectElements[i];
      //validate state list box
      if(currentElement.selectedIndex === 0){
        currentElement.style.border = "1px solid red";
        fieldsetValidity = false;
      }else{
        currentElement.style.border = "";
      }
    }//eoFor

    if(fieldsetValidity === false){
          throw "Please specify a delivery date";
      }else{
        errorDiv.style.display = "none";
        errorDiv.innerHTML ="";
      }
  }catch(msg){
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    formValidity = false;
  }
}//eoDate

//function validates paymentInfo
function validatePayment(){
  var errorDiv = document.querySelector("#paymentInfo .errorMessage");
  var fieldsetValidity = true;
  var ccNumElement = document.getElementById("ccNum");
  var selectElements = document.querySelectorAll("#paymentInfo select");
  var elementCount = selectElements.length;
  var cvvElement = document.getElementById("cvv");
  var cards = document.getElementsByName("PaymentType");
  var currentElement;

  try{ //if all rdo are MT the outline red
    if(!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked ){
      for(var i = 0; i < 4; i++){
        cards[i].style.outline = "1px solid red";
      }//eoFor
      fieldsetValidity = false;
    }else{ //else outline blanks
      for(var i = 0; i < 4; i++){
        cards[i].style.outline = "";
      }
    }//eoIf

    // if card num is MT fill pink
    if(ccNumElement.value === ""){
      ccNumElement.style.background = "rgb(255,233,233)";
      fieldsetValidity = false;
    }else{
      ccNumElement.style.background = "white";
    }

    //if cvv is MT fill pink
    if(cvvElement.value === ""){
      cvvElement.style.background = "rgb(255,233,233)";
      fieldsetValidity = false;
    }else{
      cvvElement.style.background = "white";
    }

    //check month year lb
   for(var i = 0; i < elementCount; i++){
     currentElement = selectElements[i];
     if(currentElement.selectedIndex === 0){
        currentElement.style.border = "1px solid red";
     }else{
       currentElement.style.border = ""
     }
   }

   //if false
   if(!fieldsetValidity){
     throw "Please complete all payment options";
   }else{
      errorDiv.style.display = "none";
   }
 }catch(msg){
   errorDiv.style.display = "block";
   errorDiv.innerHTML = msg;
   formValidity = false;
 }
}//eoVP

function advancePhoneB(){
  var phoneFields = document.getElementsByClassName("phone");
  var currentField = document.activeElement;

  if(currentField.value.length === currentField.maxLength){
  //  alert(currentField.value.length + " = " + currentField.maxLength)
      if(currentField === phoneFields[0]){
        phoneFields[1].focus();
      }//eoIf2
      if(currentField === phoneFields[1]){
        phoneFields[2].focus();
      }//eoIf3
      if(currentField === phoneFields[2]){
        document.getElementById("delivMo").focus();
      }//eoIf4
  }//eoIf1
}//eoFunc

function advancePhoneD(){
  var phoneFields = document.getElementsByClassName("phoneD");
  var currentField = document.activeElement;

  if(currentField.value.length === currentField.maxLength){
  //  alert(currentField.value.length + " = " + currentField.maxLength)
      if(currentField === phoneFields[0]){
        phoneFields[1].focus();
      }//eoIf2
      if(currentField === phoneFields[1]){
        phoneFields[2].focus();
      }//eoIf3
      if(currentField === phoneFields[2]){
        document.getElementById("delivMo").focus();
      }//eoIf4
  }//eoIf1
}//eoFunc

//function validates CheckBox and message box
function validateMessage(){
  var errorDiv = document.querySelector("#message .errorMessage");
  var msgBox = document.getElementById("customText");

  try{
    if(document.getElementById("custom").checked && ((msgBox.value === "") || (msgBox.value === msgBox.placeholder))){
      throw "Please enter your message text";
    }else{
      errorDiv.style.display ="none";
      msgBox.style.background = "white";
    }
  }catch(msg){
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    msgBox.style.background = "rgb(255,233,233)";
    formValidity = false;
  }
}

//function validates account creation
function validateCreateAccount(){
  var errorDiv = document.querySelector("#createAccount .errorMessage");
  var userNameElement = document.getElementById("username");
  var pass1Element = document.getElementById("pass1");
  var pass2Element = document.getElementById("pass2");
  var passWordMismatch = false;
  var invColor = "rgb(255,233,233)"

  userNameElement.style.background = "";
  pass1Element.style.background = "";
  pass2Element.style.background = "";
  errorDiv.style.display = "none";

  try{
      if((userNameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== "")){
        //If at least one fields contains text
        if(pass1Element.value === pass2Element.value){
            formValidity = true;
            passWordMismatch = false;
        }else{
          passWordMismatch = true;
          throw "Passwords do not match please reenter.";
          }
        }

        if((userNameElement.value !== "" && pass1Element.value === "" && pass2Element.value === "")){
          passWordMismatch = true;
          throw "You must enter a valid password.";
          }
        if((userNameElement.value !== "" && pass1Element.value !== "" && pass2Element.value === "")){
          passWordMismatch = true;
          throw "You must re-enter your password.";
          }

        if((userNameElement.value === "" && pass1Element.value === "" && pass2Element.value === "")){
          formValidity = true;
          passWordMismatch = true;
          }
    }catch(msg){
      errorDiv.innerHTML = msg;
      errorDiv.style.display = "block";
      if(passWordMismatch){
        userNameElement.style.background = "";
        pass1Element.style.background = invColor;
        pass2Element.style.background = invColor;
      }else{
        if(userNameElement.value === ""){
          userNameElement.style.background = invColor;
        }
        if(pass1Element.value === ""){
          pass1Element.style.background = invColor;
        }
        if(pass2Element.value === ""){
          pass2Element.style.background = invColor;
        }
          errorDiv.innerHTML = "";
      }//eoElse
      formValidity = false;

    }//eoCatch
}//eoCA

//function validates is numbers
function validateNumbers(){

  var ccNotNum;
  var cvvNotNum;
  var ccNumElement = document.getElementById("ccNum");
  var cvvElement = document.getElementById("cvv");
  var ccNumErrMsg = document.getElementById("ccNumErrorMessage");
  var cvvErrMsg = document.getElementById("cvvErrorMessage");

  try{
    if(isNaN(ccNumElement.value) || ccNumElement.value === ""){//cc not a num?
      ccNotNum = true;
    }else{
      ccNumElement.style.background = "";
      ccNumErrMsg.style.display = "none";
    }

    if(isNaN(cvvElement.value) || cvvElement.value === ""){ //cvv not a num?
      cvvNotNum = true;
    }else{
      cvvElement.style.background = "";
      cvvErrMsg.style.display = "none";
    }

    if(ccNotNum || cvvNotNum){
      throw "must contain numbers only."
    }
  }catch(msg){
      if(ccNotNum){//if cc isNaN
        ccNumElement.style.background = "rgb(255,233,233)";
        ccNumErrMsg.style.display = "block";
        ccNumErrMsg.innerHTML = "The card number " + msg;
      }

      if(cvvNotNum){//if cvv isNaN
        cvvElement.style.background = "rgb(255,233,233)";
        cvvErrMsg.style.display = "block";
        cvvErrMsg.innerHTML = "The cvv number " + msg;
      }
      formValidity = false;
  }
}//eovn

//Call all other validators and then validates
function validateForm(evt){
  if(evt.preventDefault){
    evt.preventDefault();  //Prevent form from submitting
  }else{
    evt.returnValue = false;  //for IE8
  }
  formValidity = false;

  validateAddress("billingAddress");
  validateAddress("deliveryAddress");
  validateDeliveryDate();
  validatePayment();
  validateMessage();
  validateCreateAccount();
  validateNumbers();

  if(formValidity === true){
    document.getElementById("errorText").innerHTML = "";
    document.getElementById("errorText").style.display = "none";
    document.getElementsByTagName("form")[0].submit();
  }else{
    document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order";
    document.getElementById("errorText").style.display = "block";
    scroll(0,0); //window scroll up to problem area
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //Create listeners
  function createEventListeners(){

    var phoneFields = document.getElementsByClassName("phone");

    for(var i = 0;i < phoneFields.length; i++){
      if(phoneFields[i].addEventListener){
        phoneFields[i].addEventListener("input",advancePhoneB, false);
      }//eoIf1
      else if(phoneFields[i].attachEvent){
        phoneFields[i].attachEvent("oninput",advancePhoneB)
      }
    }//eoFor1

    var phoneFields = document.getElementsByClassName("phoneD");

    for(var i = 0;i < phoneFields.length; i++){
      if(phoneFields[i].addEventListener){
        phoneFields[i].addEventListener("input",advancePhoneD, false);
      }//eoIf1
      else if(phoneFields[i].attachEvent){
        phoneFields[i].attachEvent("oninput",advancePhoneD)
      }
    }//eoFor1

    var form = document.getElementsByTagName("form")[0];

    if(form.addEventListener){
      form.addEventListener("submit",validateForm,false);
    }else if (form.attachEvent) {
      form.attachEvent("onsubmit",validateForm);
    }

    var same = document.getElementById("sameAddr");

    if(same.addEventListener){
      same.addEventListener("click",copyBillingAddress,false);
    }else if (same.attachEvent) {
      same.attachEvent("onclick",copyBillingAddress);
    }

    var deliveryMonth = document.getElementById('delivMo');

    if(deliveryMonth.addEventListener){
      deliveryMonth.addEventListener("change",updateDays,false);
    }else if (deliveryMonth.attachEvent) {
      deliveryMonth.attachEvent("onchange",updateDays);
    }

    var deliveryyear = document.getElementById('delivYr');

    if(deliveryyear.addEventListener){
      deliveryyear.addEventListener("change",updateDays,false);
    }else if (deliveryyear.attachEvent) {
      deliveryyear.attachEvent("onchange",updateDays);
    }

    var messageBox = document.getElementById('customText');
    if(messageBox.addEventListener){
      messageBox.addEventListener("blur",autoCheckCustom,false);
    }else if (messageBox.attachEvent) {
      messageBox.attachEvent("onblur",autoCheckCustom);
    }
  }//eoCEL

    function setUpPage(){
      setUpDays();
      createEventListeners();
      generatePlaceHolder();
    }

    if(window.addEventListener){
      window.addEventListener("load",setUpPage, false)
    }else if (window.attachEvent){
      window.attachEvent("onload",setUpPage)
    }
