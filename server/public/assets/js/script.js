$(document).ready(intializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var gameCount = 0;
var accuracy = null;
var clickable = false;
var randomImages = [];

function intializeApp() {
  randomizeCards();
  $(".cards").on("click", handleCardClick)
}

function randomizeCards() {
  var imageClasses = ["Russel", "Steph", "Lebron", "Harden", "Davis", "Giannis", "zion", "kawhi", "Kd", "Russel", "Steph", "Lebron", "Harden", "Davis", "Giannis", "zion", "kawhi", "Kd"
  ]
  for (var i = (imageClasses.length - 1); i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (imageClasses.length))
    var player = imageClasses[randomIndex];
    imageClasses.splice(randomIndex, 1);
    randomImages.push(player)
  }
  generateCards();
}
function generateCards() {
  for (var i = 0; i < randomImages.length; i++) {
    var container = $("<div>").addClass("container");
    var cards = $("<div>").addClass("cards");
    var front = $("<div>").addClass("front " + randomImages[i]);
    var back = $("<div>").addClass("back");
    cards.append(front, back);
    container.append(cards);
    $(".gamezone").append(container)
  }
}

function Reset() {
  matches = null;
  attempts = 0;
  gameCount++
  displayStats()
  $(".gamezone").empty();
  $(".modal").addClass("hidden")
  randomImages = [];
  intializeApp();
  clickable = false;
}

function handleCardClick(event) {
  event.stopPropagation()
  if (clickable) {
    return
  }
  $(event.currentTarget).find(".back").addClass("hidden");
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget)
    $(firstCardClicked).off("click", handleCardClick);
  } else {
    secondCardClicked = $(event.currentTarget);
    $(secondCardClicked).off("click", handleCardClick);
    if ($(firstCardClicked).find('.front').css('background-image') ===
      $(secondCardClicked).find('.front').css('background-image')) {
      $(firstCardClicked).find('.front').removeClass('hidden');
      $(secondCardClicked).find('.front').removeClass('hidden');
      matches++;
      attempts++;
      firstCardClicked = null;
      secondCardClicked = null;
      if (matches === max_matches) {
        clickable = true;
        setTimeout(function () {
          $("#submitScoreModal").removeClass("hidden")
          $("#enterScore").on("click", submitScore)
        }, 1000);
      }
    } else {
      clickable = true;
      setTimeout(function () {
        $(firstCardClicked).find(".back").removeClass('hidden');
        $(secondCardClicked).find(".back").removeClass('hidden');
        $(firstCardClicked).on("click", handleCardClick);
        $(secondCardClicked).on("click", handleCardClick);
        firstCardClicked = null;
        secondCardClicked = null;
        clickable = false;
      }, 1000);
      attempts++
    }
  } displayStats()

  $(".cards").bind("click", function (event) {
    event.stopPropagation();
  })

}

function calculateAccuracy() {
  accuracy = ((matches / attempts) * 100).toFixed(0);
  if (isNaN(accuracy)) {
    accuracy = "0";
  }
  return (accuracy + "%")
}


function displayStats() {
  $("#attemptCount").text(attempts);
  $("#GamesPlayedCount").text(gameCount);
  var accurate = calculateAccuracy()
  $("#AccuracyCount").text(accurate);
}

function submitScore() {
  var score = $("#attemptCount").text()
  var name = $("#userName").val();
  var highScoreData = {
    "name": name,
    "score": score
  }
  var scoreData = [];
  scoreData.push($.post("/api/addScore.php", JSON.stringify(highScoreData)));
  Promise.allSettled(scoreData).then(getScores);
}

function getScores() {
  $.get("/api/getHighScores.php", function (data) {
    $("#submitScoreModal").addClass("hidden");
    $("#highScoreModal").removeClass("hidden");
    var scoreTable = $("<table>");
    var tableRow = $("<tr>")
    var rank = $("<th>").text("Rank");
    var name = $("<th>").text("Name");
    var score = $("<th>").text("Score");
    $(tableRow).append(rank, name, score);
    $(scoreTable).append(tableRow);
    var currentRank = 1;
    var dataRow = null;
    var playAgain = $("<button>").text("Play Again").on("click", Reset).addClass("playAgain");

    for (var i = 0; i < data.length; i++) {
      var dataRank = $("<td>").text(currentRank);
      var dataName = $("<td>").text(data[i].name);
      var dataScore = $("<td>").text(data[i].score);
      dataRow = $("<tr>").append(dataRank, dataName, dataScore);
      currentRank++
      $(scoreTable).append(dataRow);
    }
    $("#highScoreModal").css({ "padding-top": "0px", "text-align": "center", "font-family": "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande'" }).text("TOP FIVE SCORES:")
    $("#highScoreModal").append(scoreTable, playAgain);

  });
}
