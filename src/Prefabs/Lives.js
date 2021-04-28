class Lives extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
    }

    updateLives()
    {
        if(lives == 3)
        {
            this.setFrame(0);
        }
        else if(lives == 2)
        {
            this.setFrame(1);
        }
        else if(lives == 1)
        {
            this.setFrame(2);
        }
        else
        {
            this.alpha = 0;
            gameOver = true;
        }
    }
}