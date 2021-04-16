class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // load tile sprites
        this.load.spritesheet('dart', './assets/dart.png', {
            frameWidth: 8,
            frameHeight: 30,
            startFrame: 0,
            endFrame: 1
        });
        this.load.image('dartboard', './assets/dartboard.png');
        this.load.image('lobbybck', './assets/lobby.png');
        this.load.image('silo', './assets/Silhouette.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create(){
        // lobbybck bckgr
        this.lobbybck = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'lobbybck')
        .setOrigin(0,0); 

        // UI and Borders
        // Brown #7a4905 Border
        this.add.rectangle(0,0, game.config.width, borderUISize, 0x7a4905)
        .setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x7a4905)
        .setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x7a4905)
        .setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x7a4905)
        .setOrigin(0,0);

        
        // Dart (Player 1)
        this.p1Dart = new Dart(this, game.config.width / 2, game.config.height - borderUISize - borderPad, 
        'dart', 0).setOrigin(0.5,0);

        // darts
        this.ship01 = new Dartboard(this, game.config.width + borderUISize*6, borderUISize*4, 'dartboard', 0,30)
        .setOrigin(0,0);
        this.ship02 = new Dartboard(this, game.config.width + borderUISize*3, borderUISize*5 + borderPad*2, 
        'dartboard', 0,20).setOrigin(0,0);
        this.ship03 = new Dartboard(this, game.config.width, borderUISize*6 + borderUISize*4, 'dartboard', 0,10)
        .setOrigin(0,0);
        
        // Silhouette
        this.silo = new Dartboard(this, game.config.width + borderUISize*3, borderUISize*5 + borderPad*2, 
            'silo', 0,-20).setOrigin(0,0);
        
        // define keys
        keyF     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // animation configs
        const configExplosion = ({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
        const configPlayer = ({
            key: 'rattle', 
            frames: this.anims.generateFrameNumbers('dart', {
                start: 0,
                end: 1,
            }),
            frameRate: 1,
        });
        // create animations object
        this.anims.create(configPlayer);
        this.anims.create(configExplosion);
        // initialize score
        this.p1Score = 0;

        // display Score
        let scoreConfig = {
            fontFamily: 'Arimo',
            fontSize: '24px',
            //backgroundColor: '#F3B141',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(game.settings.textPointX, (borderUISize + borderPad)*2, this.p1Score, scoreConfig);
        scoreConfig.fontSize = '64px';
        scoreConfig.color = '#000000';
        this.playClock = this.add.text(game.config.width/2 - (borderPad + borderUISize), game.config.height - (borderUISize + borderPad)*2, 
            Phaser.Math.FloorTo(game.settings.gameTimer/1000), scoreConfig);
        this.playClock.alpha = 0.7;
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            scoreConfig.backgroundColor = 'rgba(0,0,0, 0.4)';
            scoreConfig.color = '#FFFFFF';
            scoreConfig.fontSize = '32px';
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        // get total play time from settings
        this.playTime = game.settings.gameTimer / 1000;
    }

    update(){
        //console.log(this.clock.getProgress() * 100);
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // lobbybck update
        //this.lobbybck.tilePositionX -= starSpeed;

        if(!this.gameOver){
            // update timer
            this.playClock.text = Phaser.Math.FloorTo(this.playTime - (game.settings.gameTimer * this.clock.getProgress())/1000);
            // update dart
            this.p1Dart.update();
            this.dartRattle(this.p1Dart);
            // update ships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.silo.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Dart, this.ship03)){
            // explosion
            this.p1Dart.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Dart, this.ship02)){
            // explosion
            this.p1Dart.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Dart, this.ship01)){
            // explosion
            this.p1Dart.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Dart, this.silo)){
            // explosion
            this.p1Dart.reset();
            this.shipExplode(this.silo);
        }
    }

    checkCollision(dart, ship){
        // simple checking
        if (dart.x < ship.x + ship.width &&
            dart.x + dart.width > ship.x &&
            dart.y < ship.y + ship.height &&
            dart.height + dart.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship){
        // hide ship
        ship.alpha = 0;
        // create explosion at ship coords
        let kaboom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        kaboom.anims.play('explode');
        kaboom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            kaboom.destroy();
        })
        // add score and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }

    dartRattle(dart){
        // rattle dart object
        dart.play('rattle');
    }

    shipExplode(ship){
        // hide ship
        ship.alpha = 0;
        // create explosion at ship coords
        let kaboom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        kaboom.anims.play('explode');
        kaboom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            kaboom.destroy();
        })
        // add score and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}
