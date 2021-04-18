class Silhouette extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);  // add to curr scene
        this.points = pointValue;  // points 
        this.randomMovement = Phaser.Math.Between(1,2);           // randomize left or right movement
        this.moveSpeed = game.settings.dartboardSpeed + 2;        // movement in pixels
    }

    move(){
        // move silo left or right depending on its randomMovement status
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

    // reset Silo is only called when the player has not killed it in this session
    // so if its called just reverse random movement to get it to move
    // "backwards"
    reset(){
        if(this.randomMovement <= 1){
            this.x = this.width + borderPad;
            this.randomMovement = 2; // just hard code it with only 2 options
        } else {
            this.x = game.config.width - this.width;
            this.randomMovement = 1;
        }
    }

    dead(){
        this.x = game.config.width * 2;
    }
}
