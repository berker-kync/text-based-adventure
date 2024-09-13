// Player state
let inventory = [];
let hasTreasure = false;
let hasDefeatedAnimal = false;
let health = 100;

function updateHealth() {
    document.getElementById('health').textContent = health;
    if (health <= 0) {
        endGame("You have died. Game over.");
    }
}

function updateInventory() {
    const inventoryList = document.getElementById('inventory');
    inventoryList.innerHTML = ''; // Clear prev inventor
    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

function goLeft() {
    const gameText = document.getElementById('gameText');
    if (!hasTreasure) {
        gameText.textContent = "You chose to go left and found a peaceful meadow. You see a shiny object. Do you want to pick it up or go back?";
        updateChoices(["Pick up the Object", "Go Back"], pickUpObject, goBackToCrossroad);
    } else {
        gameText.textContent = "You've already collected the treasure here.";
        goBackToCrossroad();
    }
}

function goRight() {
    const gameText = document.getElementById('gameText');
    if (!hasDefeatedAnimal) {
        gameText.textContent = "You encounter a wild animal! Fight or run?";
        updateChoices(["Fight", "Run"], fightAnimal, runAway);
    } else {
        gameText.textContent = "The path is clear. You already defeated the animal.";
        goDeeperIntoForest();
    }
}

function pickUpObject() {
    const gameText = document.getElementById('gameText');
    gameText.textContent = "You picked up a shiny sword! It might come in handy.";
    inventory.push("Sword");
    hasTreasure = true;
    updateInventory();
    goBackToCrossroad();
}

function fightAnimal() {
    const gameText = document.getElementById('gameText');
    if (inventory.includes("Sword")) {
        gameText.textContent = "You fought the animal with your sword and won!";
        hasDefeatedAnimal = true;
        goDeeperIntoForest();
    } else {
        gameText.textContent = "You fought the animal with your bare hands but got hurt!";
        health -= 20;
        updateHealth();
        if (health > 0) {
            goBackToCrossroad();
        }
    }
}

function goDeeperIntoForest() {
    const gameText = document.getElementById('gameText');
    gameText.textContent = "You move deeper into the forest and find a small village. Do you want to enter the village or explore further?";
    updateChoices(["Enter the Village", "Explore Further"], enterVillage, exploreFurther);
}

function enterVillage() {
    const gameText = document.getElementById('gameText');
    gameText.textContent = "You entered the village and found a healer. Your health is restored.";
    health = 100;
    updateHealth();
    clearChoices();
}

function exploreFurther() {
    const gameText = document.getElementById('gameText');
    gameText.textContent = "You explore further and find a hidden cave.";
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
    choicesDiv.innerHTML = ''; // to lcear buttons

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
    choicesDiv.innerHTML = ''; // Tro remove bttns after game done
}

function endGame(message) {
    const gameText = document.getElementById('gameText');
    gameText.textContent = message;
    clearChoices();
}