//set up some global variable placeholders
var player = [];
var computer = [];
var playerCardImg = "";
var computerCardImg = "";
var cards = [];

$(document).ready( function(){
    //custom plugin to update the scoreboard
    jQuery.fn.extend({
        scoreboard: function () {
            $('#player-score').text('Player: ' + playerScore);
            $('#computer-score').text('Computer: ' + computerScore);
        }
    });
    
    //update the scoreboard
    $('body').scoreboard();
    
    //monitor scoreboard to enable/disable buttons
    setInterval(function () {
        if (playerScore === 0 && computerScore === 0) {
            $('#play-button').addClass("disabled");
        } else {
            $('#start-button').addClass("disabled");
            $('#play-button').removeClass("disabled");
        }

    },500); //Ends setInterval

    //Shuffle and deal the cards on start button click
    $('#start-button').click(function() {
        start();
        playerScore = player.length;
        computerScore = computer.length;
        $('body').scoreboard();
        $('#status').text('Round Status: Click play to begin');
    });

    //Play hand on Play button click
    $('#play-button').click(function() {
        x = play();
        $("#playerCard").attr("src", playerCardImg);
        $("#computercard").attr("src", computerCardImg);

        //Update round status:
        if (x == "war"){
            $('#status').text('Round Status: WAR!!!').css('color', 'red');
        } else if( x == "player"){
            $('#status').text('Round Status: WIN').css('color', 'black');
        } else if( x == "computer"){
            $('#status').text('Round Status: LOSS').css('color', 'black');
        } else if( x == "game"){
            $('#status').text('Round Status: That\'s Game!').css('color','black');
        }

        //update the scoreboard
        playerScore = player.length;
        computerScore = computer.length;
        $('body').scoreboard();
    });

});

