class Dartboard extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);  // add to curr scene
        this.points = pointValue;  // points 
        this.moveSpeed = game.settings.dartboardSpeed;        // movement in pixels
    }

    update(){
        // move spaceship left
        this.x -= this.moveSpeed;
        // movement wrap
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
        // this.y randomize
        //this.y = Phaser.Math.Between();
        // bottom of play area: game.config.height - borderUISize - borderPad;
        // top: borderUISize * 3 + borderPad
    }

}
