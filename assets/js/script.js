
$(document).ready(intializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var gameCount = 0;
var accuracy = null;
var clickable = false;
// var images = ["RusswelWest.png", "stephCurry.png", "lebronJames.png", "Jamesharden.png", "AnthonyDavis.png", "Giannis.png", "zion.png", "kawhi.png", "kevindurant.png",
//   "RusswelWest.png", "stephCurry.png", "lebronJames.png", "Jamesharden.png", "AnthonyDavis.png", "Giannis.png", "zion.png", "kawhi.png", "kevindurant.png"
// ]
var imageClasses = ["Russel", "Steph", "Lebron", "Harden", "Davis", "Giannis", "zion", "kawhi", "Kd", "Russel", "Steph", "Lebron", "Harden", "Davis", "Giannis", "zion", "kawhi", "Kd"
]
var randomImages = [];

function intializeApp() {
 console.log("Initializing App...")
  randomizeCards();
  $(".cards" ).on("click", handleCardClick)
}

function randomizeCards(){
  for(var i = (imageClasses.length-1); i >= 0; i--){
  var randomIndex = Math.floor(Math.random() * (imageClasses.length))
  var player = imageClasses[randomIndex];
  imageClasses.splice(randomIndex, 1);
  randomImages.push(player)
  }
  generateCards();
}
function generateCards(){
  for(var i = 0; i < randomImages.length; i++){
    var container = $("<div>").addClass("container");
    var cards = $("<div>").addClass("cards");
    var front = $("<div>").addClass("front " + randomImages[i]);
    var back = $("<div>").addClass("back");
    cards.append(front,back);
    container.append(cards);
    $(".gamezone").append(container)
  }
}

function Reset() {
  $(".modal").addClass("hidden")
  $('.back').removeClass("hidden")
  $(".cards").on("click", handleCardClick)
  firstCardClicked = null;
  secondCardClicked = null;
}

function handleCardClick(event){
  event.stopPropagation()
  if(clickable){
    return
  }
  $(event.currentTarget).find(".back").addClass("hidden");
  if (firstCardClicked === null){
    firstCardClicked = $(event.currentTarget)
    $(firstCardClicked).off("click", handleCardClick)
    console.log("firstcard", firstCardClicked)
  } else{
    // debugger;
    secondCardClicked = $(event.currentTarget);
    $(secondCardClicked).off("click",  handleCardClick);
    console.log("secondCard")//checks if both cards match
    if($(firstCardClicked).find('.front').css('background-image')===
      $(secondCardClicked).find('.front').css('background-image')){
      $(firstCardClicked).find('.front').removeClass('hidden');
      $(secondCardClicked).find('.front').removeClass('hidden');
      matches++//increases matches
      attempts++;//increases attempts
      console.log("You have matched: ", matches)
      firstCardClicked = null;//resets cards to null
      secondCardClicked = null;

      if (matches === max_matches){
        $(".modal").removeClass("hidden")
        var theButton = $("#Button")
        theButton.on("click", Reset);
        resetStats();
        console.log("gamesplayed", gameCount);
      }


      } else{
        clickable = true;
        setTimeout(function(){
          $(firstCardClicked).find(".back").removeClass('hidden');
          $(secondCardClicked).find(".back").removeClass('hidden');
          $(firstCardClicked).on("click", handleCardClick);
          $(secondCardClicked).on("click", handleCardClick);
          firstCardClicked = null;//resets cards to null
          secondCardClicked = null;
          clickable = false;
        }, 1000);
          attempts++
      }
  } displayStats()

  $(".cards").bind("click", function(event){
    event.stopPropagation();
  })

}

function calculateAccuracy(){
  accuracy = ((matches/attempts)*100).toFixed(0) + "%";
  return accuracy
}


function displayStats (){
  $("#attemptCount").text(attempts);
  $("#GamesPlayedCount").text(gameCount);
  var accurate = calculateAccuracy()
  $("#AccuracyCount").text(accurate);
}

function resetStats(){
  matches = null;
  attempts = null;
  gameCount++
}
