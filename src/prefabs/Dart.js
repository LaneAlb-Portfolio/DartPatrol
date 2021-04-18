//const { Phaser } = require("../../lib/phaser.min");

// Rocket -> "Player" Prefab
class Dart extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y , texture, frame){
        super(scene, x, y , texture, frame);
        // add object to the existing scene
        scene.add.existing(this);
        this.isthrowing  = false;     // dart throwing status
        this.moveSpeed = 2;         // pixel movement per frame
        this.sfxDart = scene.sound.add('sfx_throw'); // dart sfx
        this.sfxMiss = scene.sound.add('yikes');
    } 

    update(){
        // left and right movement
        if(!this.isthrowing){
            if(keyLEFT.isDown && this.x >= (borderUISize + this.width) && this.angle > -90 ){
                this.angle -= this.moveSpeed;
                //console.log(this.angle);
            } else if(keyRIGHT.isDown && this.x <= (game.config.width - borderUISize - this.width) && this.angle < 90){
                this.angle += this.moveSpeed;
                //console.log(this.angle);
            }
        }
        // throwing
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isthrowing){
            this.isthrowing = true;
            this.sfxDart.play();
        }
        // projectile movement
        if(this.isthrowing && this.y >= borderPad + this.height){
            this.y -= this.moveSpeed;
            this.x += (this.rotation * this.moveSpeed);
            // put shake here
        }
        // reset if projectile miss
        if(this.y <= borderPad + this.height){
            this.reset();
            this.sfxMiss.play();
        }
    }

    //reset rocket
    reset(){
        this.isthrowing = false;
        this.y = game.config.height - borderUISize - borderPad;
        this.x = game.config.width / 2;
    }
}