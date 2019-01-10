const getRandomBetween = (min, max) => {
  let randomMultiplier = Math.random()
  return randomMultiplier * (max - min) + min
}

const defaultMovement = {
  forward: false,
  backward: false,
  right: false,
  left: false
}

function initBoard() {
  console.log('init')

  const canvas = document.getElementById('gameBoard')
  const ctx = canvas.getContext("2d")

  const bottomMargin = 20
  const upMargin = 50
  const sideMargin = 15

  const second = 1000
  const fps = 60

  const step = 5
  let metersDone = 0
  const finish = 3000

  const road = new Image()
  const car = new Image()
  road.src = 'images/road.png'
  car.src = 'images/car.svg'

  const carWidth = 65
  const carHeight = 115
  const boardWidth = canvas.width = 500
  const boardHeight = canvas.height = 600

  const initialCarXPos = getRandomBetween(0, boardWidth - carWidth)
  const initialCarYPos = (boardHeight - bottomMargin - carHeight)
  const initialRoadXPos = 0
  const initialRoadYPos = 0

  let carPos = { x: initialCarXPos, y: initialCarYPos }
  let roadPos = { x: 0, y: 0 }
  let obstaclesPos = [{ x: 0, y: 0 }]

  const draw = ({
                  roadX = roadPos.x,
                  roadY = roadPos.y,
                  carX = carPos.x,
                  carY = carPos.y
                }) => {
    ctx.drawImage(road, roadX, roadY, boardWidth, boardHeight)
    ctx.drawImage(car, carX, carY, carWidth, carHeight)
  }

  car.onload = draw;





  let movement = {
    forward: false,
    backward: false,
    right: false,
    left: false
  }

  document.addEventListener('keydown', (ev) => {
    const key = ev.key
    const movingLeft = key === 'ArrowLeft' || key === 'a'
    const movingRight = key === 'ArrowRight' || key === 'd'
    const movingForward = key === 'ArrowUp' || key === 'w'
    const movingBackward = key === 'ArrowDown' || key === 's'

    if (movingLeft) movement.left = true
    else if (movingRight) movement.right = true
    else if (movingForward) movement.forward = true
    else if (movingBackward) movement.backward = true
  })

  document.addEventListener('keyup', (ev) => {
    const key = ev.key
    const endMoveLeft = key === 'ArrowLeft' || key === 'a'
    const endMoveRight = key === 'ArrowRight' || key === 'd'
    const endMoveForward = key === 'ArrowUp' || key === 'w'
    const endMoveBackward = key === 'ArrowDown' || key === 's'

    if (endMoveLeft) movement.left = false
    else if (endMoveRight) movement.right = false
    else if (endMoveForward) movement.forward = false
    else if (endMoveBackward) movement.backward = false
  })



  const renderObstacles = () => {
    const randomRoadParts = getRandomBetween(finish/(boardHeight/2), finish/boardHeight)
    const obstaclesCount = Math.round(randomRoadParts)
    let obstacles = []

    for (let i = 1; i < obstaclesCount; i++) {
      const x = getRandomBetween(0, boardWidth - carWidth/1.2)
      const y = getRandomBetween(0, finish)
      obstacles.push({ x, y })
    }

    console.log('obstacles', obstacles)
    return function render (metersDone) {
      obstacles.forEach(obstacle => {
        const obstacleShouldBeVisible = (obstacle.y >= metersDone) && (obstacle.y <= metersDone + boardHeight)
        if (obstacleShouldBeVisible) {
          console.log('visible!', obstacle.y, metersDone)
          const boardsCount = obstacle.y / boardHeight
          const yPosToRender = ((boardsCount - parseInt(boardsCount)) * boardHeight) - (obstacle.y - metersDone)
          console.log(yPosToRender)
          ctx.drawImage(car, obstacle.x, yPosToRender, carWidth/1.3, carHeight/1.3)
        }
      })
    }
  }

  const renderCurrentObstacles = renderObstacles()

  const renderCarMovement = () => {
    if (movement.forward) {
      roadPos.y += step
      metersDone += step
      ctx.drawImage(road, roadPos.x, roadPos.y, boardWidth, boardHeight)
      ctx.drawImage(car, carPos.x, carPos.y, carWidth, carHeight)
      renderCurrentObstacles(metersDone)
    }

    if (movement.right) {
      if (carPos.x < (boardWidth - carWidth - sideMargin)) carPos.x += 10
      ctx.drawImage(road, roadPos.x, roadPos.y, boardWidth, boardHeight)
      ctx.drawImage(road, roadPos.x, (roadPos.y - boardHeight), boardWidth, boardHeight)
      ctx.drawImage(car, carPos.x, carPos.y, carWidth, carHeight)
      renderCurrentObstacles(metersDone)
    }

    if (movement.left) {
      if (carPos.x > sideMargin) carPos.x -= 10
      ctx.drawImage(road, roadPos.x, roadPos.y, boardWidth, boardHeight)
      ctx.drawImage(road, roadPos.x, (roadPos.y - boardHeight), boardWidth, boardHeight)
      ctx.drawImage(car, carPos.x, carPos.y, carWidth, carHeight)
      renderCurrentObstacles(metersDone)
    }


    if (movement.forward && roadPos.y > step) {
      ctx.drawImage(road, roadPos.x, roadPos.y, boardWidth, boardHeight)
      ctx.drawImage(road, roadPos.x, (roadPos.y - boardHeight), boardWidth, boardHeight)
      ctx.drawImage(car, carPos.x, carPos.y, carWidth, carHeight)
      renderCurrentObstacles(metersDone)
    }

    if (roadPos.y >= boardHeight) roadPos.y = 0

    if (metersDone >= finish) {
      metersDone = 0
      movement = defaultMovement
      alert('finish')
    }
  }

  ctx.drawImage(car, carPos.x, carPos.y, carWidth, carHeight)
  setInterval(renderCarMovement, second/fps)
}

export default initBoard
