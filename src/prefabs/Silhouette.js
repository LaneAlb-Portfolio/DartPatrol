class Silhouette extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);  // add to curr scene
        this.points = pointValue;  // points 
        this.moveSpeed = game.settings.dartboardSpeed + 2;        // movement in pixels
    }

    move(){
        if(this.x >= game.config.width){
            // it was moved off screen move it onto screen first
            this.x = 0;
        }
        // move silo left
        this.x += this.moveSpeed;
        //this.angle += 0.1;
        // movement wrap
        if(this.x >= game.config.width - this.width){
            this.reset();
        }
    }

    reset(){
        this.x = this.width + borderPad;
    }

    dead(){
        this.x = game.config.width * 2;
    }
}
