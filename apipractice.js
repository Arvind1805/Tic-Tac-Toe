let btns = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let popup = document.querySelector("#popup");
let message = document.querySelector("#message");
let closeBtn = document.querySelector(".close-btn");
let restartBtn = document.querySelector("#restart");
let turn0 = true;

let patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const reset = () => {
    for (let element of btns) {
        element.innerText = "";
        element.disabled = false;
    }
    popup.style.display = "none";
    hideConfetti();
};

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (turn0) {
            btn.innerText = "X";
            turn0 = false;
        } else {
            btn.innerText = "O";
            turn0 = true;
        }
        btn.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let i = 0; i < patterns.length; i++) {
        let [a, b, c] = patterns[i];
        if (btns[a].innerText === btns[b].innerText && btns[b].innerText === btns[c].innerText && btns[a].innerText !== "") {
            showPopup(`${btns[a].innerText} is the winner! Congratulations!`);
            showConfetti();
            return;
        }
    }
    checkTie();
};

const checkTie = () => {
    let count = 0;
    for (let i = 0; i < btns.length; i++) {
        if (btns[i].innerText !== "") {
            count++;
        }
    }
    if (count === 9) {
        showPopup("It's a tie! Match is tied.");
    }
};

const showPopup = (msg) => {
    message.innerText = msg;
    popup.style.display = "flex";
};

resetBtn.addEventListener("click", reset);
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});
restartBtn.addEventListener("click", reset);

const showConfetti = () => {
    const confettiWrapper = document.getElementById('confetti-wrapper');
    confettiWrapper.style.display = 'block';
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiWrapper.appendChild(confetti);
    }
    setTimeout(() => {
        hideConfetti();
    }, 5000);
};

const hideConfetti = () => {
    const confettiWrapper = document.getElementById('confetti-wrapper');
    while (confettiWrapper.firstChild) {
        confettiWrapper.removeChild(confettiWrapper.firstChild);
    }
    confettiWrapper.style.display = 'none';
};
