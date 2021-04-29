class Collection extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.speed = 2;
    }

    update()
    {
        this.x -= this.speed;
        if(this.x + this.width <= 0){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width + Phaser.Math.Between(0,500);
    }
}