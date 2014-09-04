document.addEventListener("DOMContentLoaded", function () {
  var mapLoader = new MapLoader();

  function playLevel(num) {
    //TODO show maps screen and start game after level is chosen
    var level = mapLoader.getLevel(num);

    if(!level) {
      throw new Error('Unknown level #' + num);
      return;
    }

    document.querySelector('#result').innerText = 'Level #' + num;

    //crate new game
    var game = new Game(level);

    //set up new HTML board
    var htmlBoard = new HTMLBoard({
      game: game,
      container: document.querySelector('.board-wrapper')
    });

    //TODO show win screen
    game.on('game-won', function (stars) {
      document.querySelector('#result').innerText = 'Game won with ' + stars + ' stars!';

      setTimeout(function() {
        //clean up
        game.destroy();
        htmlBoard.destroy();

        playLevel(num + 1);
      }, 500);
    });

    //TODO show loose screen
    game.on('game-lost', function () {
      document.querySelector('#result').innerText = 'You lost :(';
    });

    game.start();

    function gameLoop() {
      if (htmlBoard.ifMovingEnded()) {
        game.update(); //update logiki
      };
    }
    setInterval(gameLoop, 50);

  }

  playLevel(0);
}, false);