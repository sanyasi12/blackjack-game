var deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q", "A",
    2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q", "A",
    2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q", "A",
    2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q", "A"];

var player = [];
var dealer = [];

// random card pick

function drawRandomCard(deck) {
    let randomIndex = Math.floor(deck.length * Math.random());
    return deck[randomIndex]
}

function startGame() {
    player.push(drawRandomCard(deck))
    player.push(drawRandomCard(deck))
    dealer.push(drawRandomCard(deck))
    dealer.push(drawRandomCard(deck));

    let pScore = getTotalValue(player);
    if (pScore >= 21) {
        deal()
    }
}

startGame()

// Calculation score of the cards
function getTotalValue(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        // card is number or not        
        if (!isNaN(arr[i])) {
            sum += arr[i]
        } else {
            if ((arr[i] == "J") || (arr[i] == "K") || (arr[i] == "Q")) {
                sum += 10
            } else {
                // Here checking that if the score greater than 11 add 1 otherwise add 11 in sum.                
                if (sum > 11) {
                    sum += 1
                } else {
                    sum += 11
                }
            }
        }
    }
    return sum
}

function playerHit() {
    if (player.length < 5) {
        let pScore = getTotalValue(player);
        if (pScore < 21) {
            player.push(drawRandomCard(deck));
            pScore = getTotalValue(player);
        }
        document.getElementById('player-hand').innerHTML = player;
        if (pScore >= 21) {
            deal()
        }
    }
}

function dealerHit() {
    if (dealer.length < 5) {
        let dScore = getTotalValue(dealer);
        if (dScore < 21) {
            dealer.push(drawRandomCard(deck));
            dScore = getTotalValue(dealer)
        }
        document.getElementById('dealer-hand').innerHTML = dealer;
        if (dScore >= 21) {
            deal()
        }
    }
}

function stay() {
    deal()
}

function deal() {

    let status;
    let pScore = getTotalValue(player)
    let dScore = getTotalValue(dealer)

    if (pScore == 21 || (pScore < 21 && player.length == 5)) {

        status = "Blackjack player win"

    } else if (dScore == 21) {

        status = "Blackjack dealer win"

    } else if (pScore > 21) {

        status = "You Bust !! lose the game Dealer win"

    } else if (dScore > 21) {

        status = "Dealer Bust !! player win"

    } else if ((pScore == 21) && (dScore == 21)) {

        status = "Game is tie Dealer win"

    } else if ((21 - dScore) > (21 - pScore)) {

        status = "Player win"

    } else if ((21 - dScore) < (21 - pScore)) {

        status = "Dealer win"

    } else {

        status = ''

    }

    document.getElementById('player-score').innerHTML = `Player Score :- ${pScore}`;
    document.getElementById('dealer-score').innerHTML = `Dealer Score :- ${dScore}`;
    document.getElementById('game-status').innerHTML = status;
    document.getElementById('player-hit').disabled = true;
    document.getElementById('dealer-hit').disabled = true
    document.getElementById('stay-btn').disabled = true
}

document.getElementById('player-hand').innerHTML = player
document.getElementById('dealer-hand').innerHTML = dealer