
$(document).ready(intializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 1;
var attempts = 0;
var gameCount = 0;
var accuracy = null;
var clickable = false;

var randomImages = [];

function intializeApp() {
 console.log("Initializing App...")
  randomizeCards();
  $(".cards" ).on("click", handleCardClick)
}

function randomizeCards(){
  var imageClasses = ["Russel", "Steph", "Lebron", "Harden", "Davis", "Giannis", "zion", "kawhi", "Kd", "Russel", "Steph", "Lebron", "Harden", "Davis", "Giannis", "zion", "kawhi", "Kd"
  ]
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
  $(".gamezone").empty();
  $(".modal").addClass("hidden")
  randomImages=[];
  intializeApp();
  clickable = false;


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
    console.log("firstcard yooo", firstCardClicked)
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
        clickable = true;
        $(".modal").removeClass("hidden")
        $("#enterScore").on("click", submitScore)

        var theButton = $("#Button")////will be displayed after user has entered info
        // theButton.on("click", Reset)
        // resetStats();
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
  accuracy = ((matches/attempts)*100).toFixed(0);
  if(isNaN(accuracy)){
    accuracy = "0%";
  }
  return (accuracy + "%")
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

function submitScore(){
  var score = $("#attemptCount").text()
  var name = $("#userName").val();
  console.log("the name is ", name)
  console.log("attempts are", $("#attemptCount").text())
  var highScoreData = {
    "name" : name,
    "score" : score
    }

  console.log("score data is ", highScoreData);
  var scoreData =[];
  scoreData.push($.post("server/public/api/addScore.php", JSON.stringify(highScoreData)));
  Promise.allSettled(scoreData).then(getScores());
  // getScores();
}

function getScores(){
  $.get("server/public/api/getHighScores.php", function (data) {
    console.log(data.length)
    $(".modal").empty();


    var scoreContainer = $("<ol>").css({"display":"flex" , "align-items":"flex-start", "flex-direction" : "column"});
    var spacing = ({ "justify-content": "space-evenly"})
    for(var i = 0; i < data.length; i++){
      var listScores = $("<li>").css(spacing);
      var name = data[i].name;
      var score = data[i].score;
      listScores.text("name: " + name + " " + "score: " + score)
      $(scoreContainer).append(listScores)
    }
    $(".modal").css({ "padding-top": "0px", "text-align":"center" }).text("TOP TEN SCORES:")
    $(".modal").append(scoreContainer)
  });
}
