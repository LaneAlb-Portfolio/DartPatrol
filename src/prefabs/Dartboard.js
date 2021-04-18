class Dartboard extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);  // add to curr scene
        this.points = pointValue;  // points 
        this.randomMovement = Phaser.Math.Between(1,2);       // movement 
        this.moveSpeed = game.settings.dartboardSpeed;        // movement in pixels
    }

    update(){
        // move spaceship left or right depending on its randomMovement status
        if(this.randomMovement <= 1){
            this.x -= this.moveSpeed;
            if(this.x <= 0 - this.width){
                this.reset();
            }
        } else {
            this.x += this.moveSpeed;
            if(this.x >= game.config.width - this.width){
                this.reset();
            }
        }
    }

    reset(){
        if(this.randomMovement <= 1){
            this.x = game.config.width;
        } else {
            this.x = 0;
        }
        this.y = Phaser.Math.Between(borderPad, game.config.height - (borderPad + this.height * 2));
    }

}
