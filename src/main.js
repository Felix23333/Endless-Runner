let config = {
    type: Phaser.CANVAS,
    width: 640,
    height:480,
    scene: [Play],
};

let game = new Phaser.Game(config);

let jumpKey, gravityKey, duckKey;

let score = 0;
let gameSpeed = 1;
let lives = 3;
let gameOver = false;
