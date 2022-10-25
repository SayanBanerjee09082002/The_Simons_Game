var level = 1;
var started = false;
var sequence = [];
var response = [];
var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function () {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + level);
        sequencer();
    }
});

function sequencer() {
    response = [];
    $("#level-title").text("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomNumber];
    sequence.push(randomColour);
    $("#" + randomColour)
        .fadeIn(100)
        .fadeOut(300)
        .fadeIn(100);
    playSound(randomColour);
}

$(".btn").click(function () {
    var responseColour = $(this).attr("id");
    response.push(responseColour);
    animatePress(responseColour);
    playSound(responseColour);
    checkAnswer(response.length - 1);
});

function checkAnswer(currentLevel) {
    if (sequence[currentLevel] === response[currentLevel]) {
        if (sequence.length === response.length) {
            setTimeout(function () {
                sequencer();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        restart();
    }
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function restart() {
    level = 1;
    sequence = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}