//set up some global variable placeholders
var player = [];
var computer = [];
var playerCardImg = "";
var computerCardImg = "";
var modalText = "";
var cardThumbs = [];


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
        if (playerScore === 0 || computerScore === 0) {
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
            $('.modal-body').text(modalText).append("<br />");
            $.each(cardThumbs, function ( index, value ){
               $('.modal-body').append("<img class=\"cards-thumbs\" src=" + value + ">")
            });
            $('#warModal').modal('show');
        } else if( x == "player"){
            $('#status').text('Round Status: WIN').css('color', 'black');
            playerScore = 0;
        } else if( x == "computer"){
            $('#status').text('Round Status: LOSS').css('color', 'black');
        } else if( x == "game"){
            $('#status').text('Round Status: That\'s Game!').css('color','black');
            $('.modal-body').text(modalText)
            $('#gameModal').modal('show');
        }

        //update the scoreboard
        playerScore = player.length;
        computerScore = computer.length;
        $('body').scoreboard();
    });

    $('.btn-reset').click(function() {
        location.reload();
    })

});

