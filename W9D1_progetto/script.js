function gamePlay() {
    var randomNumber = Math.floor(Math.random() * 99 + 1);
    var playerOneNumber = document.getElementById('p1n').value;
    var playerTwoNumber = document.getElementById('p2n').value;
    console.log(playerOneNumber, playerTwoNumber);
    var playerOneResult = randomNumber - playerOneNumber;
    var playerTwoResult = randomNumber - playerTwoNumber;
    playerOneResult = playerOneResult * playerOneResult;
    playerTwoResult = playerTwoResult * playerTwoResult;
    if (playerTwoNumber == randomNumber) {
        alert('2 ha vinto' + randomNumber);
    }
    else if (playerOneNumber == randomNumber) {
        alert('1 ha vinto' + randomNumber);
    }
    else if (playerOneResult > playerTwoResult && playerTwoNumber != randomNumber) {
        alert('2 si è avvicinato di più' + randomNumber);
    }
    else if (playerOneResult < playerTwoResult && playerOneNumber != randomNumber) {
        alert('1 si è avvicinato di più' + randomNumber);
    }
    else {
        alert('1 e 2 hanno stranamente pareggiato' + randomNumber);
    }
}
document.querySelector('#playBtn').addEventListener('click', gamePlay);
