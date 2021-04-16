class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('menubck', './assets/MenuScreen.png');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Arimo',
            fontSize: '32px',
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
        this.add.text(game.config.width/2 + 10, game.config.height - borderUISize, 'DART LOBBY', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'rgba(0,0,0, 0.4)';
        menuConfig.fontSize = '24px';
        this.add.text(game.config.width/2, game.config.height/2, "Use ← → arrows to angle the dart", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPad, "Use 'F' to throw", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height - borderUISize*5 + borderPad/2, 'Choose Your Difficulty With the Arrows Above', menuConfig).setOrigin(0.5);
        
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
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
    }
}

