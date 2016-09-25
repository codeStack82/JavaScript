/* ----------------------
   FileName: CSP.js
   Date: 9/13/16
   Author: Tyler Hunt
   ---------------------- */
 ///////////////////////////////////////////////////////////////////////////////
 //~~~~~~~~~~Window Load handler~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
 ///////////////////////////////////////////////////////////////////////////////
 if(window.addEventListener){
     window.addEventListener("load",setUpPage,false);
 }else if (window.attachEvent){
     window.attachEvent("onLoad",setUpPage);
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
      headerContent += '    </div>'
      headerContent += '</nav>'
      headerContent += '<!-- Main jumbotron -->'
      headerContent += '  <div class="jumbotron">'
      headerContent += '        <div class="container">'
      headerContent += '        <h2><span class="glyphicon glyphicon-king" aria-hidden="true"></span>  Tyler Hunt\'s <code>CS-2513 JavaScripter Website</code> </h2>'
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
      sideBarContent += '        <li><a class="navbar-brand" href="#"> CSP 06</a></li>'
      sideBarContent += '        <li><a class="navbar-brand" href="#"> CSP 07</a></li>'
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
        footerContent += '            <p>Last Updated: ' + document.lastModified + '</p>'
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
