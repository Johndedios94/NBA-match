
$(document).ready(intializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var gameCount = 0;
var accuracy = null;
var clickable = false;


function intializeApp() {
 console.log("Initializing App...")
  $(".cards" ).on("click", handleCardClick)
}

function Reset() {
  $(".modal").addClass("hidden")
  $('.back').removeClass("hidden")
  $(".cards").css("pointer-events", "auto")
}

function handleCardClick(event){
  if(clickable){
    return
  }
  $(event.currentTarget).find(".back").addClass("hidden");
  if (firstCardClicked === null){
    firstCardClicked = $(event.currentTarget);
    $(firstCardClicked).off("click", handleCardClick)
    console.log("firstcard")
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
      // $(".cards").on("click", handleCardClick);
      // $(".cards").off("click", ".front", handleCardClick);
      // $(".front").css("pointer-events", "none")
      // $(firstCardClicked).css("pointer-events", "none")
      // $(secondCardClicked).css("pointer-events", "none")
      firstCardClicked = null;//resets cards to null
      secondCardClicked = null;
      // clickable = false;

      if (matches === max_matches){
        $(".modal").removeClass("hidden")
        var theButton = $("#Button")
        theButton.on("click", Reset);
        resetStats();
        console.log("gamesplayed", gameCount);
      }


      } else{
        clickable = true;
      // $(".back").off("click", handleCardClick)
        setTimeout(function(){
          $(firstCardClicked).find(".back").removeClass('hidden');
          $(secondCardClicked).find(".back").removeClass('hidden');
          // $(".cards").on("click", handleCardClick)
          $(firstCardClicked).on("click", handleCardClick);
          $(secondCardClicked).on("click", handleCardClick);
          // $(".cards").css("pointer-events", "auto")
          // $(".front").css("pointer-events", "none")
          // $(".cards").on("click", handleCardClick)
          firstCardClicked = null;//resets cards to null
          secondCardClicked = null;
          clickable = false;
        }, 1000);
          attempts++
      }
  } displayStats()
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
