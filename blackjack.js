let dealerTotal = 0;
let yourTotal = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true;

window.onload = function() {
    document.getElementById("hit-button").onclick = hit;
    document.getElementById("stay-button").onclick = stay;
    document.getElementById("restart-button").onclick = restart;

    arrayCardDeck();
    shuffleDeck();
    startGame();
}

function arrayCardDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];

    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let i2 = 0; i2 < values.length; i2++) {
            deck.push(values[i2] + "-" + types[i]);

        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let i2 = Math.floor(Math.random() * deck.length);
        let temp =deck[i];
        deck[i] = deck[i2];
        deck[i2] = temp;
    }
}

function startGame() {
    hidden = deck.pop();
    dealerTotal += getValue(hidden);
    dealerAceCount += checkAce(hidden);

        let dealerCard = deck.pop();
        let dealerCardImg = document.createElement("img");
        dealerCardImg.src = "./Images/front-images/" + dealerCard + ".png";
        dealerTotal += getValue(dealerCard);
        dealerAceCount += checkAce(dealerCard);
        document.getElementById("dealer-cards").append(dealerCardImg);

    for (let i =0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Images/front-images/" + card + ".png";
        yourTotal += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    let adjustedYourTotal = reduceAce(yourTotal, yourAceCount);
    let adjustedDealerTotal = reduceAce(dealerTotal, dealerAceCount);

    document.getElementById("your-total").innerText = adjustedYourTotal;

    if (adjustedDealerTotal === 21) {
        canHit = false;
        document.getElementById("hidden").src = "./Images/front-images/" + hidden + ".png";
        document.getElementById("dealer-total").innerText = adjustedDealerTotal;

        if (adjustedYourTotal === 21) {
            document.getElementById("results").innerText = "You both have Blackjack! It's a Tie!";
        } else {    
            document.getElementById("results").innerText = "Dealer has Blackjack! You Lose!";
        }

        document.getElementById("hit-button").disabled = true;
        document.getElementById("stay-button").disabled = true;
        return;
    }

if (adjustedYourTotal === 21) {
    canHit = false;

    document.getElementById("hidden").src = "./Images/front-images/" + hidden + ".png";
    document.getElementById("dealer-total").innerText = adjustedDealerTotal;
    document.getElementById("results").innerText = "Blackjack! You Win!";
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stay-button").disabled = true;
    return;
}

    document.getElementById("hit-button").disabled = false;
    document.getElementById("stay-button").disabled = false;
}

function hit() {
    if (!canHit) {
        return;
    }

        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Images/front-images/" + card + ".png";
        yourTotal += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);

        let adjustedTotal = reduceAce(yourTotal, yourAceCount);
        document.getElementById("your-total").innerText = adjustedTotal;

        if (adjustedTotal > 21) {
            canHit = false;
            document.getElementById("hidden").src = "./Images/front-images/" + hidden + ".png";

            dealerTotal = reduceAce(dealerTotal, dealerAceCount);
            document.getElementById("dealer-total").innerText = dealerTotal;

            document.getElementById("results").innerText = "You Busted! Dealer Wins";

            document.getElementById("hit-button").disabled = true;
            document.getElementById("stay-button").disabled = true;

            return;
        }

        if (adjustedTotal === 21) {
            canHit = false;
            document.getElementById("hidden").src = "./Images/front-images/" + hidden + ".png";

            dealerTotal = reduceAce(dealerTotal, dealerAceCount);
            document.getElementById("dealer-total").innerText = dealerTotal;

            document.getElementById("results").innerText = "21! You Win";

            document.getElementById("hit-button").disabled = true;
            document.getElementById("stay-button").disabled = true;

            return;
        }

}

function stay() {
    dealerTotal = reduceAce(dealerTotal, dealerAceCount);
    yourTotal = reduceAce(yourTotal, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./Images/front-images/" + hidden + ".png";

    while (dealerTotal < 17) {
        let card = deck.pop();
        let cardImg = document.createElement("img");
        cardImg.src = "./Images/front-images/" + card + ".png";
        document.getElementById("dealer-cards").append(cardImg);
        dealerTotal += getValue(card);
        dealerAceCount += checkAce(card);
        dealerTotal = reduceAce(dealerTotal, dealerAceCount);
    }

    let message = "";
    if (yourTotal > 21) {
        message = "You Busted! Dealer Wins!";
    }
    else if (dealerTotal > 21) {
        message = "Dealer Busted! You Win!";
    }
    else if (yourTotal == dealerTotal) {
        message = "It's a Tie!";
    }
    else if (yourTotal > dealerTotal) {
        message = "You Win!";
    }
    else if (yourTotal < dealerTotal) {
        message = "You Lose!";
    }

    document.getElementById("dealer-total").innerText = dealerTotal;
    document.getElementById("your-total").innerText = yourTotal;
    document.getElementById("results").innerText = message;

    document.getElementById("hit-button").disabled = true;
    document.getElementById("stay-button").disabled = true;
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
        return 0;
}

function reduceAce(yourTotal, yourAceCount) {
    while (yourTotal > 21 && yourAceCount > 0) {
        yourTotal -= 10;
        yourAceCount -= 1;
    }
    return yourTotal;
}

function restart() {
    dealerTotal = 0;
    yourTotal = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    canHit = true;

    document.getElementById("dealer-cards").innerHTML = '<img id="hidden" src="./Images/rear-image.jpg">';
    document.getElementById("your-cards").innerHTML = "";

    document.getElementById("dealer-total").innerText = 0;
    document.getElementById("your-total").innerText = 0;
    document.getElementById("results").innerText = "";

    arrayCardDeck();
    shuffleDeck();

    startGame();
}