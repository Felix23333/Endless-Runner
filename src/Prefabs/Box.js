class Box extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.speed = 3;
        this.currentFrame = frame;
        
    }

    update(){
        this.x -= this.speed * gameSpeed;
        if(this.x + this.width <= 0){
            this.reset();
        }

    }

    reset(){
        //console.log(this.currentFrame);
        this.currentFrame = Math.floor(Math.random()*3)
        this.setFrame(this.currentFrame);
        this.x = game.config.width + Phaser.Math.Between(0, 1000);
    }
}