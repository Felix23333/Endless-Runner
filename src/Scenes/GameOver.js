class GameOver extends Phaser.Scene
{
    constructor()
    {
        super("endScene");
    }

    preload()
    {

    }

    create()
    {
        console.log("End Game!");
        this.input.keyboard.on('keydown-M', this.BackToMain, this);
    }

    BackToMain()
    {
        this.scene.start("menuScene");
    }
}