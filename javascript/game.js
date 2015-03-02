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