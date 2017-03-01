let express = require('express');

module.exports = function (controllers) {
  let game = express();
  let gameCTRL = controllers.game;

  game.post('/game',
    gameCTRL.addGame.bind(gameCTRL)
  );

  // game.delete('/game/:gameid',
  //   gameCTRL.loadGame.bind(gameCTRL),
  //   gameCTRL.removeGame.bind(gameCTRL)
  // );

  game.get('/games/',
    gameCTRL.getGamesList.bind(gameCTRL)
  );

  game.get('/game/:gameid',
    gameCTRL.loadGame.bind(gameCTRL),
    gameCTRL.getGame.bind(gameCTRL)
  );

  // game.patch('/game/:gameid',
  //   gameCTRL.loadGame.bind(gameCTRL),
  //   gameCTRL.updateGame.bind(gameCTRL)
  // );

  game.post('/game/:gameid/name',
    gameCTRL.loadGame.bind(gameCTRL),
    gameCTRL.addGameName.bind(gameCTRL)
  );

  game.post('/game/:gameid/searchterm',
    gameCTRL.loadGame.bind(gameCTRL),
    gameCTRL.addGameSearchTerm.bind(gameCTRL)
  );

  game.post('/game/:gameid/url',
    gameCTRL.loadGame.bind(gameCTRL),
    gameCTRL.addGameURL.bind(gameCTRL)
  );

  game.delete('/game/:gameid/name',
    gameCTRL.loadGame.bind(gameCTRL),
    gameCTRL.removeGameName.bind(gameCTRL)
  );

  game.delete('/game/:gameid/searchterm',
    gameCTRL.loadGame.bind(gameCTRL),
    gameCTRL.removeGameSearchTerm.bind(gameCTRL)
  );

  game.delete('/game/:gameid/url',
    gameCTRL.loadGame.bind(gameCTRL),
    gameCTRL.removeGameURL.bind(gameCTRL)
  );

  return game;
};