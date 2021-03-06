/* ----------------------
   FileName: CSP.js
   Date: 9/13/16
   Author: Tyler Hunt
   ---------------------- */
 ///////////////////////////////////////////////////////////////////////////////
 //~~~~~~~~~~Chapter 7: Using Object Oriented Js - Photo Order~~~~~~~~~~~~~~~~//
 ///////////////////////////////////////////////////////////////////////////////
//"use strict"
function getLastModified(){
   var date = new Date(document.lastModified);
   var day = date.getDate();
   var month = date.getMonth();
   var months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"]
   var year = date.getFullYear();
   var dash = "-"
   var lastModifiedDate = day + dash + months[month] + dash + year
   return lastModifiedDate
 }

//portrait class
function protraitClass(buyer, portrait, picSize, copies,email){
 this.portrait = portrait;
 this.copies = copies;
 this.picSize = picSize;
 this.buyer = buyer;
 this.displayOrder = displayOutput;  //displayOutput method
}

//Create new order
function newOrder(){
  var isFormValid = validateForm();
  var createNewOrder = getValues();

  if(isFormValid){

    var createNewOrder1 = displayOutput(createNewOrder.buyer, createNewOrder.portrait,
                              createNewOrder.picSize, createNewOrder.copies, createNewOrder.email, createNewOrder.cost);
    //hide main form
    document.getElementById('main').style.display = 'none';
    scroll(0,0);
  }
}//eoNO

//Validate form
function validateForm(){
    var isFormValid = false;

    var isQuantityValid = validateQuantity();
    var isOrderSelectionValid = validateOrderSelect();
    var isSelectImageValid = validateSelectImage();
    var isOrderInfoValid = validateOrderInfo();

    //check if form is valid
    if(isOrderInfoValid == true && isQuantityValid == true &&
      isSelectImageValid == true && isOrderSelectionValid == true){

      isFormValid = true;

      return isFormValid;
    }
 }//eoVF

//Validate form sections
function validateOrderInfo(){
  var isValid = false;
  var nameValid = false;
  var emailValid = false;
  var name = document.getElementById("nameinput").value;
  var email = document.getElementById("emailinput").value;
  var nameError = document.getElementById('nameError');
  var emailError = document.getElementById('emailError');

  if(email !== ''){
    emailValid = true;
    document.getElementById("emailinput").style.background = "white";
    emailError.innerHTML = "";
  }else{
    document.getElementById("emailinput").style.background = "rgb(255,255,224)";
    document.getElementById("emailinput").focus();
    emailError.innerHTML = "Error: You must select a valid email!";
  }

  //validate name field
  if(name !== ''){
    nameValid = true;
    document.getElementById("nameinput").style.background = "white";
    nameError.innerHTML = "";
  }else{
    document.getElementById("nameinput").style.background = "rgb(255,255,224)";
    document.getElementById("nameinput").focus();
    nameError.innerHTML = "Error: You must enter a name!"

  }

  if(nameValid == true && emailValid == true ){
    isValid = true;
  }

  return isValid;
}//eoVOI

function validateQuantity(){
      var isValid = false;
      var qtyBox =   document.getElementById("qtyinput")
      var qtyBoxError =   document.getElementById("qtyError")

      var qty = document.getElementById("qtyinput").value;
        parseInt(qty);

        //validate qty field
        if(qty !== '' && !isNaN(qty)){
          if(qty > 0  && qty < 26){
            isValid = true;
            document.getElementById("qtyinput").style.background = "white";
            qtyBoxError.innerHTML = "";
          }else if(qty < 0 || qty > 25){
            //inline comment
            qtyBox.style.background = "rgb(255,255,224)";
            qtyBox.focus();
            qtyBoxError.innerHTML = "Error: You must enter a value greater than 0 and less that 26!";
          }
        }else{
          //inline comment
            qtyBox.style.background = "rgb(255,255,224)";
            qtyBox.focus()
            qtyBoxError.innerHTML = "Error: You must enter a valid numerical quantity!";
        }

      return isValid;
    }//eoVQ

function validateSelectImage(){
  var isValid = false;
  var imagesSelected = 0;
  var imgSelect = document.getElementsByName('rdo_imageSelect');
  var imgSelectError = document.getElementById('imgSelectError')

  //count num selected rdoBox
  for(var i = 0; i < 2; i++){
    if(imgSelect[i].checked){
      imagesSelected +=1;
    }
  }
  //Mark accordingly
  if(imagesSelected === 0){
    for(var i = 0; i < 2; i++){
      imgSelect[i].style.outline = "1px solid red";
    }
    imgSelectError.innerHTML = "Error: You must select an image option!";
  }else if(imagesSelected > 0){
    for(var i = 0; i < 2; i++){
      imgSelect[i].style.outline = "";
    }
    imgSelectError.innerHTML = "";
    isValid = true;
  }
  return isValid;
}//endVSI

function validateOrderSelect(){
  var isValid = false;
  var ordersSelected = 0;
  var orderSelect = document.getElementsByName('rdo_orderSelect');
  var optionError = document.getElementById('optionError');

  //count num selected rdoBox
  for(var i = 0; i < 5; i++){
    if(orderSelect[i].checked){
      ordersSelected +=1;
    }
  }
  //Mark accordingly
  if(ordersSelected === 0){
    for(var i = 0; i < 5; i++){
      orderSelect[i].style.outline = "1px solid red";
    }
    optionError.innerHTML = "Error: You must select a portrait option!";
  }else if(ordersSelected > 0){
    for(var i = 0; i < 5; i++){
      orderSelect[i].style.outline = "";
    }
    optionError.innerHTML = "";
    isValid = true;
  }
  return isValid;
}//endVSI

//get value and return obj
function getValues(){
  //Get values from form
  var getName = document.getElementById('nameinput').value;
  var getQty = document.getElementById('qtyinput').value;
  var getEmail = document.getElementById('emailinput');
  var getSelectedImg = "";
  var getOrderPicSize = "";

  //Get selected image rdoBox index
  var imgSelect = document.getElementsByName('rdo_imageSelect');
  for(var i = 0; i < 2; i++){
    if(imgSelect[0].checked){
      getSelectedImg = "Grand Canyon 2016 - Family Picture";
    }else{
      getSelectedImg = "Grand Canyon 2016 - Couple's Picture";
    }
  }

  //Get orderd image rdoBox index
  var orderSelect = document.getElementsByName('rdo_orderSelect');
  for(var i = 0; i < 5; i++){
    if(orderSelect[0].checked){
      getOrderPicSize = "4 wallet size pictures";
    }else if(orderSelect[1].checked){
        getOrderPicSize = "2 4x6 pictures";
    }else if(orderSelect[2].checked){
        getOrderPicSize = "1 5x7 picture";
    }else if(orderSelect[3].checked){
        getOrderPicSize = "1 8x10 picture";
    }else{
      getOrderPicSize = "1 11x14 picture";
    }
  }

  //Create new portrait class
  var newOrder = new protraitClass(getName, getSelectedImg, getOrderPicSize, getQty);

  //Add email to class
  newOrder.email = getEmail.value;

  //calc cost and add to class
  var costDue = calcCost(getQty);
  newOrder.cost = costDue.toFixed(2);

  return newOrder;
}//eoGV

function calcCost(qty){
  return qty * 10;
}

function displayOutput(buyer, portrait, picSize, copies, email, cost){

  var selectedImage = "";
  if(portrait === "Grand Canyon 2016 - Family Picture"){
    selectedImage = "../images/IMG_03sm.jpg";
  }else if(portrait === "Grand Canyon 2016 - Couple's Picture"){
    selectedImage = "../images/IMG_04sm.jpg"
  }

    var submitForm = '  <div class="panel panel-primary">';
            submitForm +='<div class="panel-heading"><h2>' + buyer + ' - Order Details</h2></div>';
                submitForm +='<div class="panel-body">';
                submitForm += '<article>';
                submitForm += '<div class="col-md-12"><!--Pic 1-->';
                  submitForm += '<legend>' +portrait+ '</legend>';
                    submitForm += '<figure id="fig5">';
                      submitForm += '<img src='+ selectedImage+' width="250" height="175" alt="Grand Canyon Family"/>'; //will ned to change pic as variable
                    submitForm += '</figure><br>';
                submitForm += '</div>';

                submitForm += '<div class="col-md-12"><!--Order Details-->';
                  submitForm += '<legend><strong>Order Details</strong></legend>';
                    submitForm += '<figure id="fig5">';
                      submitForm += '<div class="customOutput"><p> <strong>Name:</strong> ' + buyer +'</p></div>';
                      submitForm += '<div class="customOutput"><p> <strong>Portrait:</strong> ' + portrait +'</p></div>';
                      submitForm += '<div class="customOutput"><p> <strong>Package:</strong> ' + picSize +'</p></div>';
                      submitForm += '<div class="customOutput"><p> <strong>Number of Copies:</strong> ' + copies +'</p></div>';
                      submitForm += '<hr>';
                      submitForm += '<div class="customOutput"><p> <strong>Total Cost Due: </strong> $' + cost  +'</p></div>';
                    submitForm += '</figure><hr>';
                    submitForm += '<input type="button" onClick="history.go(0)" Value="Return Home">';
                submitForm += '</div>';
                submitForm += '</article>'
            submitForm += '</div>'
          submitForm += '</div>'

          var finalform = document.getElementById('submittedOrderFrom');
          finalform.innerHTML =  finalform.innerHTML += submitForm;
}

//~~~~~~~~~~Chapter 7: Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

var submitButton = document.getElementById("submitBtn");
try{
    if(submitButton.addEventListener){
      submitButton.addEventListener("click", newOrder, false);
    }else if (submitButton.attachEvent){
      submitButton.attachEvent("onclick", newOrder);
    }
}catch(msg){
  console.log("submitBtn listener error?");
}


///////////////////////////////////////////////////////////////////////////////
//~~~~~~~~~~Chapter 4: Debug~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
///////////////////////////////////////////////////////////////////////////////
//Functiuon call to setup page
function setUpPage(){
    displayHeader();
    displayFooter();
    displaySideBar();
    createEventListeners();
}

///////////////////////////////////////////////////////////////////////////////
//~~~~~~~~~~~Chapter 3: Control Flow - Prime Numbers~~~~~~~~~~~~~~~~~~~~~~~~~//
///////////////////////////////////////////////////////////////////////////////
var result = true;

function validateInput() {
    var result = true;

    //Get form values
    var startNum = document.forms['cFlowForm'].txt_startValue.value;
    var endNum = document.forms['cFlowForm'].txt_endValue.value;

    //Validate input
    if (startNum === null || startNum === "" || startNum <= 0
       || endNum <= startNum || endNum === null || endNum === ""
       || endNum <= 0) {
        //Change result to false
        result = false;

        //Display message
        alert("You must enter correct values in the input fields!" +
              "\n\t1) The start number has to be greater than 0" +
              "\n\t2) The end number has to greater than 0" +
              "\n\t" + '     ' + "and greater than the start number" +
              "\n\t3) The end number has to be greater" +
              "\n\t" + '     ' + "than the start number ");
        //Clear form
        clear_cFlowForm();
    }
    return result;
}//end of ValidateInput function

//function to determine if numbers are prime & add them to an Array
function displayPrimeNumbers() {
    var isPrimeArr = [];
    var inputIsValid = validateInput();
    //inputIsValid ? console.log('Input is valid'):console.log('Input not valid'); //todo Will remove later

    var startNum = document.forms['cFlowForm'].txt_startValue.value;
    var endNum = document.forms['cFlowForm'].txt_endValue.value;

    if (inputIsValid) {
        for (var i = startNum; i <= endNum; i++) {
            if (isPrime(i) && i > 2) {
                isPrimeArr.push(i);
            }
        }
        createTable(isPrimeArr);
    }
}// end of display Prime numbers function

//Helper function to determine if number is prime
function isPrime(num) {
    if (num < 2) return false;
    var comp = Math.floor(Math.sqrt(num));

    for (var i = 2; i <= comp; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}//end of isPrime function

//Function to clear Contorl form input values
function clear_cFlowForm() {
    document.forms['cFlowForm'].txt_startValue.value = "";
    document.forms['cFlowForm'].txt_endValue.value = "";
    console.log('Form reset');
}

//Function to create dynamic table pass in Array
function createTable(primeTable) {
    var numCells = 1;
    var rowMax = 10;
    var tableMax = 100;

    var myWindow = window.open('', '', 'fullscreen=yes', false)
    myWindow.document.write("<h1>Display Prime Numbers</h1><br>");
    myWindow.document.write("<table>");
    myWindow.document.write("<tr>");

    //Populate table
    for (var i = 0; i < tableMax; i++) {
        if (!isNaN(primeTable[i]))
            myWindow.document.write("<td>" + primeTable[i] + "</td>");

        if (numCells === rowMax) {
            myWindow.document.write("</tr><tr>");
            numCells = 0;
        }
        ++numCells;
    }

    myWindow.document.write("</tr>");
    myWindow.document.write("</table><br>");
    myWindow.document.write("<a href='../pages/primeNumGen.html'>Return to previous page</a>");
    document.close()
}


///////////////////////////////////////////////////////////////////////////////
//~~~~~~~~~~~Lesson 2: Functions - BMI Calculator ~~~~~~~~~~~~~~~~~~~~~~~~~~~//
///////////////////////////////////////////////////////////////////////////////
//Function to calculate BMI
function calcBMI(){
    //get values from functions page
    var weight = document.getElementById('txt_bmiWeight').value;
    var height = document.getElementById('txt_bmiHeight').value;

    //Calculate bmi if input fields are valid
    var bmi;
    if (weight > 0 && weight !== ""
       && height > 0 && height !== "") {
        bmi = Math.round((weight * 703) / (height * height));
    } else {
        alert("Please enter a valid number for each text field.");
        clearALL();
    }

    //Put BMI value back into form
    document.getElementById('txt_bmiCalculated').value = parseInt(bmi);

    //Clear the values in the Weight & Height txt boxes
    document.getElementById('txt_bmiWeight').value = null;
    document.getElementById('txt_bmiHeight').value = null;

}

//Clear the BMI text box if user adds a new weight
function clearBMI() {
    document.getElementById('txt_bmiHeight').value = "";
}

//Function to clear all text fields
function clearALL() {
    document.getElementById('txt_bmiWeight').value = "";
    document.getElementById('txt_bmiHeight').value = "";
    document.getElementById('txt_bmiCalculated').value = "";
}


///////////////////////////////////////////////////////////////////////////////
//~~~~~~~~~~~Page Setup Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
///////////////////////////////////////////////////////////////////////////////
//function display header
function displayHeader(){

  var headerContent =  '<nav class="navbar navbar-inverse navbar-fixed-top ">'
      headerContent += '    <div class="container">'
      headerContent += '        <div class="navbar-header"></div>'
      headerContent += '        <div id="navbar" class="navbar-collapse collapse"></div>  <!--/.navbar -->'
      headerContent += '    <ul class="list-unstyled">'
      headerContent += '        <li><a class="navbar-brand" href="../pages/index.html"><strong>HOME</strong></a></li> '
      headerContent += '        <li><a class="navbar-brand" href="../pages/functions.html">FUNCTIONS</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="../pages/primeNumGen.html">CONTROL FLOW</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="../pages/debug.html">DEGUB CODE</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="../pages/DOM.html">DOM/DHTML</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="../pages/forms.html">FORMS</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="../pages/objects.html"> OBJECTS</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="#"> CSP8</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="#"> CSP9</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="#"> CSP10</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="#"> CSP11</a></li>'
      headerContent += '        <li><a class="navbar-brand" href="#"> CSP12</a></li></ul>'
      headerContent += '    </div>'
      headerContent += '</nav>'
      headerContent += '<!-- Main jumbotron -->'
      headerContent += '  <div class="jumbotron">'
      headerContent += '        <div class="container">'
      headerContent += '        <h2><span class="glyphicon glyphicon-king" aria-hidden="true"></span>  Tyler Hunt\'s <code>CS-2513 JavaScript Website</code> </h2>'
      headerContent += '        </div>'
      headerContent += '  </div>'
      headerContent += '  <!-- Main jumbotron -->'

  var pageHeader = document.getElementsByTagName('header');
  pageHeader[0].innerHTML = headerContent;
}

//function display sideBar
function displaySideBar() {

   var sideBarContent = ' <div>'
      sideBarContent += '    <ul class="list-unstyled">'
      sideBarContent += '        <li><a class="navbar-brand" href="../pages/index.html"><strong>Home</strong></a></li> '
      sideBarContent += '        <li><a class="navbar-brand" href="../pages/functions.html">Functions</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="../pages/primeNumGen.html">Control Flow</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="../pages/debug.html">Debug Code</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="../pages/DOM.html">DOM/DHTML</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="../pages/forms.html">Forms</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="../pages/objects.html"> Objects</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="#"> CSP 08</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="#"> CSP 09</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="#"> CSP 10</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="#"> CSP 11</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="#"> CSP 12</a></li>'
      sideBarContent += '    </ul>'
      sideBarContent += ' </div><br><br><br><br><br>'

      var pageSideBar = document.getElementById('sideBar');
      pageSideBar.innerHTML =  pageSideBar.innerHTML += sideBarContent;
      //FYI - I moved the nav to a fancy sidebar so I have to use the getElementById
      // to place the Nav contents here
}

//function display footer
function displayFooter() {
    var dateLastModified = getLastModified();
     var footerContent = '<nav class="navbar navbar-default ">'
        footerContent += '    <div class="container">'
        footerContent += '         <div class="row" id="footerDisclaimer">'
        footerContent += '                <div class="col-lg-4">'
        footerContent += '                    <p>Contact: <a href="mailto:tyler.hunt@my.occc.edu">tyler.hunt@my.occc.edu</a></p>'
        footerContent += '         </div>'
        footerContent += '             <div class="col-lg-8">'
        footerContent += '                 <p>Oklahoma City Community College does not necessarily endorse the content or respective links of this page</p>'
        footerContent += '             </div>'
        footerContent += '        </div> <!-- /Left footer containers -->'
        footerContent += '        <div class="row">'
        footerContent += '            <div class="col-lg-4">'
        footerContent += '              <p>Tyler Hunt - CS2513 JavaScript Website</p>'
        footerContent += '            </div>'
        footerContent += '        <div class="col-lg-8">'
        footerContent += '            <p>Last Updated: ' + dateLastModified+ '</p>'
        footerContent += '        </div>'
        footerContent += '        </div> <!-- /Right footer containers -->'
        footerContent += '    </div> <!-- /footer container -->'
        footerContent += ' </nav>'


          var pageFooter = document.getElementsByTagName('footer');
          pageFooter[0].innerHTML = footerContent;
}

///////////////////////////////////////////////////////////////////////////////
//~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
///////////////////////////////////////////////////////////////////////////////
//function create listeners
function createEventListeners(){

  //~~~~~~~~~~~~~~~Lesson 3 - Event Listeners~~~~~~~~~~~~~~~~~~//
  //Event Listeners - backward compatible
  //Event Listener for the reset button
  var reset = document.getElementById('btn_reset');

  try{
      if (reset.addEventListener) {
          reset.addEventListener("click", clear_cFlowForm, false);
      } else if (reset.attachEvent) {
          reset.attachEvent("onclick", clear_cFlowForm);
      }
  }catch(err){
      console.log("Reset event error !" + err.message)
  }

  //Event Listener for the displayPrimeNumbers button
  var getPrimes = document.getElementById('btn_getPrimes');

  try{
    if (getPrimes.addEventListener) {
        getPrimes.addEventListener("click", displayPrimeNumbers, false);
    } else if (getPrimes.attachEvent) {
        getPrimes.attachEvent("onclick", displayPrimeNumbers);
    }
  }catch(err){
      console.log("Primes event error !" + err.message)
  }
  //~~~~~~~~~~~~~~~Lesson 2 - Event Listeners~~~~~~~~~~~~~~~~~~~//
  //Event Listener for the Calculate BMI button
  var calc_BMI = document.getElementById('btn_calculate');

  try{
    if (calc_BMI.addEventListener) {
        calc_BMI.addEventListener("click", calcBMI, false);
    } else if (calc_BMI.attachEvent) {
        calc_BMI.attachEvent("onclick", calcBMI);
    }
  }catch(err){
      console.log("BMI event error!" + err.message)
  }
}

 ///////////////////////////////////////////////////////////////////////////////
 //~~~~~~~~~~Window Load handler~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
 ///////////////////////////////////////////////////////////////////////////////
 if(window.addEventListener){
     window.addEventListener("load",setUpPage,false);
 }else if (window.attachEvent){
     window.attachEvent("onLoad",setUpPage);
 }
