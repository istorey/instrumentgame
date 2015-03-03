function createImage(url){
  new_image = new Image();
  new_image.src = url
  return new_image
}

var Renderable = function(options) {
  this.x = options.x 
  this.y = options.y
  this.image = createImage(options.image)
  this.render = function() {
    Game.ctx.drawImage(this.image, this.x, this.y);
  }
}
var Coin = function(options) {
  Renderable.call(this, options)
}

var Icon = function(options) {
  Renderable.call(this, options)
  this.speed = options.speed
}

var Paint = function(options) {
  Icon.call(this, options)
}  


var HeroIcon = function(options) {
  Icon.call(this, options);
  this.painting = false;
}

HeroIcon.prototype.paint = function() {
  if (32 in Game.keysDown && !this.painting) {//Spacebar paints!
    Game.paints.push(new Paint({
        x : this.x + 11,
        y : this.y,
        speed : this.speed + 3,
        image : "images/green.png"
    }))
    
  }
  else if (65 in Game.keysDown && !this.painting) {
    Game.paints.push(new Paint({
        x : this.x + 11,
        y : this.y,
        speed : this.speed + 3,
        image : "images/blue.png"
    }))
  }
  else if (83 in Game.keysDown && !this.painting) {
    Game.paints.push(new Paint({
        x : this.x + 11,
        y : this.y,
        speed : this.speed + 3,
        image : "images/yellow.png"
    }))
  }
  else if (68 in Game.keysDown && !this.painting) {
    Game.paints.push(new Paint({
        x : this.x + 11,
        y : this.y,
        speed : this.speed + 3,
        image : "images/pink.png"
    }))
  }
   else if (87 in Game.keysDown && !this.painting) {
    Game.paints.push(new Paint({
        x : this.x + 11,
        y : this.y,
        speed : this.speed + 3,
        image : "images/purple.png"
    }))
}
    else if (69 in Game.keysDown && !this.painting) {
    Game.paints.push(new Paint({
        x : this.x + 11,
        y : this.y,
        speed : this.speed + 3,
        image : "images/orange.png"
    }))
  }
} 
 
HeroIcon.prototype.move = function() {
  if (38 in Game.keysDown) { // Player holding up
    if (this.y > (-20)){
      this.y -= this.speed;
    } else {
      this.y = 718
    }
  }
  if (40 in Game.keysDown) { // Player holding down
    if (this.y < 728){
      this.y += this.speed;
    } else {
      this.y = 0
    }
  }
  if (37 in Game.keysDown) { // Player holding left
    if (this.x > (-20)){
      this.x -= this.speed;
    } else {
      this.x = 920
    }
  }
  if (39 in Game.keysDown) { // Player holding right
    if (this.x < (940)){
      this.x += this.speed;
    } else {
      this.x = 0
    }
  }
}

var Enemy = function(options) {
  this.hero = options.hero
  Icon.call(this, options);
}

Enemy.prototype.chase = function() {
  if (this.x < this.hero.x) {
    this.x += this.speed
  } else {
    this.x -= this.speed
  } 
  if (this.y < this.hero.y) {
    this.y += this.speed 
  } else {
    this.y -= this.speed
  }
}