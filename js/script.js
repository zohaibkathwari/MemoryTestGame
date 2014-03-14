$(document).ready(function ($) {
    console.log('DOM Initialized');

    //Create the instance of Game constructor
    var imageMatchGame = new Game();
    //show loader
    imageMatchGame.application.ui.loader.show();
    imageMatchGame.application.parseGameData();

    //hide loader, animate tiles and start the game
    imageMatchGame.application.onLoadComplete({
        hideLoader: true,
        animateTiles: true,
        start: true,
        showScore: true
    });
});
