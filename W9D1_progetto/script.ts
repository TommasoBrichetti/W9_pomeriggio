function gamePlay() {
    let randomNumber: number = Math.floor(Math.random() * 99 + 1)
    let playerOneNumber = document.getElementById('p1n')!.value
    let playerTwoNumber = document.getElementById('p2n')!.value
    console.log(playerOneNumber,playerTwoNumber)

    let playerOneResult: number = randomNumber - playerOneNumber
    let playerTwoResult: number = randomNumber - playerTwoNumber
    playerOneResult = playerOneResult * playerOneResult
    playerTwoResult = playerTwoResult * playerTwoResult

    if (playerTwoNumber == randomNumber) {
        alert('2 ha vinto' + randomNumber);
    } else if (playerOneNumber == randomNumber) {
        alert('1 ha vinto' + randomNumber);
    } else if (playerOneResult > playerTwoResult && playerTwoNumber != randomNumber) {
        alert('2 si è avvicinato di più' + randomNumber);

    } else if (playerOneResult < playerTwoResult && playerOneNumber != randomNumber) {
        alert('1 si è avvicinato di più' + randomNumber);
    } else {
        alert('1 e 2 hanno stranamente pareggiato' + randomNumber);
    }
}
document.querySelector('#playBtn')!.addEventListener('click', gamePlay);