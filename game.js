/ Variables for game state and button dimensions
let gameState = "start"; // Possible states: "start", "game", "end"
let buttonX = 110;
let buttonY = 450;
let buttonWidth = 400;
let buttonHeight = 100;

// Variables for rocket position, velocity, acceleration, and thrust
let x, y, vx, vy, ax, ay;
let thrust = 0.1;
let gravity = 0.01;
let isWin = false;
let isLose = false;

// Gold position and size
let goldX = 500;
let goldY = 500;
let goldWidth = 150;
let goldHeight = 80;

// Movement flags
let thrustingUp = false;
let thrustingDown = false;
let thrustingLeft = false;
let thrustingRight = false;

function setup() {
    createCanvas(700, 700);
    resetGame();
}

function draw() {
    if (gameState === "start") {
        startScreen();
    } else if (gameState === "game") {
        gameScreen();
    } else if (gameState === "result") {
        resultScreen();
    }
}

function startScreen() {
    background(6, 66, 115);
    fill(238, 210, 2);
    textSize(80);
    text("GOLD DIGGER", 20, 350);

    // Draw the start button
    fill(194, 24, 7);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);
    fill(238, 210, 2);
    textSize(50);
    text("Start", buttonX + 120, buttonY + 70);
}

function gameScreen() {
    background(102, 178, 255);

    // Check for game states
    if (isWin) {
        gameState = "result";
        return;
    }
    if (isLose) {
        gameState = "result";
        return;
    }

    // Apply gravity
    ay = gravity;

    // Apply thrust
    if (thrustingUp) ay -= thrust;
    if (thrustingDown) ay += thrust;
    if (thrustingLeft) ax = -thrust;
    if (thrustingRight) ax = thrust;

    // Update velocity and position
    vy += ay;
    vx += ax;
    y += vy;
    x += vx;

    // Reset horizontal acceleration
    ax = 0;

    // Draw elements
    drawgold();
    drawboat(x, y);
    checkCollision();
}

function resultScreen() {
    background(6, 66, 115);
    fill(238, 210, 2);
    textSize(60);

    // Display win/lose message
    if (isWin) {
        text(" Win!", 200, 300);
    } else {
        text(" Lose!", 200, 300);
    }

    // Draw the restart button
    fill(194, 24, 7);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);
    fill(238, 210, 2);
    textSize(50);
    text("Restart", buttonX + 70, buttonY + 70);
}

function mousePressed() {
    if (gameState === "start" || gameState === "result") {
        // Check if mouse is over the button
        if (
            mouseX > buttonX &&
            mouseX < buttonX + buttonWidth &&
            mouseY > buttonY &&
            mouseY < buttonY + buttonHeight
        ) {
            if (gameState === "start") {
                gameState = "game"; // Move to game screen
            } else if (gameState === "result") {
                resetGame(); // Reset the game
                gameState = "start"; // Move to start screen
            }
        }
    }
}

function resetGame() {
    x = width / 2; // Start position
    y = 50;
    vx = 0;
    vy = 0;
    ax = 0;
    ay = 0;
    isWin = false;
    isLose = false;
}

function drawboat(x, y) {
    // Body of the boat
    strokeWeight(2);
    fill(255, 255, 0);
    ellipse(x + 240, y + 200, 400, 250);
    fill(255, 255, 130);
    arc(x + 230, y + 200, 400, 250, radians(90), radians(270));
    fill(204, 204, 0);
    square(x + 329, y + 227, 65, 20, 20, 200, 20);
    fill(102, 102, 0);
    ellipse(x + 339, y + 252, 6);

    // Sucking machine (red circle at bottom)
    strokeWeight(2);
    fill(255, 0, 0);
    ellipse(x + 228, y + 330, 150, 60); // Red part to check collision
    fill(153, 153, 0);
    ellipse(x + 228, y + 330, 130, 40);

    // Windows
    fill(198, 235, 255);
    ellipse(x + 140, y + 167, 60, 60);
    ellipse(x + 240, y + 167, 60, 60);
    ellipse(x + 340, y + 167, 60, 60);
}

function drawgold() {
    fill(255, 255, 0);
    rect(goldX, goldY, goldWidth, goldHeight);
}

function checkCollision() {
    // Red circle's bottom center
    let circleBottomX = x + 228; // Center of the red circle horizontally
    let circleBottomY = y + 330; // Vertical position of the red circle's bottom

    // Check if the red circle is touching the gold
    if (
        circleBottomY >= goldY && // Bottom is at or below gold's top edge
        circleBottomY <= goldY + goldHeight && // Bottom is above gold's bottom edge
        circleBottomX >= goldX && // Bottom is at or right of gold's left edge
        circleBottomX <= goldX + goldWidth // Bottom is at or left of gold's right edge
    ) {
        isWin = true;
    } else if (
        circleBottomY > goldY + goldHeight || // Below the gold
        circleBottomX < goldX || // Left of the gold
        circleBottomX > goldX + goldWidth // Right of the gold
    ) {
        isLose = true;
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) thrustingUp = true;
    if (keyCode === DOWN_ARROW) thrustingDown = true;
    if (keyCode === LEFT_ARROW) thrustingLeft = true;
    if (keyCode === RIGHT_ARROW) thrustingRight = true;
}

function keyReleased() {
    if (keyCode === UP_ARROW) thrustingUp = false;
    if (keyCode === DOWN_ARROW) thrustingDown = false;
    if (keyCode === LEFT_ARROW) thrustingLeft = false;
    if (keyCode === RIGHT_ARROW) thrustingRight = false;
}
