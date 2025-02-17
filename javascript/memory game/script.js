let score = 0;
let timeLeft = 30;
let timer;
function startGame(theme) {
    document.getElementById("home").style.display = "none";
    document.getElementById("games").style.display = "none";
    document.querySelector(".game-container").style.display = "flex";
    let backgrounds = {
        "adventure": "url('images/jungle.jpg')",
        "cartoon": "url('images/cartoons.jpg')",
        "fruits": "url('images/fruits.jpg')",
        "animals": "url('images/animal.jpg')",
        "planets": "url('images/planets.jpg')"
    };
    document.body.style.backgroundImage = backgrounds[theme];
    let themes = {
        "fruits": ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉", "🍒", "🍒", "🍓", "🍓", "🥝", "🥝", "🍍", "🍍"],
        "adventure": ["🐯", "🐯", "🦁", "🦁", "🐘", "🐘", "🦓", "🦓", "🦒", "🦒", "🐊", "🐊", "🐍", "🐍", "🦜", "🦜"],
        "cartoon": ["😀", "😀", "😂", "😂", "😍", "😍", "🤩", "🤩", "🥳", "🥳", "😎", "😎", "😜", "😜", "🤪", "🤪"],
        "animals": ["🐶", "🐶", "🐱", "🐱", "🐴", "🐴", "🐘", "🐘", "🐨", "🐨", "🐰", "🐰", "🦁", "🦁", "🐯", "🐯"],
        "planets": ["🌍", "🌍", "🌎", "🌎", "🌕", "🌕", "🌑", "🌑", "☀️", "☀️", "⭐", "⭐", "🌟", "🌟", "🌌", "🌌"]
    };
    let cards = themes[theme];
    let shuffledCards = cards.sort(() => Math.random() - 0.5);
    let board = document.getElementById("game-board");
    board.innerHTML = "";
    let flippedCards = [];
    let matchedCards = [];
    shuffledCards.forEach(symbol => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
    startTimer();
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").innerText = `Time: ${timeLeft}s`;
            if (timeLeft === 0) {
                clearInterval(timer);
                showGameOver();
            }
        }, 1000);
    }
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
            this.innerText = this.dataset.symbol;
            this.classList.add("flipped");
            flippedCards.push(this);
        }
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }
    function checkMatch() {
        let [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchedCards.push(card1, card2);
            card1.style.backgroundColor = "green";
            card2.style.backgroundColor = "green";
            score++;
            document.getElementById("score").innerText = `Score: ${score}`;
            flippedCards = [];
            if (matchedCards.length === cards.length) {
                clearInterval(timer);
                showGameOver();
            }
        } else {
            setTimeout(() => {
                card1.innerText = "";
                card2.innerText = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                flippedCards = [];
            }, 500);
        }
    }
    function showGameOver() {
        document.getElementById("game-over-message").innerText = 
            score === cards.length / 2 ? "You Win!" : "Game Over!";
        document.getElementById("game-over").style.display = "block";
        document.getElementById("game-board").style.display = "none";
    }
}
