
//Set variables to hold scores
var computerScore = 0;
var playerScore = 0;
var loot = [];

//Named array to hold cards
var cards = [];

//Named arrays for computer and player hands
var player = [];
var computer = [];

function start(){
    //setup arrays of card values and suits
    /*
     Jacks = 11
     Queens =12
     Kings = 13
     Aces = 14
     */
    cardValues = [2,3,4,5,6,7,8,9,10,11,12,13,14];
    cardSuits = ["clubs", "spades", "hearts", "diamonds"];

    //Loop over the cardValues & cardSuits arrays to construct the deck array
    for (v = 0; v < cardValues.length; v++){
        for (s = 0; s < cardSuits.length; s++) {
            cards.push([cardValues[v], cardSuits[s]]);
        }
    }
    //Function to set up the game by shuffling the cards
    //Based on Fisher-Yates Algorithm --> https://en.wikipedia.org/wiki/Fisher–Yates_shuffle{
    //Use Math.random() to 'shuffle' the cards
    var m = cards.length, i, t;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = cards[m];
        cards[m] = cards[i];
        cards[i] = t;
    }
    
    player = cards.splice(0, Math.floor(cards.length / 2));
    computer = cards;
}

//Function to be called in a 'war'
function war(computerHand, playerHand){
    var numCards = 4;
    var hand = [];
    hand.push(computerHand, playerHand);

    //Surrender if less than 4 cards
    if (computer.length < 4) {
        numCards = computer.length;
        console.log('Lowered number of War Cards to ' + numCards);
        }
    else if (player.length < 4 ){
        numCards = player.length;
        console.log('Lowered number of War Cards to ' + numCards);
        }

    //draw 4 cards from each player
    for (i = 0; i < numCards; i++){
        hand.push(computer.pop());
        hand.push(player.pop());
    }

    if (loot != "") {
        for (i=1; i < (loot.length + 2) * 4; i++){
            hand.unshift(loot.pop());
        }
    }

    //Construct thumbnail images for hand, to be displayed at the end of war
    cardThumbs = [];

    for (i = 1; i < hand.length + 1; i++) {
        cardThumbs.push("cards/" + hand[hand.length - i][0] + '-' + hand[hand.length - i][1] + '.png');
    }

    console.log('war hand: ' + hand);

    if (hand[hand.length-1][0] == hand[hand.length-2][0]) {
        //tie, declare another war
        console.log('We had a tie in the war.');

        //dump hand in to loot for keeping
        var cmpHand = hand[hand.length - 2];
        var plyHand = hand[hand.length - 1];
        for (i=0; i<(hand.length - 1) * 4; i++){
            loot.push(hand.shift());
        }

        hand = [];
        war(cmpHand, plyHand)

    } else if (hand[hand.length-1][0] > hand[hand.length-2][0]){
        //player wins
        for (i = 1; i < (hand.length + 2) * 4; i++) {
            player.unshift(hand.pop());
        }
        modalText = "W00t! You won a war. Here's your loot:";
    } else if (hand[hand.length-1][0] < hand[hand.length-2][0]) {
        //computer wins
        for (i = 1; i < (hand.length + 2) * 4; i++) {
            computer.unshift(hand.pop());
        }
        modalText = "Ouch! You lost a war. Here's their loot:";
    }
}

//Gameplay Logic
function play(){
    var status = '';

    //Check to make sure the game isn't over:
    if (player.length === 0 || computer.length === 0) {
        status = "game";
        if (player.length === 0) {
            modalText = "Congrats! You won!"
        } else {
            modalText = "You Lost. Better Luck Next time!"
        }
        return status;
    }

    //Build the round hand
    hand = [];
    hand.push(player.pop());
    hand.push(computer.pop());
    
    //Pull images for hand
    playerCardImg = "cards/" + hand[hand.length-1][0] + '-' + hand[hand.length-1][1] + '.png';
    computerCardImg = "cards/" + hand[hand.length-2][0] + '-' + hand[hand.length-2][1] + '.png';

    //Compare hand and determine the round status
    if (hand[hand.length-1][0] == hand[hand.length-2][0]){
        status = "war";
        war(hand[0],hand[1]);

    } else if (hand[hand.length-1][0] > hand[hand.length-2][0]){
        status = "player";
        player.unshift(hand[0], hand[1]);
        //shuffle(player);
    }
    else if (hand[hand.length-1][0] < hand[hand.length-2][0]) {
        status = "computer";
        computer.unshift(hand[0],hand[1]);
        //shuffle(computer);
    }


    console.log('Player Cards Left: ' + player.length);
    console.log('Computer Cards Left: ' + computer.length);
    return status;

}

