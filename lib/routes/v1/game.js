let express = require('express');

module.exports = function (controllers) {
  let game = express();
  let gameCTRL = controllers.game;

  game.post('/game',
    function (req, res) {

    }
  );

  game.delete('/game/:gameid',
    gameCTRL.loadGame.bind(gameCTRL),
    function (req, res) {

    }
  );

  game.get('/games/',
    function (req, res) {

    }
  );

  game.get('/game/:gameid',
    gameCTRL.loadGame.bind(gameCTRL),
    function (req, res) {

    }
  );

  game.patch('/game/:gameid',
    gameCTRL.loadGame.bind(gameCTRL),
    function (req, res) {

    }
  );

  return game;
};