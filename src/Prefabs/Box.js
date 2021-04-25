class Box extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.speed = 1.5;
    }

    update(){
        this.x -= this.speed;
        if(this.x + this.width <= 0){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}