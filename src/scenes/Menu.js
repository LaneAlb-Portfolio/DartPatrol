class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_niceShot', './assets/niceShot.wav');
        this.load.audio('sfx_springBoard', './assets/springBoard.wav');
        this.load.audio('sfx_thunk', './assets/thunk.wav');
        this.load.audio('sfx_break', './assets/boardBreak.wav');
        this.load.audio('sfx_throw', './assets/throw.wav');
        this.load.audio('sfx_ouch', './assets/ouch.wav');
        this.load.audio('music', './assets/music.mp3');
        this.load.audio('yikes', './assets/yikes.wav');
        this.load.image('menubck', './assets/MenuScreen.png');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Arimo',
            fontSize: '48px',
            backgroundColor: '',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show background image
        // lobbybck bckgr
        this.lobbybck = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menubck')
        .setOrigin(0,0);
        // show menu text
        this.add.text(game.config.width/2 + 15, game.config.height - borderUISize - borderPad, 'DART LOBBY', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'rgba(0,0,0, 0.4)';
        menuConfig.fontSize = '24px';
        this.add.text(game.config.width/2, game.config.height/2, "Use ← → arrows to angle the dart", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPad, "Use 'F' to throw", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height - borderUISize*5 + borderPad/2, 'Choose Your Difficulty With the Arrows Above', menuConfig).setOrigin(0.5);
        // credits for music I didnt make
        menuConfig.fontSize = '12px';
        this.add.text(game.config.width/2 + 10, game.config.height - borderPad, 'Music from syncopika on opengameart.org under CC', menuConfig).setOrigin(0.5);
        // show highscores
        menuConfig.backgroundColor = 'rgba(0,0,0, 0)';
        menuConfig.fontSize = '32px';
        // noob
        this.add.text((borderUISize + borderPad)*4 + 21, (borderUISize + borderPad)*2, 
          noob_highscore.toString(), menuConfig).setOrigin(0.5);
        // pro
        this.add.text(game.config.width - (borderUISize + borderPad)*4 - 10, (borderUISize + borderPad)*2, 
          pro_highscore.toString(), menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            dartboardSpeed: 2,
            gameTimer: 60000,
            textPointX: (borderUISize + borderPad)*4 + 6,
            diff: 1,
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            dartboardSpeed: 3,
            gameTimer: 25000,
            textPointX: game.config.width - borderUISize+16 - (borderUISize + borderPad)*6,
            diff: 2,
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
    }
}

