let config = {
    type: Phaser.CANVAS,
    width: 640,
    height:480,
    scene: [MainMenu, Play, GameOver],
};

let game = new Phaser.Game(config);

let jumpKey, gravityKey, duckKey;

let score = 0;
let gameSpeed = 1;
let lives = 3;
let gameOver = false;

let menuMusic;
let addMenuMusic = false;

//Collaborator Name: Felix Li, Evan Kramer, Miguel Cedillo
//Game Title: Gravity Run
//Date Completed: 05/03
//Create tilt justification:
//Interesting things: We implemented change gravity mechanics, player
//also can jumping and ducking.
//We build our own frame based collision detections, also jump, fall, change gravity mechanics
//handled by repeated time event(new things). We also implemented randomness by using some math funuction also with sprite frames(new things).
//Our game's background art is a space station, is very detailed, our overall design is space and sci-fi. Also our
//character is a scientist, it also looks pretty cool. It's a classical endless runner game, but are trying to
//make some interesting mechanics, also add difficulty to it.