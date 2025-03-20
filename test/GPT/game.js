// Game variables
let canvas, ctx;
let character = { x: 50, y: 50, size: 30 };
let currentQuest = 0;
const quests = [
    {
        description: 'Move the character to the right by 50 pixels.',
        guide: 'Use the moveCharacter function with "right" as the argument. Example: moveCharacter("right");',
        condition: () => character.x >= 100
    },
    {
        description: 'Move the character down by 50 pixels.',
        guide: 'Use the moveCharacter function with "down" as the argument. Example: moveCharacter("down");',
        condition: () => character.y >= 100
    },
    {
        description: 'Move the character to the top-left corner.',
        guide: 'Use the moveCharacter function with "up" and "left" as the arguments until the character reaches the top-left corner.',
        condition: () => character.x === 0 && character.y === 0
    },
    {
        description: 'Move the character to the bottom-right corner.',
        guide: 'Use the moveCharacter function with "right" and "down" as the arguments until the character reaches the bottom-right corner.',
        condition: () => character.x === canvas.width - character.size && character.y === canvas.height - character.size
    }
];

function startGame() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');

    // Initial draw
    drawGame();
    showQuest();
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw character
    drawCharacter(character.x, character.y);
}

function drawCharacter(x, y) {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, character.size, character.size);
}

function moveCharacter(direction) {
    switch (direction) {
        case 'up':
            character.y = Math.max(0, character.y - 10);
            break;
        case 'down':
            character.y = Math.min(canvas.height - character.size, character.y + 10);
            break;
        case 'left':
            character.x = Math.max(0, character.x - 10);
            break;
        case 'right':
            character.x = Math.min(canvas.width - character.size, character.x + 10);
            break;
    }
    drawGame();
    checkQuestCompletion();
}

function runCode() {
    const codeInput = document.getElementById('code-input').value;

    try {
        eval(codeInput); // Note: using eval can be dangerous and is not recommended for production code
    } catch (error) {
        alert('Error in code: ' + error.message);
    }
}

function showQuest() {
    const questDescription = document.getElementById('quest-description');
    questDescription.innerText = quests[currentQuest].description;
    const questGuide = document.getElementById('quest-guide');
    questGuide.innerText = quests[currentQuest].guide;
}

function checkQuestCompletion() {
    if (quests[currentQuest].condition()) {
        alert('Quest completed!');
        currentQuest++;
        if (currentQuest < quests.length) {
            showQuest();
        } else {
            alert('All quests completed!');
        }
    }
}
