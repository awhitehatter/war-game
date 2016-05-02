
//Set variables to hold scores
var computerScore = 0;
var playerScore = 0;

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
    console.log(player);
    console.log(computer);
}


//Gameplay Logic
function play(){
    var status = '';
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
    else if (player.length === 0 || computer.length === 0) {
        status = "game";
    }
    return status;

}

function war(computerHand, playerHand){
    hand = [computerHand, playerHand];
    for (i = 0; i < 4; i++){
        hand.push(player.pop());
        hand.push(computer.pop());
    }
    if (hand[hand.length-1][0] == hand[hand.length-2][0]) {
        //declare another war
    } else if (hand[hand.length-1][0] > hand[hand.length-2][0]){
        //player wins
        for (i = 0, i < hand.length; i++;) {
            player.unshift(hand[i]);
        }
    } else if (hand[hand.length-1][0] < hand[hand.length-2][0]) {
        //computer winds
        for (i = 0, i < hand.length; i++;) {
            computer.unshift(hand[i]);
        }
    }
}