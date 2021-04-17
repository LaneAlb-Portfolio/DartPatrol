//const { Phaser } = require("../lib/phaser.min");

// game config
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// highscore variable
let noob_highscore = 0;
let pro_highscore = 0;

// set UI variables
let borderUISize = game.config.height / 15;
let borderPad    = borderUISize / 3;
let starSpeed    = 2;

// grab keyboard events
let keyF, keyR, keyLEFT, keyRIGHT;