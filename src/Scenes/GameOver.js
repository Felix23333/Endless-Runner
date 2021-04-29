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
        this.input.keyboard.on('keydown-R', this.Restart, this);
    }

    BackToMain()
    {
        this.scene.start("menuScene");
    }

    Restart()
    {
        this.scene.start("playScene");
    }
}