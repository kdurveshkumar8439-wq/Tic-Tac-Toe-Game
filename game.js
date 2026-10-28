let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newbutton = document.querySelector("#newbutton");
let msgContainer = document.querySelector(".mgs-container");

let msgContainer1 = document.querySelector(".mgs-container1");

let msg = document.querySelector("#msg");
let msg1 = document.querySelector("#msg1");


let turn0 = true;

const winerpattren = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [3, 4, 5],
    [2, 5, 8],
    [2, 4, 6],
    [6, 7, 8],

];

const winSound = document.querySelector("#winnerSound");


const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");

    msgContainer1.classList.add("hide1");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turn0) {
            box.innerText = "X";
            turn0 = false;
        } else {

            box.innerText = "O";
            turn0 = true;
        }

        box.disabled = true;

        checkwinner();

    });
});
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};



const showFireworks = () => {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 1000,
            spread: 1000,
            origin: { x: 0.5, y: 0.6 }
        });

        // Extra fireworks
        setTimeout(() => {
            confetti({
                particleCount: 1000,
                spread: 120,
                origin: { x: 0.2, y: 0.6 }
            });

            confetti({
                particleCount: 1000,
                spread: 120,
                origin: { x: 0.8, y: 0.6 }
            });
        }, 300);
    }
};




const checkwinner = () => {
    for (let pattern of winerpattren) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "")

            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("You are winner", pos1val);
                showWinner(pos1val);
                return;
            }
    }



    // Check for a draw
    const allFilled = [...boxes].every(
        (box) => box.innerText !== ""
    );

    if (allFilled) {
       msg1.innerHTML = "🎮🎮"
        msgContainer1.classList.remove("hide1");
        disableBoxes();

   const gameOver = document.querySelector("#gameOver");

if ([...boxes].every(box => box.innerText !== "")) {
    gameOver.currentTime = 0;
    gameOver.play();
}


    }
};



const showWinner = (winner) => {
    msg.innerText = `🎉🎉 WINNER: ${winner} 🎉🎉`;
    msgContainer.classList.remove("hide");

    disableBoxes();
    showFireworks();




   const sound = document.querySelector("#winSound");

if (sound) {
    sound.currentTime = 0;
    sound.play().catch(error => {
        console.log("Sound play nahi hua:", error);
    });
}
}


resetBtn.addEventListener("click", resetGame);
newbutton.addEventListener("click", resetGame);