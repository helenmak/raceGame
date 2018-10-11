const getRandowBetween = (min, max) => {
  let randomMultiplier = Math.random()
  return randomMultiplier * (max - min) + min;
}

function initBoard() {
  console.log('init')

  const canvas = document.getElementById('gameBoard');
  const ctx = canvas.getContext("2d");
  const boardWidth = canvas.width = 500;
  const boardHeight = canvas.height = 600;

  const bottomMargin = 20;

  const road = new Image();
  const car = new Image();
  road.src = 'images/road.png';
  car.src = '../images/car.svg';

  const carWidth = 65;
  const carHeight = 115;

  const initialCarXPos = getRandowBetween(0, boardWidth - carWidth);
  const initialCarYPos = (boardHeight - bottomMargin - carHeight)

  const draw = () => {
    ctx.drawImage(road, 0, 0);
    ctx.drawImage(car, initialCarXPos, initialCarYPos, carWidth, carHeight);
  }

  let movement = {
    forward: false,
    backward: false,
    right: false,
    left: false
  }

  document.addEventListener('keydown', (ev) => { 
    const keyCode = ev.keyCode;
    const movingLeft = keyCode === 37 || keyCode === 65;
    const movingRight = keyCode === 39 || keyCode === 68;
    const movingForward = keyCode === 38 || keyCode === 87;
    const movingBackward = keyCode === 40 || keyCode === 83;

    if (movingLeft) movement.left = true;
    else if (movingRight) movement.right = true;
    else if (movingForward) movement.forward = true;
    else if (movingBackward) movement.backward = true;
    else movement = {
            forward: false,
            backward: false,
            right: false,
            left: false
          }
    console.log('keydown', movement)
  })

  document.addEventListener('keyup', (ev) => { 
    const keyCode = ev.keyCode;
    const endMoveLeft = keyCode === 37 || keyCode === 65;
    const endMoveRight = keyCode === 39 || keyCode === 68;
    const endMoveForward = keyCode === 38 || keyCode === 87;
    const endMoveBackward = keyCode === 40 || keyCode === 83;

    if (endMoveLeft) movement.left = false;
    else if (endMoveRight) movement.right = false;
    else if (endMoveForward) movement.forward = false;
    else if (endMoveBackward) movement.backward = false;
    else movement = {
            forward: false,
            backward: false,
            right: false,
            left: false
          }
    console.log('keyup', movement)
  })

  car.onload = draw;
}

export default initBoard;

