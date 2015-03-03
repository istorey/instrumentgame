$(document).ready(function() {
  setUpGame()
  updateCanvas() //Loop

  ////Functions run on load
  function setUpGame() {
    createKeyListenerController()
    addEnemyInterval() //new enemy added every 2 seconds
    $("#game").html(Game.canvas)
  }

  function updateCanvas() {
    //Guard clause to end updateCanvas Loop
    if (Game.over) {
      return
    }
    
    renderBG()

    moveHero() //moved via keyboard input
    moveEnemies() //enemies chase hero, also checks if enemies have caught hero
    movePaints()

    Game.coin.render()

    checkCoinCollect()
    renderCoinsCollected() 
    
    requestAnimationFrame(updateCanvas);
    //https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
  }
  //// \end functions run on load

  /////Set Up Game functions
  function createKeyListenerController() {
    window.addEventListener("keydown", function (e) {
      Game.keysDown[e.keyCode] = true;
    }, false);

    window.addEventListener("keyup", function (e) {
      delete Game.keysDown[e.keyCode];
    }, false);
  }

  function addEnemyInterval() {
    window.setInterval(function() {
      Game.enemies.push(newRandomEnemy())
    }, 2000)
  }

  //// \end Set Up Game functions

  ////Update canvas functions
  function renderBG() {
    Game.ctx.drawImage(Game.spaceImg, 0, 0);
  }

  function moveEnemies() {
    var enemies = Game.enemies;
    for (var i = 0, enemiesLength = enemies.length; i < enemiesLength; i++) {
      enemies[i].chase()
      enemies[i].render()
      checkEnemyTouch(enemies[i])
    }
  }

  function moveHero() {
    var heroIcon = Game.heroIcon;

    heroIcon.move();
    heroIcon.paint();
    heroIcon.render()
  }

  function movePaints(){
    var paints = Game.paints,
        tempPaints = [], 
        paint,
        isHit;
    for (var i = 0, paintsLength = paints.length; i < paintsLength; i++) {
      paint = paints[i];
      paint.render();
      
      isHit = checkPaintHit(paint)
      if (!(paint.y <= -20) && !isHit) {
        tempPaints.push(paint)
      }
    }
    Game.paints = tempPaints
  }

  function checkPaintHit(paint){
    var enemy, 
        check = false,
        tempEnemies = [];
    for( var i = 0, enemiesLength = Game.enemies.length; i < enemiesLength; i++){
      enemy = Game.enemies[i];
      if (!(
        paint.x <= (enemy.x + 24)
        && enemy.x <= (paint.x + 11)
        && paint.y <= (enemy.y + 32)
        && enemy.y <= (paint.y + 3)
      )) {
        tempEnemies.push(enemy);
      }
      else {
        check = true;
      }
    }
    Game.enemies = tempEnemies
    return check
  }

  function checkCoinCollect() {
    var heroIcon = Game.heroIcon,
        coin = Game.coin
    if (
        heroIcon.x <= (coin.x + 32)
        && coin.x <= (heroIcon.x + 32)
        && heroIcon.y <= (coin.y + 32)
        && coin.y <= (heroIcon.y + 32)
      ) {
      Game.coinsCollected++;
      Game.coin = newCoin();
    }
  }

  function renderCoinsCollected() {
    Game.ctx.fillStyle = "rgb(250, 250, 250)";
    Game.ctx.font = "24px Helvetica";
    Game.ctx.textAlign = "left";
    Game.ctx.textBaseline = "top";
    Game.ctx.fillText("Paint with Space, A, S, D, W, and E Keys | Coins: " + Game.coinsCollected, 32, 32);
  }

  //// \end Update Canvas Functions

  //Used in addEnemyInterval(), runs every interval
  function newRandomEnemy() {
    var options = new randomCoordinatesObj()
    options.image = "images/enemyShip.png"
    options.speed = 3
    options.hero = Game.heroIcon
    return new Enemy(options)
  }

  //Used in moveEnemies() inside enimies array itteration
  function checkEnemyTouch(enemy) {
    var heroIcon = Game.heroIcon;
    if (
        heroIcon.x <= (enemy.x + 24)
        && enemy.x <= (heroIcon.x + 24)
        && heroIcon.y <= (enemy.y + 24)
        && enemy.y <= (heroIcon.y + 24)
      ){
      Game.ctx.font = "60px Helvetica";
      Game.ctx.fillText("GAME OVER", 275, 300);
      Game.ctx.fillText("Score: " + Game.coinsCollected, 275, 380);
      Game.over = true
    }
  }

  //checking for when enemy hits paint
  function checkEnemyTouch(enemy) {
    var heroIcon = Game.heroIcon;
    if (
        heroIcon.x <= (enemy.x + 24)
        && enemy.x <= (heroIcon.x + 24)
        && heroIcon.y <= (enemy.y + 24)
        && enemy.y <= (heroIcon.y + 24)
      ){
      Game.ctx.font = "20px Helvetica";
      Game.ctx.fillText("Making the Complex Simple with Object Oriented JavaScript", 200, 300);
      Game.ctx.fillText("Score: " + Game.coinsCollected, 275, 380);
      Game.over = true
    }
  }

  //Used in renderCoinsCollected() if coin is collected
  function newCoin() {
    var options = new randomCoordinatesObj()
    options.image = "images/coin.png"
    return new Coin(options)
  }


  //Functions used to create random spawn point for new coin and new enemy
  function randomCoordinatesObj() {
    this.x = randomXCoordinate();
    this.y = randomYCoordinate();
  }

  function randomXCoordinate() {
    var coordinate;
    coordinate = 32 + (Math.random() * (Game.canvas.width - 64))
    while ((Game.heroIcon.x - 32 < coordinate) && (Game.heroIcon.x + 64 > coordinate)) 
    {
      coordinate = 32 + (Math.random() * (Game.canvas.width - 64))
    } 
    return coordinate
  }

    function randomYCoordinate() {
    var coordinate;
    coordinate = 32 + (Math.random() * (Game.canvas.height - 64))
    while ((Game.heroIcon.y - 32 < coordinate) && (Game.heroIcon.y + 64 > coordinate)) 
    {
      coordinate = 32 + (Math.random() * (Game.canvas.height - 64))
    } 
    return coordinate
  }
})