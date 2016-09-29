/*
Set variables for the DOM elements
(commenting the buttons with 'click' just to set them apart from the results)
*/

var quizIntro      = document.getElementById('quizintro'),
    startQuiz      = document.getElementById('startquiz'),
    quesOne        = document.getElementById('q1'),
    imAmer         = document.getElementById('goq1a1'),
    imNotAmer      = document.getElementById('goq1a2'),
    quesOneAnsOne  = document.getElementById('q1a1'),
    quesOneAnsTwo  = document.getElementById('q1a2'),
    omfgNo         = document.getElementById('goq21'),
    okayFine       = document.getElementById('goq22'),
    quesTwo        = document.getElementById('q2'),
    driverA        = document.getElementById('drivera'),
    driverB        = document.getElementById('driverb'),
    quesTwoAnsOne  = document.getElementById('q2a1'),
    enlightenMe    = document.getElementById('enlightenme'),
    quesTwoAnsOneB = document.getElementById('q2a1b'),
    quesTwoAnsTwo  = document.getElementById('q2a2'),
    notDone        = document.getElementById('notdone');

/*
We need to hide our small size, temp GIFs if there is no JS
*/
var nojsimg_0 = document.getElementsByTagName('img')[0];
    nojsimg_1 = document.getElementsByTagName('img')[1];
    nojsimg_2 = document.getElementsByTagName('img')[2];
    
    nojsimg_0.classList.remove('nshide');
    nojsimg_1.classList.remove('nshide');
    nojsimg_2.classList.remove('nshide');

/*
Scenario 1: 
User's browser is JS-enabled:
Immediately add .fade class to hide everything we need hidden, 
until the user has started the quiz.

Scenario 2:
User's browser is NOT JS-enabled, or its turned off:
None of this is in play, and CSS :target selectors handle the show-hide.
See _project.scss for more info.
*/

// Add the .fade classes

var faders = [
    quesOne, 
    quesOneAnsOne, 
    quesOneAnsTwo, 
    quesTwo, 
    quesTwoAnsOne, 
    quesTwoAnsOneB, 
    quesTwoAnsTwo
];

function addFaderClasses(faders) {
  for ( i=0; i<faders.length; i++ ) {
    (faders[i]).classList.add('fade');
  }
}

addFaderClasses(faders);

// Show hide functions

var addFade = function(e){
  e.classList.add('fade--in');

  setTimeout(function() {
    e.classList.add('fade--ingo');
  }, 125);
    
}

var removeFade = function(e){
  e.classList.remove('fade--in');
}

var hideIt = function (e) {
  e.style.display = 'none';
}

/*
Individual functions, based on click events, that call 
all the necessary show-hide functions per DOM element.
*/

var startQuizF = function(){
  addFade(quesOne);
  hideIt(quizIntro);
}

var americanYesF = function(){
  addFade(quesOneAnsOne);
  removeFade(quesOneAnsTwo);
  hideIt(quesOne);
}

var americanNoF = function(){
  addFade(quesOneAnsTwo);
  removeFade(quesOneAnsOne);
  hideIt(quesOne);
}

var omfgNoF = function(){
  addFade(quesTwo);
  hideIt(quesOneAnsOne);
}

var okayFineF = function(){
  addFade(quesTwo);
  hideIt(quesOneAnsTwo);
}

var driverAF = function(){
  addFade(quesTwoAnsOne);
  removeFade(quesTwoAnsTwo);
  hideIt(quesTwo);
}

var driverBF = function(){
  addFade(quesTwoAnsTwo);
  removeFade(quesTwoAnsOne);
  removeFade(quesTwoAnsOneB);
  hideIt(quesTwo);
  hideIt(notDone);
}

var enlightenMeF = function(){
  addFade(quesTwoAnsOneB);
  hideIt(notDone);
}

// Add the click events

startQuiz.addEventListener( "click", startQuizF );
imAmer.addEventListener( "click", americanYesF );
imNotAmer.addEventListener( "click", americanNoF );

omfgNo.addEventListener( "click", omfgNoF );
okayFine.addEventListener( "click", okayFineF );

driverA.addEventListener( "click", driverAF );
driverB.addEventListener( "click", driverBF );

enlightenMe.addEventListener( "click", enlightenMeF );
