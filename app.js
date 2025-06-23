// Accessing all the boxes
let boxes = document.querySelectorAll('#box');
let resetbtn = document.querySelector('#reset-btn');
let player1 = document.querySelector('#player1');
let player2 = document.querySelector('#player2');
let newbtn = document.querySelector('#new-btn');

// Turn tracker: true for O (Player 1), false for X (Player 2)
let turn0 = true;

// Update turn visual indicator
function updateTurnIndicator() {
    if (turn0) {
        blink(player1);
        player2.style.backgroundColor = "";
    } else {
        blink(player2);
        player1.style.backgroundColor = "";
    }
}

// Blink effect
function blink(element) {
    element.style.backgroundColor = "#FF0B55";
    setTimeout(() => {
        element.style.backgroundColor = "";
    }, 200);
}

// Win patterns (2D array)
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Attach event listeners to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // prevent overwriting

        // Place O or X
        box.innerText = turn0 ? "O" : "X";
        box.style.color = "#F8F4E1";
        box.style.backgroundColor = "#FF0B55";
        box.disabled = true;

        checkWin();         // Check for winner
        turn0 = !turn0;     // Switch turn
        updateTurnIndicator(); // Update player UI
    });
});

// Win check function with delay before popup
function checkWin() {
    for (let pattern of winPatterns) {
        let a = boxes[pattern[0]].innerText;
        let b = boxes[pattern[1]].innerText;
        let c = boxes[pattern[2]].innerText;

        if (a !== "" && a === b && b === c) {
            // Highlight winning boxes
            pattern.forEach(index => {
                boxes[index].style.backgroundColor = "#95D2B3";
                boxes[index].style.color = "#102C57"; 
            });

            // Delay the alert so highlight shows first
            setTimeout(() => {
                let winner = a === "O" ? "Player 1 (O)" : "Player 2 (X)";
                alert(winner + " wins!");

                document.getElementById('new-btn').style.display = 'inline-block';
                // Disable all boxes
                boxes.forEach(box => box.disabled = true);
            }, 300);

            return;
        }
    }
}

// Show initial player turn
updateTurnIndicator();

// Reset button logic
resetbtn.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.backgroundColor = "";
        box.disabled = false;
    });
    turn0 = true;
    updateTurnIndicator();
});

// New button logic
document.getElementById('new-btn').addEventListener('click', () => {
    // Reset game logic here
    boxes.forEach(box => {
        box.innerText = "";
        box.style.backgroundColor = "";
        box.disabled = false;
    });
    turn0 = true;
    updateTurnIndicator();
    
    // Hide New button again after reset
    document.getElementById('new-btn').style.display = 'none';
});
