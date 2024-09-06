let inventory = [];
let hasTreasure = false;
let hasDefeatedAnimal = false;

function updateInventory() {
    const inventoryList = document.getElementById('inventory');
    inventoryList.innerHTML = ''; 
    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

function goLeft() {
    const gameText = document.getElementById('gameText');
    if (!hasTreasure) {
        gameText.textContent = "You chose to go left and found a peaceful meadow. Do you want to explore the meadow or go back?";
        updateChoices(["Explore the Meadow", "Go Back"], exploreMeadow, goBackToCrossroad);
    } else {
        gameText.textContent = "You already explored the meadow and found the treasure. There's nothing more here.";
        goBackToCrossroad();
    }
}

function goRight() {
    const gameText = document.getElementById('gameText');
    if (!hasDefeatedAnimal) {
        gameText.textContent = "You chose to go right and encountered a wild animal! Do you want to fight the animal or run away?";
        updateChoices(["Fight the Animal", "Run Away"], fightAnimal, runAway);
    } else {
        gameText.textContent = "The animal is already defeated. You can safely pass.";
        goBackToCrossroad();
    }
}

function exploreMeadow() {
    const gameText = document.getElementById('gameText');
    gameText.textContent = "You explore the meadow and find a hidden treasure! It's now in your inventory.";
    inventory.push("Treasure");
    hasTreasure = true;
    updateInventory();
    clearChoices();
}

function fightAnimal() {
    const gameText = document.getElementById('gameText');
    gameText.textContent = "You fought the animal and won! It won't bother you again.";
    hasDefeatedAnimal = true;
    clearChoices();
}

function runAway() {
    const gameText = document.getElementById('gameText');
    gameText.textContent = "You ran away and returned to the crossroad.";
    goBackToCrossroad();
}

function goBackToCrossroad() {
    const gameText = document.getElementById('gameText');
    gameText.textContent = "You are back at the crossroad. Do you want to go left or right?";
    updateChoices(["Go Left", "Go Right"], goLeft, goRight);
}

function updateChoices(options, callback1, callback2) {
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = ''; 

    const button1 = document.createElement('button');
    button1.textContent = options[0];
    button1.onclick = callback1;
    choicesDiv.appendChild(button1);

    const button2 = document.createElement('button');
    button2.textContent = options[1];
    button2.onclick = callback2;
    choicesDiv.appendChild(button2);
}

function clearChoices() {
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = ''; 
}