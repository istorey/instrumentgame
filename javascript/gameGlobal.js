var Game = (function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d")
      heroIcon = new HeroIcon({
          x:300,
          y:300,
          image:"images/heroShip.png",
          speed: 4
        }),