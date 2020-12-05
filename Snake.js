var divSnake, divBox, divFrame, divMessage, lblTime, lblPoints, btnStart;

var speed_of_snake, timeStart, time_period, points, snake_parameter_left, snake_parameter_top, box_parameter_left, box_parameter_top;

var animateRight = setTimeout(() => {}, 1),
    animateDown = setTimeout(() => {}, 1),
    animateUp = setTimeout(() => {}, 1),
    animateLeft = setTimeout(() => {}, 1),
    boxInterval = setTimeout(() => {}, 1),
    timePeriod = setTimeout(() => {}, 1);

randomNumber = (min, max) => {
    return parseInt(Math.random() * (max - min) + min)
}

let initializeElements = function() {
    btnStart = document.getElementById("btnStart");
    divSnake = document.getElementById("divSnake");
    divBox = document.getElementById("divBox");
    divFrame = document.getElementById("divFrame");
    divMessage = document.getElementById("divMessage");
    lblTime = document.getElementById("lblTime");
    lblPoints = document.getElementById("lblPoints");
}

let initializeDots = function(element_name) {
    element_name.style.position = "relative"
    element_name.style.left = randomNumber(1, 97) + "%"
    element_name.style.top = randomNumber(1, 95) + "%"
}

let insertFood = function() {
    clearTimeout(boxInterval)
    initializeDots(divBox)
    boxInterval = setInterval(() => { initializeDots(divBox) }, 100000)
}

function start() {

    initializeElements()
    btnStart.disabled = true;
    initializeDots(divSnake)

    time_period = 0,
        points = 0,
        speed_of_snake = 100;

    lblPoints.innerHTML = points;
    lblTime.innerHTML = time_period;

    window.onkeydown = () => { nextMove(event) }

    insertFood()
    timePeriod = setInterval(() => lblTime.innerHTML = ++time_period, 1000)
}

function moveRight() {
    snake_parameter_left = parseInt(divSnake.style.left)
    box_parameter_left = parseInt(divBox.style.left)
    if (snake_parameter_left > 0 && snake_parameter_left < 99) {
        if ((snake_parameter_left + 1) == box_parameter_left) {
            snake_parameter_top = parseInt(divSnake.style.top)
            box_parameter_top = parseInt(divBox.style.top)
            if ((snake_parameter_top >= (box_parameter_top + 1)) && (snake_parameter_top <= (box_parameter_top + 7))) {
                boxcaught()
            } else { divSnake.style.left = parseInt(divSnake.style.left) + 1 + "%"; }
        } else { divSnake.style.left = parseInt(divSnake.style.left) + 1 + "%"; }
    } else gameOver()
}

function moveLeft() {
    snake_parameter_left = parseInt(divSnake.style.left)
    box_parameter_left = parseInt(divBox.style.left)
    if (snake_parameter_left > 0 && snake_parameter_left < 99) {
        if (snake_parameter_left == (box_parameter_left + 1)) {
            snake_parameter_top = parseInt(divSnake.style.top)
            box_parameter_top = parseInt(divBox.style.top)
            if ((snake_parameter_top >= (box_parameter_top + 1)) && (snake_parameter_top <= (box_parameter_top + 7))) {
                boxcaught()
            } else { divSnake.style.left = snake_parameter_left - 1 + "%"; }
        } else { divSnake.style.left = snake_parameter_left - 1 + "%"; }
    } else gameOver()
}

function moveDown() {
    snake_parameter_top = parseInt(divSnake.style.top)
    box_parameter_top = parseInt(divBox.style.top)
    if (snake_parameter_top > 0 && snake_parameter_top < 97) {
        if ((snake_parameter_top - 1) == box_parameter_top) {
            snake_parameter_left = parseInt(divSnake.style.left)
            box_parameter_left = parseInt(divBox.style.left)
            if ((snake_parameter_left >= (box_parameter_left - 1)) && (snake_parameter_left <= (box_parameter_left + 1))) {
                boxcaught()
            } else { divSnake.style.top = snake_parameter_top + 1 + "%"; }
        } else { divSnake.style.top = snake_parameter_top + 1 + "%"; }
    } else gameOver()
}

function moveUp() {
    snake_parameter_top = parseInt(divSnake.style.top)
    box_parameter_top = parseInt(divBox.style.top)
    if (snake_parameter_top > 0 && snake_parameter_top < 97) {
        if (snake_parameter_top == (box_parameter_top + 7)) {
            snake_parameter_left = parseInt(divSnake.style.left)
            box_parameter_left = parseInt(divBox.style.left)
            if ((snake_parameter_left >= (box_parameter_left - 1)) && (snake_parameter_left <= (box_parameter_left + 1))) {
                boxcaught()
            } else { divSnake.style.top = snake_parameter_top - 1 + "%"; }
        } else { divSnake.style.top = snake_parameter_top - 1 + "%"; }
    } else gameOver()
}

function clearTimeoutForAll() {
    clearTimeout(animateRight)
    clearTimeout(animateDown)
    clearTimeout(animateUp)
    clearTimeout(animateLeft)
}

function gameOver() {
    clearTimeout(animateRight)
    clearTimeout(animateDown)
    clearTimeout(animateUp)
    clearTimeout(animateLeft)
    clearTimeout(boxInterval)
    clearTimeout(timePeriod)
    btnStart.disabled = false;
    divMessage.innerHTML = "Game Over !!"
    window.onkeydown = () => {}
}

function boxcaught() {
    divMessage.innerHTML = "Go Fast !!  You are at Level " + (points + 2)
    speed_of_snake = speed_of_snake - 5
    lblPoints.innerHTML = ++points;
    insertFood()
}

function nextMove(event) {
    switch (event.code) {
        case 'ArrowUp':
            clearTimeoutForAll()
            animateUp = setInterval(() => { moveUp() }, speed_of_snake)
            break
        case 'ArrowDown':
            clearTimeoutForAll()
            animateDown = setInterval(() => { moveDown() }, speed_of_snake)
            break
        case 'ArrowLeft':
            clearTimeoutForAll()
            animateLeft = setInterval(() => { moveLeft() }, speed_of_snake)
            break
        case 'ArrowRight':
            clearTimeoutForAll()
            animateRight = setInterval(() => { moveRight() }, speed_of_snake)
    }
}