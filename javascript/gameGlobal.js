var Game = (function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d")
      heroIcon = new HeroIcon({
          x:300,
          y:300,
          image:"images/hero.png",
          speed: 4
        }),
      enemies =  [new Enemy({
        x: 0, 
        y: 0,
        image:"images/enemyShip.png", 
        speed: 2, 
        hero: heroIcon //< does this need to replaced?
      })],
      coin = new Coin({
        x: 400, 
        y: 400,
        image:"images/coin.png"
      }),
      paints = [],
      spaceImg = createImage("images/spaceBG.png");
  canvas.width = 912;
  canvas.height = 718;

  return {
    canvas: canvas,
    coin: coin,
    coinsCollected: 0,
    ctx: ctx,
    enemies: enemies,
    heroIcon: heroIcon,
    keysDown: {},
    over: false,
    spaceImg: spaceImg,
    paints : paints
  }
}())