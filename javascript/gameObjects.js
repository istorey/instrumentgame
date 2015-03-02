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